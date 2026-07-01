import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase-server";

const SCREENSHOT_BUCKET = "donation-screenshots";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "codemasterwang@gmail.com";

async function requireAdmin(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return { ok: false, status: 401, body: { error: "Missing token" } };
  const supabaseAdmin = getAdminClient();
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return { ok: false, status: 401, body: { error: "Invalid token" } };
  const email = data.user.email;
  if (email !== ADMIN_EMAIL) return { ok: false, status: 403, body: { error: "Forbidden" } };
  return { ok: true, user: data.user };
}

export async function GET(request: Request) {
  const authCheck = await requireAdmin(request);
  if (!authCheck.ok) return NextResponse.json(authCheck.body, { status: authCheck.status });

  const supabaseAdmin = getAdminClient();

  // fetch donations from 'donations' table
  const { data, error } = await supabaseAdmin
    .from("donations")
    .select("id, donor_name, donor_email, donor_phone, donor_country, is_anonymous, amount, purpose, prayer_intention, journal_number, status, created_at, screenshot_path")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // generate signed urls for screenshots when present
  const donations = await Promise.all(
    (data || []).map(async (d: any) => {
      let screenshotUrl = null;
      if (d.screenshot_path) {
        try {
          const { data: urlData } = await supabaseAdmin.storage
            .from(SCREENSHOT_BUCKET)
            .createSignedUrl(d.screenshot_path, 60 * 60);
          screenshotUrl = urlData?.signedUrl || null;
        } catch (e) {
          screenshotUrl = null;
        }
      }
      return {
        id: d.id,
        donorName: d.is_anonymous ? "Anonymous" : d.donor_name,
        donorEmail: d.donor_email,
        donorPhone: d.donor_phone,
        donorCountry: d.donor_country,
        isAnonymous: d.is_anonymous,
        amount: d.amount,
        purpose: d.purpose,
        prayerIntention: d.prayer_intention,
        journalNumber: d.journal_number,
        status: d.status,
        createdAt: d.created_at,
        screenshotUrl,
      };
    })
  );

  return NextResponse.json({ donations });
}

export async function POST(request: Request) {
  try {
    const supabaseAdmin = getAdminClient();

    const form = await request.formData();
    const donorName = String(form.get("donorName") || "");
    const donorEmail = String(form.get("donorEmail") || "");
    const donorPhone = String(form.get("donorPhone") || "");
    const isAnonymous = String(form.get("isAnonymous") || "false") === "true";
    const amount = Number(form.get("amount") || 0);
    const purpose = String(form.get("purpose") || "");
    const prayerIntention = String(form.get("prayerIntention") || "");
    const journalNumber = String(form.get("journalNumber") || "");

    const file = form.get("screenshot") as File | null;
    if (!file || !file.size) {
      return NextResponse.json({ error: "Transaction screenshot is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9_.-]/g, "_")}`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from(SCREENSHOT_BUCKET)
      .upload(filename, buffer, { contentType: file.type });

    if (uploadError) {
      return NextResponse.json({ error: "Failed to upload transaction screenshot" }, { status: 500 });
    }

    const screenshotPath = filename;

    const insert = {
      donor_name: donorName || null,
      donor_email: donorEmail || null,
      donor_phone: donorPhone || null,
      is_anonymous: isAnonymous,
      amount: amount || 0,
      purpose: purpose || null,
      prayer_intention: prayerIntention || null,
      journal_number: journalNumber || null,
      screenshot_path: screenshotPath,
      status: "pending" as const,
    };

    const { data, error } = await (supabaseAdmin.from("donations") as any)
      .insert(insert)
      .select();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, donation: data?.[0] || null });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

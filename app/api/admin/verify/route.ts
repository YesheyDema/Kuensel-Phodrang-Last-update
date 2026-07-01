// import { NextResponse } from "next/server";
// import supabaseAdmin from "@/lib/supabase-server";

// const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "codemasterwang@gmail.com";

// async function requireAdmin(request: Request) {
//   const authHeader = request.headers.get("authorization");
//   const token = authHeader?.split(" ")[1];
//   if (!token) return { ok: false, status: 401, body: { error: "Missing token" } };
//   const { data, error } = await supabaseAdmin.auth.getUser(token);
//   if (error || !data.user) return { ok: false, status: 401, body: { error: "Invalid token" } };
//   const email = data.user.email;
//   if (email !== ADMIN_EMAIL) return { ok: false, status: 403, body: { error: "Forbidden" } };
//   return { ok: true, user: data.user };
// }

// export async function POST(request: Request) {
//   const authCheck = await requireAdmin(request);
//   if (!authCheck.ok) return NextResponse.json(authCheck.body, { status: authCheck.status });

//   try {
//     const body = await request.json();
//     const { id, status } = body;
//     if (!id || !status) return NextResponse.json({ error: "Missing id or status" }, { status: 400 });

//     const { data, error } = await supabaseAdmin
//       .from("donations")
//       .update({ status })
//       .eq("id", id)
//       .select();

//     if (error) return NextResponse.json({ error: error.message }, { status: 500 });

//     return NextResponse.json({ ok: true, donation: data?.[0] || null });
//   } catch (e) {
//     return NextResponse.json({ error: (e as Error).message }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase-server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "codemasterwang@gmail.com";
const VALID_DONATION_STATUSES = ["pending", "verified", "rejected"] as const;
type DonationStatus = (typeof VALID_DONATION_STATUSES)[number];

function isDonationStatus(value: unknown): value is DonationStatus {
  return typeof value === "string" && VALID_DONATION_STATUSES.includes(value as DonationStatus);
}

async function requireAdmin(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return { ok: false, status: 401, body: { error: "Missing token" } };
  
  const supabaseAdmin = getAdminClient(); // ✅ Call function, don't import object
  
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return { ok: false, status: 401, body: { error: "Invalid token" } };
  const email = data.user.email;
  if (email !== ADMIN_EMAIL) return { ok: false, status: 403, body: { error: "Forbidden" } };
  return { ok: true, user: data.user };
}

export async function POST(request: Request) {
  const authCheck = await requireAdmin(request);
  if (!authCheck.ok) return NextResponse.json(authCheck.body, { status: authCheck.status });

  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !isDonationStatus(status)) {
      return NextResponse.json({ error: "Missing id or invalid status" }, { status: 400 });
    }

    const supabaseAdmin = getAdminClient();

    const { data, error } = await (supabaseAdmin.from("donations") as any)
      .update({ status })
      .eq("id", id)
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, donation: data?.[0] || null });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
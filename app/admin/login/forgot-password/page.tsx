"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase-browser";

const ADMIN_EMAIL = "codemasterwang@gmail.com";

export default function AdminForgotPasswordPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      // Check if user is already logged in
      const { data: session } = await supabase.auth.getSession();
      if (session?.session?.user?.email === ADMIN_EMAIL) {
        // Already logged in, redirect to dashboard
        router.push("/admin/dashboard");
        return;
      }
      
      setMessage("To reset your password, sign in to the dashboard and use the Settings > Change Password option.");
    })();
  }, [router]);

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-xl items-center">
        <div className="w-full border border-border bg-background p-8 shadow-[0_20px_60px_rgba(47,29,20,0.08)]">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Admin Recovery</p>
          <h1 className="mt-4 font-serif text-3xl font-semibold">Password Reset</h1>

          <div className="mt-6 space-y-4">
            <div className="rounded border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-700 space-y-2">
              <p className="font-medium">To reset your admin password:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Sign in to the admin dashboard</li>
                <li>Click the "Settings" button</li>
                <li>Select "Change Password"</li>
                <li>Enter your current and new password</li>
              </ol>
            </div>

            <div className="rounded border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              {message}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Admin email:</p>
              <input value={ADMIN_EMAIL} readOnly className="w-full border border-border bg-muted/20 px-4 py-3 text-sm outline-none" />
            </div>

            <div className="mt-4">
              <button
                onClick={async () => {
                  setLoading(true);
                  try {
                    const { error } = await supabase.auth.resetPasswordForEmail(ADMIN_EMAIL, {
                      redirectTo: window.location.origin + "/admin/login?updated=1",
                    });

                    if (error) {
                      setMessage(error.message);
                      setLoading(false);
                      return;
                    }

                    // Show a simple confirmation and redirect back to login which already
                    // displays a message when `sent=1` is present in the query string.
                    router.push("/admin/login?sent=1");
                  } catch (err: any) {
                    setMessage(err?.message || "Failed to send reset email.");
                  } finally {
                    setLoading(false);
                  }
                }}
                className="mt-2 w-full rounded bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground hover:bg-secondary/90 disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Sending reset link..." : "Send reset link to admin inbox"}
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 text-sm">
            <Link href="/admin/login" className="text-primary transition-colors hover:underline">Back to login</Link>
            <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">Return to site</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
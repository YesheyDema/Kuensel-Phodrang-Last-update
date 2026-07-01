"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase-browser";

export default function AdminResetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("Preparing recovery session...");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const searchParams = new URL(window.location.href).searchParams;
      const code = searchParams.get("code");
      const tokenHash = searchParams.get("token_hash");

      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          setError(exchangeError.message);
          setMessage("");
          setLoading(false);
          return;
        }
      } else if (tokenHash) {
        const { error: verifyError } = await supabase.auth.verifyOtp({
          type: "recovery",
          token_hash: tokenHash,
        });
        if (verifyError) {
          setError(verifyError.message);
          setMessage("");
          setLoading(false);
          return;
        }
      }

      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setError("Recovery session not found. Request a new reset link.");
        setMessage("");
      } else {
        setMessage("Choose a new password for the admin account.");
      }

      setLoading(false);
    })();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (password.length < 8) {
      setSaving(false);
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setSaving(false);
      setError("Passwords do not match.");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setSaving(false);
      setError(updateError.message);
      return;
    }

    await supabase.auth.signOut();
    router.replace("/admin/login?updated=1");
  };

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-xl items-center">
        <form onSubmit={handleSave} className="w-full border border-border bg-background p-8 shadow-[0_20px_60px_rgba(47,29,20,0.08)]">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Password Reset</p>
          <h1 className="mt-4 font-serif text-3xl font-semibold">Set a new password</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">This page opens from the email reset link and lets the admin update their password securely.</p>

          {loading ? <div className="mt-6 rounded border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">{message}</div> : null}
          {!loading && message ? <div className="mt-6 rounded border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div> : null}
          {error ? <div className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

          <div className="mt-6 space-y-2">
            <label className="text-sm font-medium">New password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="new-password" className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-sm font-medium">Confirm password</label>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" autoComplete="new-password" className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
          </div>

          <button type="submit" disabled={loading || saving} className="mt-6 flex w-full items-center justify-center bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-70">
            {saving ? "Saving password..." : "Update password"}
          </button>

          <div className="mt-4 flex items-center justify-between text-sm">
            <Link href="/admin/login" className="text-primary hover:underline">Back to login</Link>
            <Link href="/" className="text-muted-foreground hover:text-foreground">Return to site</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
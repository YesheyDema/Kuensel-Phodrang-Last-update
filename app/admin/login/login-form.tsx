"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import supabase from "@/lib/supabase-browser";

// Intentionally do not store a hardcoded admin email here.

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Use the dedicated admin credentials to continue.");
  const [error, setError] = useState("");

  useEffect(() => {
    const updated = searchParams.get("updated");
    const sent = searchParams.get("sent");

    if (updated === "1") {
      setMessage("Password updated. Sign in again with the new credentials.");
    } else if (sent === "1") {
      setMessage("Reset link sent. Check the admin inbox to continue.");
    }
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace("/admin/dashboard");
      }
    })();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <main
      className="min-h-screen px-6 py-12 text-foreground"
      style={{
        backgroundImage:
          "radial-gradient(circle_at_top,rgba(201,169,98,0.18),transparent_34%),linear-gradient(180deg,#fffaf1_0%,#f6ecd9_100%)",
      }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden border border-border bg-background/90 shadow-[0_25px_80px_rgba(47,29,20,0.12)] md:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden flex-col justify-between border-r border-border bg-secondary p-10 text-secondary-foreground md:flex">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-secondary-foreground/70">Private Admin Entry</p>
              <h1 className="mt-6 max-w-md font-serif text-5xl font-semibold leading-tight text-primary">Secure access for the donation desk.</h1>
              <p className="mt-6 max-w-md text-sm leading-6 text-secondary-foreground/80">This login is intentionally separate from the public site. Use your admin email and password to reach the dashboard.</p>
            </div>
            
          </div>

          <form onSubmit={handleLogin} className="space-y-6 p-8 sm:p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary">Admin Login</p>
              <h2 className="mt-4 font-serif text-3xl font-semibold">Sign in</h2>
              <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#d9ad3a" }}>Secure access for the donation desk.</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Enter the configured admin password to open the dashboard. If you forgot it, use the recovery link below.</p>
            </div>

            <div className="rounded border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">{message}</div>

            {error ? (
              <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            ) : null}

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                autoComplete="username"
                className="mt-2 w-full border border-border bg-muted/20 px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                autoComplete="current-password"
                className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center bg-secondary px-4 py-3 text-sm font-medium tracking-wide text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="flex items-center justify-between gap-4 text-sm">
              <Link href="/admin/login/forgot-password" className="text-primary transition-colors hover:underline">Forgot password?</Link>
              <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">Return to site</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
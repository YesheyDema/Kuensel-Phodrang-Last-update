import { Suspense } from "react";
import AdminLoginForm from "./login-form";

function LoginFallback() {
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
              <div className="mt-6 h-14 w-full max-w-md animate-pulse rounded bg-secondary-foreground/10" />
              <div className="mt-6 h-20 w-full max-w-md animate-pulse rounded bg-secondary-foreground/10" />
            </div>
            <div className="space-y-2 text-sm text-secondary-foreground/75">
              <p>Admin email</p>
              <div className="h-5 w-64 animate-pulse rounded bg-secondary-foreground/10" />
            </div>
          </div>

          <div className="space-y-6 p-8 sm:p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary">Admin Login</p>
              <div className="mt-4 h-10 w-40 animate-pulse rounded bg-muted/60" />
              <div className="mt-3 h-12 w-full animate-pulse rounded bg-muted/40" />
            </div>

            <div className="h-12 rounded border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
              Preparing secure sign-in...
            </div>

            <div className="space-y-2">
              <div className="h-5 w-16 animate-pulse rounded bg-muted/60" />
              <div className="mt-2 h-12 w-full animate-pulse rounded border border-border bg-muted/20" />
            </div>

            <div className="space-y-2">
              <div className="h-5 w-20 animate-pulse rounded bg-muted/60" />
              <div className="mt-2 h-12 w-full animate-pulse rounded border border-border bg-muted/20" />
            </div>

            <div className="h-12 w-full animate-pulse rounded bg-secondary/70" />

            <div className="flex items-center justify-between gap-4 text-sm">
              <div className="h-5 w-32 animate-pulse rounded bg-muted/60" />
              <div className="h-5 w-24 animate-pulse rounded bg-muted/60" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AdminLoginForm />
    </Suspense>
  );
}
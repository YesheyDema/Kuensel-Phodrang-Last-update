"use client";

import { useState } from "react";
import supabase from "@/lib/supabase-browser";

export default function AdminPasswordChange({ onClose }: { onClose: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    // Validation
    if (!currentPassword) {
      setError("Current password is required.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      setLoading(false);
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password.");
      setLoading(false);
      return;
    }

    try {
      // First verify the current password by attempting to sign in
      const { data: session } = await supabase.auth.getSession();
      const adminEmail = session?.session?.user?.email;

      if (!adminEmail) {
        setError("Session not found. Please log in again.");
        setLoading(false);
        return;
      }

      // Verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: currentPassword,
      });

      if (signInError) {
        setError("Current password is incorrect.");
        setLoading(false);
        return;
      }

      // Update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      setMessage("Password updated successfully. Please sign in again with your new password.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Sign out and redirect to login after 2 seconds
      setTimeout(async () => {
        await supabase.auth.signOut();
        window.location.href = "/admin/login";
      }, 2000);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleChangePassword}
        className="max-w-md w-full border border-border bg-background p-8 shadow-lg"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Admin Settings</p>
        <h2 className="mt-4 font-serif text-2xl font-semibold">Change Password</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Update your admin password directly. You'll be signed out after the change.
        </p>

        {message && (
          <div className="mt-4 rounded border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Current password</label>
            <input
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">New password</label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm new password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
              className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 border border-border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-70"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

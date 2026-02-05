"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const result = await authClient.requestPasswordReset({
        email,
        redirectTo: "/auth/reset-password",
      });

      if (result && typeof result === "object" && "error" in result && result.error) {
        setError(result.error?.message ?? "Failed to send reset email");
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border-border rounded-xl border p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-foreground text-3xl font-bold">Forgot Password</h1>
        <p className="text-muted-foreground mt-2">We&apos;ll send you a reset link</p>
      </div>

      {success ? (
        <div className="text-center">
          <div className="mb-6 rounded-lg border border-green-500/50 bg-green-500/10 px-4 py-4 text-green-400">
            <p className="font-medium">Check your email!</p>
            <p className="mt-1 text-sm">We&apos;ve sent a password reset link to {email}</p>
          </div>
          <p className="text-muted-foreground text-sm">
            Click the link in the email to reset your password. The link will expire in 1 hour.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      )}

      <p className="text-muted-foreground mt-8 text-center text-sm">
        <Link href="/auth/sign-in" className="text-foreground hover:text-foreground/80 font-medium transition">
          ← Back to sign in
        </Link>
      </p>
    </div>
  );
}

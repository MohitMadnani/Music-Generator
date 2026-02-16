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
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border-white/10 rounded-lg border p-8 shadow-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-white text-3xl font-bold">Forgot Password</h1>
        <p className="text-gray-400 mt-2">We&apos;ll send you a reset link</p>
      </div>

      {success ? (
        <div className="text-center">
          <div className="mb-6 rounded-lg border border-green-500/50 bg-green-500/10 px-4 py-4 text-green-400">
            <p className="font-medium">Check your email!</p>
            <p className="mt-1 text-sm">We&apos;ve sent a password reset link to {email}</p>
          </div>
          <p className="text-gray-400 text-sm">
            Click the link in the email to reset your password. The link will expire in 1 hour.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      )}

        <p className="text-gray-400 mt-8 text-center text-sm">
          <Link href="/auth/sign-in" className="text-blue-500 hover:text-blue-400 font-medium transition">
            ← Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

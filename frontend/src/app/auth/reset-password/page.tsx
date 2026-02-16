"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      setError("Invalid or missing reset token. Please request a new password reset.");
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (result.error) {
        setError(result.error.message ?? "Failed to reset password");
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border-white/10 rounded-lg border p-8 shadow-2xl">
        <div className="text-center">
          <div className="mb-6 rounded-lg border border-green-500/50 bg-green-500/10 px-4 py-4 text-green-400">
            <p className="font-medium">Password Reset Successful!</p>
            <p className="mt-1 text-sm">Your password has been changed</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/50 backdrop-blur-sm border-white/10 rounded-xl border p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-white text-3xl font-bold">Reset Password</h1>
        <p className="text-gray-400 mt-2">Enter your new password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">New Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={!token}
            placeholder="••••••••"
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={!token}
            placeholder="••••••••"
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>

        <Button
          type="submit"
          disabled={loading || !token}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>

      <p className="text-gray-400 mt-8 text-center text-sm">
        <Link href="/auth/sign-in" className="text-blue-500 hover:text-blue-400 font-medium transition">
          ← Back to sign in
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border-white/10 rounded-lg border p-8 shadow-2xl">
            <div className="text-center">
              <p className="text-gray-400">Loading...</p>
            </div>
          </div>
        }
      >
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}

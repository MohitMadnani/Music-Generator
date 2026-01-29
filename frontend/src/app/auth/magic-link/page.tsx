"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MagicLinkPage() {
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
      const magicLinkFn = authClient.signIn.magicLink as
        | ((opts: { email: string; callbackURL: string }) => Promise<{ error?: { message?: string } }>)
        | undefined;

      if (!magicLinkFn) {
        throw new Error("Magic link auth is not available.");
      }

      const result = await magicLinkFn({
        email,
        callbackURL: "/",
      });

      if (result?.error) {
        setError(result.error.message ?? "Failed to send magic link");
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
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Magic Link</CardTitle>
        <CardDescription>Sign in without a password</CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="text-center space-y-4">
            <Alert className="border-green-500 bg-green-500/10">
              <AlertTitle className="text-green-500">Check your email!</AlertTitle>
              <AlertDescription className="text-green-400">
                We&apos;ve sent a magic link to {email}
              </AlertDescription>
            </Alert>
            <p className="text-muted-foreground text-sm">
              Click the link in the email to sign in. The link will expire in 10 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Magic Link"}
            </Button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link href="/auth/sign-in" className="text-primary hover:underline font-medium">
            ← Back to sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

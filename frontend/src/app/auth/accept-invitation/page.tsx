"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export default function AcceptInvitationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invitationToken, setInvitationToken] = useState<string | null>(null);
  const [organizationName, setOrganizationName] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const orgName = searchParams.get("organization");
    
    if (!token) {
      setError("Invalid or missing invitation token");
    } else {
      setInvitationToken(token);
      setOrganizationName(orgName);
    }
  }, [searchParams]);

  const handleAccept = async () => {
    if (!invitationToken) return;
    
    setError("");
    setLoading(true);

    try {
      // Check if user is logged in first
      const session = await authClient.getSession();
      
      if (!session.data) {
        // Redirect to sign in with return URL
        router.push(`/auth/sign-in?redirect=/auth/accept-invitation?token=${invitationToken}`);
        return;
      }

      // Accept the invitation
      // Note: You'll need to implement the actual invitation acceptance logic
      // based on your organization setup in better-auth
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to accept invitation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-card border-border rounded-xl border p-8 shadow-lg">
        <div className="text-center">
          <div className="mb-6 rounded-lg border border-green-500/50 bg-green-500/10 px-4 py-4 text-green-400">
            <p className="font-medium">Invitation Accepted!</p>
            <p className="mt-1 text-sm">
              You&apos;ve joined {organizationName ?? "the organization"}
            </p>
          </div>
          <Button asChild>
            <Link href="/">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border-border rounded-xl border p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-foreground text-3xl font-bold">Accept Invitation</h1>
        {organizationName && (
          <p className="text-muted-foreground mt-2">
            You&apos;ve been invited to join <span className="text-foreground font-medium">{organizationName}</span>
          </p>
        )}
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {invitationToken ? (
        <div className="space-y-4">
          <Button
            onClick={handleAccept}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Accepting..." : "Accept Invitation"}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full"
          >
            Decline
          </Button>
        </div>
      ) : (
        <p className="text-muted-foreground text-center">
          This invitation link is invalid or has expired.
        </p>
      )}

      <p className="text-muted-foreground mt-8 text-center text-sm">
        <Link href="/" className="text-foreground hover:text-foreground/80 font-medium transition">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

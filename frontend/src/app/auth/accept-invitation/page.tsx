"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

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
      <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
        <div className="text-center">
          <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-4 rounded-lg mb-6">
            <p className="font-medium">Invitation Accepted!</p>
            <p className="text-sm mt-1">
              You&apos;ve joined {organizationName || "the organization"}
            </p>
          </div>
          <Link
            href="/"
            className="inline-block py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Accept Invitation</h1>
        {organizationName && (
          <p className="text-slate-400 mt-2">
            You&apos;ve been invited to join <span className="text-purple-400 font-medium">{organizationName}</span>
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      {invitationToken ? (
        <div className="space-y-4">
          <button
            onClick={handleAccept}
            disabled={loading}
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            {loading ? "Accepting..." : "Accept Invitation"}
          </button>
          
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition"
          >
            Decline
          </button>
        </div>
      ) : (
        <p className="text-center text-slate-400">
          This invitation link is invalid or has expired.
        </p>
      )}

      <p className="mt-8 text-center text-sm text-slate-400">
        <Link href="/" className="text-purple-400 hover:text-purple-300 font-medium transition">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignOutPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(true);

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await authClient.signOut();
        router.push("/");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to sign out. Please try again.");
        setSigningOut(false);
      }
    };

    void handleSignOut();
  }, [router]);

  if (signingOut) {
    return (
      <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white">Signing out...</h1>
          <p className="text-slate-400 mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
      <div className="text-center">
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}
        <Link
          href="/"
          className="inline-block py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

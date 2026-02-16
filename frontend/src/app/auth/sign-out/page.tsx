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
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-lg shadow-2xl p-8 border border-white/10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-white">Signing out...</h1>
            <p className="text-gray-400 mt-2">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-lg shadow-2xl p-8 border border-white/10">
        <div className="text-center">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}
          <Link
            href="/"
            className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

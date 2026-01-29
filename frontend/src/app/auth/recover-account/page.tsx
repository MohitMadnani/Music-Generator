"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function RecoverAccountPage() {
  const router = useRouter();
  const [backupCode, setBackupCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.twoFactor.verifyBackupCode({
        code: backupCode,
      });

      if (result.error) {
        setError(result.error.message ?? "Invalid backup code");
      } else {
        router.push("/");
        router.refresh();
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Recover Account</h1>
        <p className="text-slate-400 mt-2">Use your backup code to sign in</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="backupCode" className="block text-sm font-medium text-slate-300 mb-2">
            Backup Code
          </label>
          <input
            id="backupCode"
            type="text"
            value={backupCode}
            onChange={(e) => setBackupCode(e.target.value.toUpperCase())}
            required
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white text-center font-mono tracking-wider placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="XXXX-XXXX-XXXX"
          />
          <p className="text-slate-400 text-sm mt-2">
            Enter one of your backup codes. Each code can only be used once.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !backupCode}
          className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          {loading ? "Verifying..." : "Recover Account"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-400">
        <Link href="/auth/two-factor" className="text-purple-400 hover:text-purple-300 font-medium transition">
          ← Back to verification
        </Link>
      </p>
    </div>
  );
}

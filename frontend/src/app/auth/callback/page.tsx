"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      setProcessing(false);
      return;
    }

    // If no error, the callback was successful - redirect to home
    const timer = setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 1000);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
        <div className="text-center">
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-4 rounded-lg mb-6">
            <p className="font-medium">Authentication Failed</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
          <Link
            href="/auth/sign-in"
            className="inline-block py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-white">Processing...</h1>
        <p className="text-slate-400 mt-2">Completing authentication</p>
      </div>
    </div>
  );
}

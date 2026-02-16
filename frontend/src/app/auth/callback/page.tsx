"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function CallbackContent() {
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

    // If no error, the callback was successful - redirect to dashboard
    const timer = setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-lg shadow-2xl p-8 border border-white/10">
        <div className="text-center">
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-4 rounded-lg mb-6">
            <p className="font-medium">Authentication Failed</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
          <Link
            href="/auth/sign-in"
            className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-lg shadow-2xl p-8 border border-white/10">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h1 className="text-white text-2xl font-bold">Authentication Successful!</h1>
        <p className="text-gray-400 mt-2">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-lg shadow-2xl p-8 border border-white/10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h1 className="text-white text-2xl font-bold">Processing...</h1>
          </div>
        </div>
      }>
        <CallbackContent />
      </Suspense>
    </div>
  );
}

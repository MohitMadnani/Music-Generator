"use client";

import { authClient } from "@/lib/auth-client";

export default function Upgrade() {
  const handleUpgrade = async () => {
    await authClient.checkout({
      products: ["5cb25676-f9b0-4a41-bde4-62676dc914a0",
        "64100751-e90b-4b9b-a1ad-60be78a5fb38",
        "f63eba76-7bd3-4f09-9581-2c190bbddde3"],
    });
  };

  return (
    <button
      onClick={handleUpgrade}
      className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors"
    >
      Upgrade
    </button>
  );
}

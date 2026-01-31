"use client";

import Link from "next/link";

export function Upgrade() {
  return (
    <Link
      href="/upgrade"
      className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
    >
      Upgrade
    </Link>
  );
}

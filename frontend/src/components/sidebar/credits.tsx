"use client";

interface CreditsProps {
  credits: number;
}

export function Credits({ credits }: CreditsProps) {
  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <span className="text-sm font-medium text-foreground">{credits}</span>
      <span className="text-sm text-muted-foreground">Credits</span>
    </div>
  );
}

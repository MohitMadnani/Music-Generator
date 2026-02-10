import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export async function Credits() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: { credits: true },
  });

  return (
    <div className="flex flex-col">
      <p className="font-semibold">{user?.credits ?? 0}</p>
      <p className="text-muted-foreground text-sm">Credits</p>
    </div>
  );
}

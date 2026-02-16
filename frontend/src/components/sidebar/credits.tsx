import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export async function Credits() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/"); // Redirect to landing page
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: { credits: true },
  });

  return (
    <div className="flex flex-col">
      <p className="font-semibold text-blue-500">{user?.credits ?? 0}</p>
      <p className="text-gray-400 text-sm">Credits</p>
    </div>
  );
}

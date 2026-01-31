import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { BreadcrumbsPageClient } from "@/components/sidebar/breadcrumbs-page-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  const userCredits = (session.user as { credits?: number } | undefined)?.credits ?? 0;

  return (
    <SidebarProvider>
      <AppSidebar user={session.user} credits={userCredits} />
      <SidebarInset>
        <BreadcrumbsPageClient />
        <main className="flex-1 p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

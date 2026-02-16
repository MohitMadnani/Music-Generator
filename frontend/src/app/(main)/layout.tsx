import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import { BreadcrumbPageClient } from "@/components/sidebar/breadcrumbs-page-client";
import SoundBar from "@/components/sound-bar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Credits } from "@/components/sidebar/credits";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    // Redirect unauthenticated users to sign-in
    redirect("/auth/sign-in");
  }

  // All pages under (main) get the full app layout with sidebar
  return (
    <SidebarProvider>
      <AppSidebar user={session.user} creditsSlot={<Credits />} />
      <SidebarInset className="flex h-screen flex-col bg-black">
        <header className="bg-black sticky top-0 z-10 border-b border-white/10 px-4 py-2">
          <div className="flex shrink-0 grow items-center gap-2">
            <SidebarTrigger className="-ml-1 text-white hover:bg-white/10" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 bg-white/10"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbPageClient />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-black text-white">{children}</main>
        <SoundBar />
      </SidebarInset>
    </SidebarProvider>
  );
}

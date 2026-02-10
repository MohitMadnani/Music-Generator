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
    redirect("/auth/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={session.user} creditsSlot={<Credits />} />
      <SidebarInset className="flex h-screen flex-col">
        <header className="bg-background sticky top-0 z-10 border-b px-4 py-2">
          <div className="flex shrink-0 grow items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbPageClient />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
        <SoundBar />
      </SidebarInset>
    </SidebarProvider>
  );
}

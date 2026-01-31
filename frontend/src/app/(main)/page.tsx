import CreateSong from "@/components/sidebar/create";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Start creating your AI-generated music.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Create New Song</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Generate a new AI-powered song from your description.
          </p>
          <div className="mt-4">
            <CreateSong />
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Your Credits</h3>
          <p className="mt-2 text-4xl font-bold">
            {(session?.user as { credits?: number } | undefined)?.credits ?? 0}
          </p>
          <p className="text-sm text-muted-foreground">credits remaining</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Quick Stats</h3>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-muted-foreground">
              Songs created: Coming soon
            </p>
            <p className="text-sm text-muted-foreground">
              Total plays: Coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
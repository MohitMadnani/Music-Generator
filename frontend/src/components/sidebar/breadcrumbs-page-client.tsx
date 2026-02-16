"use client";

import { usePathname } from "next/navigation";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routeNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/create": "Create",
  "/songs": "My Songs",
  "/favorites": "Favorites",
};

export function BreadcrumbPageClient() {
  const pathname = usePathname();
  const pageName = routeNames[pathname] ?? "Page";

  if (pathname === "/dashboard") {
    return (
      <BreadcrumbItem>
        <BreadcrumbPage className="text-white">{pageName}</BreadcrumbPage>
      </BreadcrumbItem>
    );
  }

  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink href="/dashboard" className="text-gray-400 hover:text-white">
          Dashboard
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className="text-gray-600" />
      <BreadcrumbItem>
        <BreadcrumbPage className="text-white">{pageName}</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
}

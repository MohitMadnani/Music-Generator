"use client";

import { usePathname } from "next/navigation";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routeNames: Record<string, string> = {
  "/": "Home",
  "/create": "Create",
  "/songs": "My Songs",
  "/favorites": "Favorites",
  "/settings": "Settings",
  "/upgrade": "Upgrade",
};

export function BreadcrumbPageClient() {
  const pathname = usePathname();
  const pageName = routeNames[pathname] ?? "Page";

  if (pathname === "/") {
    return (
      <BreadcrumbItem>
        <BreadcrumbPage>{pageName}</BreadcrumbPage>
      </BreadcrumbItem>
    );
  }

  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{pageName}</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
}
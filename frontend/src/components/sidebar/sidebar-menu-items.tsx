"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Music } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Create",
    url: "/create",
    icon: Music,
  },
];

export function SidebarMenuItems() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton 
            asChild 
            isActive={pathname === item.url}
            className="text-gray-300 hover:bg-white/10 hover:text-white data-[active=true]:bg-blue-600 data-[active=true]:text-white"
          >
            <Link href={item.url}>
              <item.icon className="size-4" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

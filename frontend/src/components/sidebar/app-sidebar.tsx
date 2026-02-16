"use client";

import { ChevronUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { SidebarMenuItems } from "./sidebar-menu-items";
import Upgrade from "./upgrade";
import { type ReactNode } from "react";

interface AppSidebarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  creditsSlot: ReactNode;
}

export function AppSidebar({ user, creditsSlot }: AppSidebarProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? "U";

  return (
    <Sidebar className="border-r border-white/10 bg-black">
      {/* Header - Logo */}
      <SidebarHeader className="border-b border-white/10 px-4 py-4">
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-wider text-white">
            MUSIC
          </span>
          <span className="text-sm font-semibold tracking-widest text-blue-500">
            GENERATOR
          </span>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuItems />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer - Credits & User */}
      <SidebarFooter className="border-t border-white/10 p-2">
        {/* Credits Row */}
        <div className="flex items-center justify-between px-2 py-2">
          {creditsSlot}
          <Upgrade />
        </div>

        {/* User Dropdown */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full hover:bg-white/10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
                    {initials}
                  </div>
                  <div className="flex flex-1 flex-col items-start text-left">
                    <span className="text-sm font-medium truncate max-w-[140px] text-white">
                      {user?.name ?? "User"}
                    </span>
                    <span className="text-xs text-gray-400 truncate max-w-[140px]">
                      {user?.email ?? ""}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4 text-gray-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-[--radix-dropdown-menu-trigger-width] bg-black border-white/10"
              >
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

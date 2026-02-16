"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogOut, LayoutDashboard, Music as MusicIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export function AuthButtons() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await authClient.getSession();
      if (session.data?.user) {
        setUser(session.data.user as User);
      }
      setLoading(false);
    };
    void checkAuth();
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="h-8 w-8 rounded-full bg-white/10 animate-pulse"></div>
      </div>
    );
  }

  if (user) {
    // User is logged in - show profile dropdown
    const initials = user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback className="bg-blue-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-black border-white/10" align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem
            className="text-white hover:bg-white/10 cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-white hover:bg-white/10 cursor-pointer"
            onClick={() => router.push("/create")}
          >
            <MusicIcon className="mr-2 h-4 w-4" />
            Create
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem
            className="text-red-400 hover:bg-red-500/10 cursor-pointer"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // User is not logged in - show sign in/up buttons
  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        onClick={() => router.push("/auth/sign-in")}
        className="text-white hover:text-blue-400 hover:bg-white/10"
      >
        Sign In
      </Button>
      <Button
        onClick={() => router.push("/auth/sign-up")}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        Get Started
      </Button>
    </div>
  );
}

export function HeroButton() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await authClient.getSession();
      setIsAuthenticated(!!session.data);
    };
    void checkAuth();
  }, []);

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/auth/sign-up");
    }
  };

  return (
    <Button
      size="lg"
      className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6"
      onClick={handleClick}
    >
      {isAuthenticated ? "Go to Dashboard" : "Start Creating Free"}{" "}
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  );
}

export function CTAButton() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await authClient.getSession();
      setIsAuthenticated(!!session.data);
    };
    void checkAuth();
  }, []);

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/auth/sign-up");
    }
  };

  return (
    <Button
      size="lg"
      className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6"
      onClick={handleClick}
    >
      {isAuthenticated ? "Go to Dashboard" : "Start Creating Free"}{" "}
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  Home, 
  Trophy, 
  Calendar, 
  Users, 
  Brackets, 
  ChevronLeft,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Standings", href: "/dashboard/standings", icon: Trophy },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "Teams", href: "/dashboard/teams", icon: Users },
  { name: "Bracket", href: "/dashboard/bracket", icon: Brackets },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Remove the auth cookie
      Cookies.remove("auth");
      // Redirect to login page
      router.push("/");
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-black">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-black/40 backdrop-blur-xl border-r border-white/10 transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-6">
          <div className={cn("flex items-center gap-3", collapsed && "hidden")}>
            <Trophy className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-semibold text-white">3 Pin</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-white/5"
          >
            <ChevronLeft className={cn("h-6 w-6 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>

        <nav className="px-3 py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors",
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5",
                collapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-3">
          <Button
            variant="ghost"
            className={cn(
              "w-full text-gray-400 hover:text-white hover:bg-white/5",
              collapsed && "justify-center"
            )}
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Sign Out</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300 min-h-screen",
          collapsed ? "ml-20" : "ml-64"
        )}
      >
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
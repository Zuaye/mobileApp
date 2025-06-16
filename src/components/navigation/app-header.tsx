import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import Image from "next/image";

export function AppHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Logo et description */}
          <div className="flex items-center justify-center gap-x-3">
            <div className="flex items-center justify-center gap-3">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo/zuaye.png"
                  alt="Zuaye"
                  width={30}
                  height={30}
                />
              </Link>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              Trouve ton hotel
            </span>
          </div>

          {/* Notifications et profil */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Avatar className="h-8 w-8 ring-2 ring-white dark:ring-slate-800">
              <AvatarImage src="/images/humains/her10.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}

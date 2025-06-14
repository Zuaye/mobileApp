import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export function AppHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Menu et Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Zuaye</span>
          </Link>
        </div>

        {/* Actions rapides */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  );
}

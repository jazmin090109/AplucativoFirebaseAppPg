'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, List, LogOut, LifeBuoy, UserCircle } from "lucide-react";
import Logo from "./logo";
import { cn } from "@/lib/utils";
import { performSignOut } from "@/app/actions";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/vales", label: "Vales", icon: List },
  { href: "/perfil", label: "Perfil", icon: UserCircle },
  { href: "/soporte", label: "Soporte", icon: LifeBuoy },
];

const NavLink = ({ href, label, icon: Icon, onClick }: { href: string; label: string; icon: React.ElementType; onClick?: () => void }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className="w-full justify-start gap-2"
        onClick={onClick}
      >
        <Icon className="h-4 w-4" />
        {label}
      </Button>
    </Link>
  );
};

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-2 md:px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/">
              <Logo />
          </Link>
        </div>
        
        {/* Mobile Nav */}
        <div className="flex w-full items-center justify-between md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
               <Menu className="size-8 cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>
                    <Link href="/" onClick={() => setIsSheetOpen(false)}>
                        <Logo />
                    </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1">
                <nav className="flex flex-col gap-1 p-4">
                  {navItems.map((item) => (
                    <NavLink key={item.href} {...item} onClick={() => setIsSheetOpen(false)} />
                  ))}
                </nav>
              </div>
              <div className="p-4 mt-auto border-t">
                 <form action={performSignOut}>
                    <Button type="submit" variant="ghost" className="w-full justify-start gap-2">
                        <LogOut className="h-4 w-4" />
                        Cerrar Sesión
                    </Button>
                 </form>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link href="/">
              <Logo />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="flex-1 items-center justify-between hidden md:flex">
           <nav className="flex items-center gap-4 text-sm lg:gap-6">
            {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    usePathname() === item.href ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  {item.label}
                </Link>
            ))}
          </nav>
           <form action={performSignOut}>
            <Button type="submit" variant="ghost" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}

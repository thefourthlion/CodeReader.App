"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter, usePathname } from "next/navigation";

export const Navbar = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  const handleAuthAction = async () => {
    if (user) {
      await auth.signOut();
      router.push('/');
    } else {
      router.push('/pages/login');
    }
  };

  const isActive = (href: string) => pathname === href;

  const navLinks = [
    { label: "Scan", href: "/pages/qrcode", icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M3 11V3H11V11H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 3H21V11H13V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 13H11V21H3V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { label: "Generator", href: "/pages/createqrcode", icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )},
    ...(user ? [{ label: "My Codes", href: "/pages/qrcodehistory", icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )}] : []),
  ];

  return (
    <NextUINavbar 
      maxWidth="xl" 
      position="sticky" 
      className="bg-gradient-to-r from-content2 via-content2 to-primary/5 border-b-2 border-primary/20 backdrop-blur-xl shadow-lg"
      classNames={{
        wrapper: "px-4 sm:px-6",
      }}
    >
      {/* Logo & Brand */}
      <NavbarContent className="basis-1/5 sm:basis-full gap-4" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink 
            className="flex items-center gap-2.5 group transition-all duration-300 hover:scale-105" 
            href="/"
          >
            <div className="relative p-1.5 rounded-xl bg-gradient-primary shadow-lg group-hover:shadow-glow-primary transition-all duration-300">
              <Logo size={32} className="rounded-lg" />
            </div>
            <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300">
              CodeReader.app
            </span>
          </NextLink>
        </NavbarBrand>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-2 ml-4">
          {navLinks.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                href={item.href}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm
                  transition-all duration-300 transform hover:scale-105
                  ${isActive(item.href) 
                    ? 'bg-gradient-primary text-white shadow-lg shadow-primary/30' 
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/10'
                  }
                `}
              >
                <span className={isActive(item.href) ? 'text-white' : 'text-primary'}>
                  {item.icon}
                </span>
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                )}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Desktop Right Side */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full gap-3" justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Button 
            color="primary"
            variant="solid"
            size="sm"
            className={`
              font-bold px-5 transition-all duration-300 transform hover:scale-105
              ${user 
                ? 'bg-gradient-to-r from-default-100 to-default-200 text-foreground hover:shadow-lg' 
                : 'bg-gradient-primary text-white shadow-lg hover:shadow-glow-primary'
              }
            `}
            onClick={handleAuthAction}
            startContent={
              user ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )
            }
          >
            {user ? "Sign Out" : "Sign In"}
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Right Side */}
      <NavbarContent className="sm:hidden basis-1 pl-2" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle className="ml-2 text-primary" />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-6 bg-gradient-to-br from-background via-background to-primary/5 backdrop-blur-xl">
        <div className="flex flex-col gap-3 px-2">
          {navLinks.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link 
                href={item.href} 
                size="lg"
                className={`
                  flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl
                  transition-all duration-300 transform hover:scale-[1.02]
                  ${isActive(item.href) 
                    ? 'bg-gradient-primary text-white font-bold shadow-lg shadow-primary/30' 
                    : 'text-foreground hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 border-2 border-transparent hover:border-primary/20'
                  }
                `}
              >
                <span className={isActive(item.href) ? 'text-white' : 'text-primary'}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-3" />
          
          <NavbarMenuItem>
            <Button
              fullWidth
              color="primary"
              variant="solid"
              size="lg"
              className={`
                font-bold transition-all duration-300 transform hover:scale-[1.02]
                ${user 
                  ? 'bg-gradient-to-r from-default-100 to-default-200 text-foreground' 
                  : 'bg-gradient-primary text-white shadow-lg hover:shadow-glow-primary'
                }
              `}
              onClick={handleAuthAction}
              startContent={
                user ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="10,17 15,12 10,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="15" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )
              }
            >
              {user ? "Sign Out" : "Sign In"}
            </Button>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

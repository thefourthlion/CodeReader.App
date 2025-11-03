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
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const handleAuthAction = async () => {
    if (user) {
      await auth.signOut();
      router.push('/');
    } else {
      router.push('/pages/login');
    }
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="bg-gradient-to-r from-content2 via-content2 to-primary/5 border-b-2 border-primary/20 backdrop-blur-sm shadow-lg">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2 hover:opacity-80 transition-opacity" href="/">
            <div className="bg-gradient-primary p-2 rounded-xl shadow-glow-primary">
              <Logo />
            </div>
            <p className="font-bold bg-gradient-primary bg-clip-text text-transparent text-lg">CodeReader.app</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {[
            { label: "Scan", href: "/pages/qrcode" },
            { label: "Generator", href: "/pages/createqrcode" },
            ...(user ? [{ label: "My Codes", href: "/pages/qrcodehistory" }] : []),
            // { label: "Pricing", href: "/pages/products" },
            // { label: "Account", href: "/pages/account" },
          ].map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-bold data-[active=true]:bg-gradient-primary data-[active=true]:bg-clip-text data-[active=true]:text-transparent transition-all duration-300 hover:text-primary font-semibold"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem>
          <Button 
            color="primary" 
            variant="solid" 
            className="bg-gradient-primary text-primary-foreground font-bold shadow-lg hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105"
            onClick={handleAuthAction}
          >
            {user ? "Sign Out" : "Sign In"}
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {[
            { label: "Scan", href: "/pages/qrcode" },
            { label: "Generator", href: "/pages/createqrcode" },
            ...(user ? [{ label: "My Codes", href: "/pages/qrcodehistory" }] : []),
            // { label: "Pricing", href: "/pages/products" },
            // { label: "Account", href: "/pages/account" },
            { 
              label: user ? "Sign Out" : "Sign In", 
              href: "#",
              onClick: handleAuthAction 
            },
          ].map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              {item.onClick ? (
                <Link 
                  color={"foreground"} 
                  href={item.href} 
                  size="lg"
                  onClick={item.onClick}
                  className="font-semibold hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ) : (
                <Link color={"foreground"} href={item.href} size="lg" className="font-semibold hover:text-primary transition-colors duration-300">
                  {item.label}
                </Link>
              )}
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
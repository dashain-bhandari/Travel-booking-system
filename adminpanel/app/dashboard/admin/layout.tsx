"use client";
import Link from "next/link";
import { Bell, BookA, BookCheck, Bug, Calendar, CircleUser, Gift, Info, LayoutGrid, LayoutPanelTop, ListPlus, Loader, Menu, MessageSquareText, Newspaper, Package, Presentation, Search, Settings, ShoppingCart, SquareActivity, SquareUser, TicketCheck, TicketPlus, TicketSlash, User, User2, UserCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/utils/something/supabase/supabaseClient";
import ThemeToggleButton from "@/components/dashboard/ThemeToggleButton";
import { IconCollection } from "@/components/svg-icons/IconCollection";
import Image from "next/image";
import logolight from "@/utils/logo.png";
import logodark from "@/utils/logow.png";
import { AxiosInstance } from "@/utils/config";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  console.log(pathname);
  const router = useRouter();
 

  const [isLogingOut, seIstLogingOut] = useState<boolean>(false);
  const handleLogout = async () => {
    seIstLogingOut(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message || "Cound not sign out. Please try again.");
      seIstLogingOut(false);
      return;
    }

    if (!error) {
      toast.success("You have been signed out successfully.");
      seIstLogingOut(false);
      router.push("/");
      return;
    }
  };

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const markAsRead = async () => {
      try {
        console.log("hii");
        if (pathname.includes("notifications")) {
          const result = await AxiosInstance.put("/notifications/markRead");
          console.log(result);
        }

        const { data } = await AxiosInstance.get("/notifications/unread");
        console.log(data);
        setUnreadCount(data?.count);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    markAsRead();
  }, [pathname]);

  // <LayoutGrid />
  const menuItems = [
    // { href: "/dashboard/admin", icon: <IconGraph className="h-5 w-5" />, label: "Dashboard", extraClasses: "text-muted-foreground hover:text-foreground" },
    // With badge
    // { href: "/dashboard/admin/categories", icon: <IconCategory className="h-5 w-5" />, label: "Categories", extraClasses: "bg-muted text-foreground hover:text-foreground", badge: 6 },
    { href: "/dashboard/admin", icon: <LayoutGrid className="h-5 w-5" />, label: "Overview", extraClasses: "text-muted-foreground hover:text-foreground" },
    
    { href: "/dashboard/admin/collections", icon: <IconCollection className="h-5 w-5" />, label: "Packages", extraClasses: "text-muted-foreground hover:text-foreground" },
    { href: "/dashboard/admin/addOnFields", icon: <ListPlus className="h-5 w-5" />, label: "Add on fields", extraClasses: "text-muted-foreground hover:text-foreground" },
    { href: "/dashboard/admin/bookings", icon: <BookCheck className="h-5 w-5" />, label: "Bookings", extraClasses: "text-muted-foreground hover:text-foreground" },

    { href: "/dashboard/admin/activities", icon: <SquareActivity className="h-5 w-5" />, label: "Activities", extraClasses: "text-muted-foreground hover:text-foreground" },

    { href: "/dashboard/admin/customtrips", icon: <TicketSlash className="h-5 w-5" />, label: "Custom Trips", extraClasses: "text-muted-foreground hover:text-foreground" },
    { href: "/dashboard/admin/users", icon: <Users className="h-5 w-5" />, label: "Users", extraClasses: "text-muted-foreground hover:text-foreground" },
    { href: "/dashboard/admin/role-specific-users", icon: <SquareUser className="h-5 w-5" />, label: "Role Specific Users", extraClasses: "text-muted-foreground hover:text-foreground" },

    { href: "/dashboard/admin/calendar", icon: <Calendar className="h-5 w-5" />, label: "Calendar", extraClasses: "text-muted-foreground hover:text-foreground" },
    { href: "/dashboard/admin/training", icon: <Presentation className="h-5 w-5" />, label: "Training", extraClasses: "text-muted-foreground hover:text-foreground" },

    { href: "/dashboard/admin/blogs", icon: <Newspaper className="h-5 w-5" />, label: "Blogs", extraClasses: "text-muted-foreground hover:text-foreground" },
    { href: "/dashboard/admin/messages", icon: <MessageSquareText className="h-5 w-5" />, label: "Inquiries", extraClasses: "text-muted-foreground hover:text-foreground" },
    { href: "/dashboard/admin/subscriptions", icon: <UserCheck className="h-5 w-5" />, label: "Subscribers", extraClasses: "text-muted-foreground hover:text-foreground" },
  
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center justify-center border-b px-4 lg:h-[60px] lg:px-6 ">
            <Link
              href="/dashboard/admin"
              className="flex items-center justify-center gap-2 mx-auto font-semibold ">
              <Image
                src={logolight}
                alt="logo"
                width={150}
                height={150}
                className=" block dark:hidden my-4 "
              />
              <Image
                src={logodark}
                alt="logo"
                width={150}
                height={150}
                className="hidden dark:block my-4 mx-auto "
              />

              {/* <div className=" flex items-center gap-1 text-lg text-primary">
                <Package />
                <p>Contour Expedition</p>
              </div> */}
            </Link>
            {/* <Button
              variant="outline"
              size="icon"
              className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>

          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {/* */}

              {menuItems.map((item: any, index: number) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`${pathname === item.href ? " bg-muted  text-primary transition-all hover:text-primary" : "   text-muted-foreground transition-all hover:text-primary "} 
                  flex items-center gap-3  px-3 py-2
                  rounded-lg`}>
                  {item.icon}
                  {item.label}
                  {item.badge && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{item.badge}</Badge>}
                </Link>
              ))}
            </nav>
          </div>

          {/* <div className="mb-4">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href={"/dashboard/admin/info"}
                className={`${pathname === "/dashboard/admin/info" ? " bg-muted  text-primary transition-all hover:text-primary" : "   text-muted-foreground transition-all hover:text-primary "} 
                  flex items-center gap-3  px-3 py-2
                  rounded-lg`}>
                <Info
                  size={18}
                  className=" "
                />
                Information
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">1</Badge>
              </Link>

              <Link
                href={"/dashboard/admin/settings"}
                className={`${pathname === "/dashboard/admin/settings" ? " bg-muted  text-primary transition-all hover:text-primary" : "   text-muted-foreground transition-all hover:text-primary "} 
                  flex items-center gap-3  px-3 py-2
                  rounded-lg`}>
                <Settings
                  size={18}
                  className=" "
                />
                Settings
              </Link>

              <Link
                href={"/dashboard/admin/report-issue"}
                className={`${pathname === "/dashboard/admin/report-issue" ? " bg-muted  text-primary transition-all hover:text-primary" : "   text-muted-foreground transition-all hover:text-primary "} 
                  flex items-center gap-3  px-3 py-2
                  rounded-lg`}>
                <Bug
                  size={18}
                  className=" "
                />
                Report Issue
              </Link>
            </nav>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col max-h-screen overflow-scroll overflow-x-hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 py-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {/* {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${item.extraClasses || ""}`}>
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{item.badge}</Badge>}
                  </Link>
                ))} */}
                {menuItems.map((item: any, index: number) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`${pathname === item.href ? " bg-muted  text-primary transition-all hover:text-primary" : "   text-muted-foreground transition-all hover:text-primary "} 
                  flex items-center gap-3  px-3 py-2
                  rounded-lg`}>
                    {item.icon}
                    {item.label}
                    {item.badge && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{item.badge}</Badge>}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>

          <div className="relative  p-2">
            <Button
              variant="outline"
              size="icon"
              className="ml-auto "
              onClick={() => router.push("/dashboard/admin/notifications")}
            >
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              {unreadCount > 0 && <Badge className="ml-auto absolute  top-0 right-0 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">{unreadCount} </Badge>}

            </Button>
          </div>
          <ThemeToggleButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <Link href="/dashboard/admin/profile">
                <DropdownMenuItem className=" cursor-pointer">Settings</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className=" text-white focus:text-white bg-red-500 focus:bg-red-600 cursor-pointer"
                disabled={isLogingOut}
                onClick={handleLogout}>
                {" "}
                {isLogingOut && (
                  <Loader
                    size={14}
                    className=" me-1 animate-spin"
                  />
                )}{" "}
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <div className="flex flex-1  p-4 lg:p-6 ">{children}</div>
      </div>
    </div>
  );
}

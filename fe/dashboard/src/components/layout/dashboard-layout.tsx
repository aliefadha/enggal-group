import * as React from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import brandIcon from "@/assets/icons/brand.svg";
import beritaIcon from "@/assets/icons/berita.svg";
import dashboardIcon from "@/assets/icons/dashboard.svg";
import outletIcon from "@/assets/icons/outlet.svg";
import promoIcon from "@/assets/icons/promo.svg";
import userCareerIcon from "@/assets/icons/usercareer.svg";

type NavItem = {
  title: string;
  href: string;
  icon: string;
  exact?: boolean;
};

const primaryNav: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: dashboardIcon,
    exact: true,
  },
  {
    title: "Berita",
    href: "/berita",
    icon: beritaIcon,
  },
  {
    title: "User Career",
    href: "/user-career",
    icon: userCareerIcon,
  },
  {
    title: "Brand",
    href: "/brand",
    icon: brandIcon,
  },
  {
    title: "Promo",
    href: "/promo",
    icon: promoIcon,
  },
  {
    title: "Outlet",
    href: "/outlet",
    icon: outletIcon,
  },
];

const sidebarTheme = {
  "--sidebar": "#52000E",
  "--sidebar-foreground": "#ffffff",
  "--sidebar-border": "rgba(255, 255, 255, 0.08)",
  "--sidebar-muted": "rgba(255, 255, 255, 0.24)",
  "--sidebar-accent": "#FFC24C",
  "--sidebar-accent-foreground": "#52000E",
} as React.CSSProperties;

function DashboardNavItem({ item }: { item: NavItem }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isActive = React.useMemo(() => {
    if (item.exact) {
      return pathname === item.href;
    }

    return pathname.startsWith(item.href);
  }, [item.exact, item.href, pathname]);

  const itemClasses = [
    "flex items-center gap-3 rounded-xl px-4 py-6 text-lg font-medium transition-all duration-200",
    isActive
      ? "bg-[#FFB835] text-[#9C0000]"
      : "text-[#A25C67] hover:bg-white/10 hover:text-white",
  ]
    .filter(Boolean)
    .join(" ");

  const iconClasses = `h-6 w-6 transition-opacity ${
    isActive ? "opacity-100" : "opacity-70"
  }`;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
        <Link to={item.href} className={itemClasses}>
          <img
            src={item.icon}
            alt=""
            className={iconClasses}
            aria-hidden="true"
          />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function AppSidebar() {
  return (
    <Sidebar className="border-none bg-[#6E0112] text-white">
      <SidebarHeader className=" px-4 py-8">
        <div className="flex flex-col items-center justify-center text-center">
          <img
            src="/images/enggal_white.png"
            alt="Logo"
            className="h-10 w-auto"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-8 px-4 py-6">
        <SidebarGroup className="gap-2">
          <SidebarGroupLabel className="sr-only">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primaryNav.map((item) => (
                <DashboardNavItem key={item.href} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export function DashboardLayout() {
  return (
    <SidebarProvider style={sidebarTheme}>
      <div className="bg-background flex min-h-svh w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 h-6" />
          </header>
          <div className="flex flex-1 flex-col overflow-auto">
            <div className="grow p-4">
              <Outlet />
            </div>
          </div>
          {import.meta.env.DEV ? (
            <TanStackRouterDevtools position="bottom-right" />
          ) : null}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

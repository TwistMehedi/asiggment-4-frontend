import currentUser from "@/actions/user";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { User } from "@/types/user.types";
import { Home } from "lucide-react";
import Link from "next/link";
import ProfileDropdown from "@/components/User/ProfileDropdown";
import ThemeToggle from "@/components/ThemeToggle";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = ((await currentUser()) as User) || null;
   return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="bg-gray-50/50">
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-6 shadow-md">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 hover:bg-orange-50 hover:text-orange-600 transition-colors rounded-lg" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4 bg-gray-200"
            />
          </div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:flex items-center gap-2">
                <Home size={14} className="text-gray-400" />
                <BreadcrumbLink
                  href="#"
                  className="font-bold text-gray-400 hover:text-orange-600 transition-colors uppercase text-[10px] tracking-widest"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className="hidden md:block" />

              <BreadcrumbItem>
                <Link href={"/"}>
                  <BreadcrumbPage className="font-black text-gray-800 uppercase text-[10px] tracking-widest bg-orange-100 text-orange-700 px-3 py-1 rounded-full shadow-sm">
                    {user?.role} Portal
                  </BreadcrumbPage>
                </Link>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <ProfileDropdown user={user} />
          <ThemeToggle />
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 pt-24 md:p-8 md:pt-24">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;

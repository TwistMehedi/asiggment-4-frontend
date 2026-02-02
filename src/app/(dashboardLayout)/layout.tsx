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
import { Roles } from "@/constants/role";
import { Loader2, Home } from "lucide-react";
import Link from "next/link";

const DashboardLayout = async ({
  admin,
  customer,
  provider,
}: {
  admin: React.ReactNode;
  customer: React.ReactNode;
  provider: React.ReactNode;
}) => {
  const userData = await currentUser();
  const user = userData?.user;

  if (!user) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-gray-50">
        <Loader2 className="animate-spin text-orange-600" size={40} />
        <p className="text-gray-500 font-black uppercase tracking-widest text-xs">
          Authenticating...
        </p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="bg-gray-50/50">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-md px-6 shadow-sm transition-all">
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
                    {user.role} Portal
                  </BreadcrumbPage>
                </Link>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Link href={"/"}>Home</Link>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full transition-all duration-500">
          <div className="relative min-h-[calc(100vh-120px)] w-full rounded-[2rem] md:rounded-[3rem] border border-gray-100 bg-white/50 p-1 md:p-2 shadow-inner">
            <div className="w-full h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
              {user.role === Roles.provider
                ? provider
                : user.role === Roles.customer
                  ? customer
                  : admin}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;

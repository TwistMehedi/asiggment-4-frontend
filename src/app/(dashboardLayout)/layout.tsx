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
import Link from "next/link";

const DashboardLayout = async ({
  customer,
  admin,
  provider,
}: {
  customer: React.ReactNode;
  admin: React.ReactNode;
  provider: React.ReactNode;
}) => {
  const { user } = await currentUser();

  if (!user) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <Link href={"/"}>
                  <BreadcrumbPage>Home</BreadcrumbPage>
                </Link>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {user.role === Roles.provider
            ? provider
            : user.role === Roles.customer
              ? customer
              : admin}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;

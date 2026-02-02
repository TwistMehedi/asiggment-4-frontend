import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { getNavData } from "@/helper/routes.role";
import { UserCircle, UtensilsCrossed, LayoutDashboard } from "lucide-react";
import LogOut from "./Navbar/LogOut";

export async function AppSidebar({ user, ...props }: { user: any }) {
  const data = user?.role ? await getNavData(user.role) : { navMain: [] };

  return (
    <Sidebar {...props} className="border-r border-gray-100 shadow-xl bg-white">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="h-9 w-9 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
            <UtensilsCrossed size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-gray-900 tracking-tighter leading-none uppercase text-lg">
              Meal<span className="text-orange-600">Forge</span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              Management
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        {data?.navMain?.length > 0 ? (
          data.navMain.map((group: any, index: number) => (
            <SidebarGroup key={index} className="py-4">
              <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-4 mb-2">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items?.map((item: any) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.isActive}
                        className={`group h-11 rounded-xl px-4 transition-all duration-300 ${
                          item.isActive
                            ? "bg-orange-50 text-orange-600 shadow-sm"
                            : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-3"
                        >
                          {item.icon ? (
                            <item.icon
                              size={18}
                              className={
                                item.isActive
                                  ? "text-orange-600"
                                  : "text-gray-400 group-hover:text-gray-900"
                              }
                            />
                          ) : (
                            <LayoutDashboard
                              size={18}
                              className={
                                item.isActive
                                  ? "text-orange-600"
                                  : "text-gray-400 group-hover:text-gray-900"
                              }
                            />
                          )}
                          <span className="font-bold text-sm tracking-tight">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        ) : (
          <div className="p-8 text-center space-y-2 opacity-50">
            <div className="h-1 bg-gray-100 rounded-full w-full animate-pulse" />
            <p className="text-[10px] font-black uppercase text-gray-300">
              No Routes Available
            </p>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-50 bg-gray-50/30">
        <div className="flex items-center gap-3 px-2 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="h-9 w-9 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
            <UserCircle size={24} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-black text-gray-800 text-xs truncate uppercase tracking-tighter">
              {user?.name || "Guest User"}
            </span>
            <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest leading-none">
              {user?.role || "Visitor"}
            </span>
          </div>
        </div>
        <div className="mt-3">
          <LogOut />
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

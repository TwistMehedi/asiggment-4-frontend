export const dynamic = "force-dynamic";

import { cookies, headers } from "next/headers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users as UsersIcon,
  Mail,
  ShieldCheck,
  UserCircle,
  Search,
  Inbox,
  Edit,
} from "lucide-react";
import { UserEditModal } from "@/components/User/ManageUserModal";

const Users = async () => {
  let users = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/user/admin/users`,
      {
        method: "GET",
        headers: await headers(),
        cache: "no-store",
      },
    );

    if (res.ok) {
      const result = await res.json();
      users = result?.users || [];
    }
  } catch (error) {
    console.error("User fetch error:", error);
  }

  return (
    <div className="w-full bg-gray-50/50 p-4 md:p-8 lg:p-10 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2 tracking-tighter uppercase">
              <UsersIcon className="text-orange-600 shrink-0" size={28} />
              User Management
            </h1>
            <p className="text-gray-500 text-xs md:text-sm font-medium">
              {users.length > 0
                ? `Total ${users.length} users registered in the platform.`
                : "No registered users found."}
            </p>
          </div>

          <div className="w-full sm:w-auto bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2 px-4">
            <Search size={18} className="text-gray-400" />
            <input
              placeholder="Search users..."
              className="bg-transparent border-none focus:outline-none text-sm font-medium w-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <Table className="min-w-[700px] md:min-w-full">
              <TableHeader className="bg-gray-50/80">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 py-6 pl-8">
                    User Info
                  </TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 py-6">
                    Contact Details
                  </TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 py-6 text-center">
                    Role
                  </TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 py-6 text-center">
                    Account Status
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.length > 0 ? (
                  users.map((user: any) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-orange-50/30 transition-colors border-gray-50"
                    >
                      <TableCell className="py-5 pl-8">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 shadow-inner">
                            <UserCircle size={26} />
                          </div>
                          <span className="font-black text-gray-800 tracking-tight text-base">
                            {user.name}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2 text-gray-500">
                          <div className="h-7 w-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                            <Mail size={14} className="text-gray-400" />
                          </div>
                          <span className="text-sm font-bold tracking-tight">
                            {user.email}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-center">
                        <span
                          className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                            user.role === "ADMIN"
                              ? "bg-purple-100/50 text-purple-600 border-purple-100"
                              : "bg-blue-100/50 text-blue-600 border-blue-100"
                          }`}
                        >
                          {user.role}
                        </span>
                      </TableCell>

                      <TableCell className="text-center">
                        <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border border-green-100 shadow-sm shadow-green-100">
                          <ShieldCheck size={14} /> Active
                        </span>
                      </TableCell>

                      <TableCell className="text-center">
                        {/* <Link href={`/admin/users/user/${user.id}`}> */}
                        <span className="inline-flex cursor-pointer items-center gap-1.5 bg-green-50 text-green-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border border-green-100 shadow-sm shadow-green-100">
                          <UserEditModal user={user} />
                        </span>
                        {/* </Link> */}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center">
                          <Inbox className="text-gray-200" size={40} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-black text-gray-800 uppercase tracking-tighter">
                            System is empty
                          </p>
                          <p className="text-xs text-gray-400 font-medium max-w-[200px] mx-auto">
                            No users have registered on your platform yet.
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

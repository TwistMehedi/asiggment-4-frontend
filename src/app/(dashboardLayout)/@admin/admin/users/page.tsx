import { envConfig } from "@/config/envConfig";
import { cookies } from "next/headers";
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
} from "lucide-react";

const Users = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${envConfig.backend_host_server_url}/admin/users`, {
    method: "GET",
    headers: {
      Cookie: `token=${token}`,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log("Backend Error Message", errorData);
    return null;
  }

  const { users } = await res.json();

  if (users?.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2">
              <UsersIcon className="text-orange-600" />
              User Management
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Total {users.length} users registered.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-bold text-gray-700">
                    Name
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    Email
                  </TableHead>
                  <TableHead className="font-bold text-gray-700 text-center">
                    Role
                  </TableHead>
                  <TableHead className="font-bold text-gray-700 text-center">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user: any) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-orange-50/30 transition-colors"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                          <UserCircle size={24} />
                        </div>
                        <span className="font-bold text-gray-800 line-clamp-1">
                          {user.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Mail size={14} className="text-gray-400 shrink-0" />
                        <span className="text-sm line-clamp-1">
                          {user.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                          user.role === "ADMIN"
                            ? "bg-purple-50 text-purple-600 border-purple-100"
                            : "bg-blue-50 text-blue-600 border-blue-100"
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center gap-1 text-green-600 text-xs font-bold">
                        <ShieldCheck size={14} /> Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))}

                {users.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-20 text-gray-400"
                    >
                      No users found in the system.
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

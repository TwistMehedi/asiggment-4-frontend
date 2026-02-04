export const dynamic = "force-dynamic";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  MoreVertical,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";

const AllOrders = async () => {
  let orders = [];

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_HOST_URL;

    const res = await fetch(`${baseUrl}/api/order/admin/orders`, {
      method: "GET",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      orders = data?.orders || [];
    }
  } catch (error) {
    console.error("Orders fetch error:", error);
  }

  return (
    <div className="w-full bg-gray-50/50 p-4 md:p-8 lg:p-10 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2 tracking-tighter uppercase">
              <ShoppingBag className="text-orange-600 shrink-0" size={28} />
              All Orders
            </h1>
            <p className="text-gray-500 text-xs md:text-sm font-medium">
              Manage and track all incoming meal orders.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm px-4">
            <span className="text-xs font-black uppercase text-gray-400">
              Total:
            </span>
            <span className="text-orange-600 font-black text-lg">
              {orders.length}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <Table className="min-w-[800px] md:min-w-full">
              <TableHeader className="bg-gray-50/80">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 py-6 pl-8">
                    Order ID
                  </TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 py-6">
                    Customer
                  </TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 py-6 text-center">
                    Amount
                  </TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 py-6 text-center">
                    Status
                  </TableHead>
                  <TableHead className="text-right font-black text-[10px] uppercase tracking-widest text-gray-400 py-6 pr-8">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order: any) => (
                    <TableRow
                      key={order.id}
                      className="hover:bg-orange-50/30 transition-colors border-gray-50"
                    >
                      <TableCell className="py-5 pl-8">
                        <span className="font-black text-gray-400 text-xs tracking-tighter uppercase">
                          #{order.id.slice(-6)}
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-black text-gray-800 tracking-tight">
                            {order.user?.name || "Guest"}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                            {order.user?.email}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-center">
                        <span className="font-black text-gray-900">
                          ${order.totalAmount || 0}
                        </span>
                      </TableCell>

                      <TableCell className="text-center">
                        <StatusBadge status={order.status} />
                      </TableCell>

                      <TableCell className="text-right pr-8">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-xl hover:bg-white hover:text-orange-600 shadow-sm border border-transparent hover:border-gray-100"
                        >
                          <Eye size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3 opacity-40">
                        <AlertCircle size={48} />
                        <p className="font-black text-gray-800 uppercase text-sm tracking-widest">
                          No Orders Found
                        </p>
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

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    PENDING: "bg-amber-100 text-amber-600 border-amber-200",
    DELIVERED: "bg-green-100 text-green-600 border-green-200",
    CANCELLED: "bg-red-100 text-red-600 border-red-200",
    PROCESSING: "bg-blue-100 text-blue-600 border-blue-200",
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${styles[status] || "bg-gray-100 text-gray-600 border-gray-200"}`}
    >
      {status}
    </span>
  );
};

export default AllOrders;

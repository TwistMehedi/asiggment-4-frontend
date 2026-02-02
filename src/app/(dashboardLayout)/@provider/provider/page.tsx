"use client";
import { useEffect, useState } from "react";
import {
  Utensils,
  ShoppingBag,
  Clock,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function ProviderDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/stats/all`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const result = await response.json();
        // console.log(result);
        if (response.ok) {
          setStats(result.data);
        } else {
          toast.error(result.message || "Failed to load stats");
        }
      } catch (error) {
        toast.error("Network error fetching stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-orange-600" size={48} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Overview of your kitchen performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Meals"
          value={stats?.totalMeals || 0}
          icon={<Utensils className="text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={<ShoppingBag className="text-orange-600" />}
          color="bg-orange-50"
        />
        <StatCard
          title="Pending"
          value={stats?.pendingOrders || 0}
          icon={<Clock className="text-purple-600" />}
          color="bg-purple-50"
        />
        <StatCard
          title="Earnings"
          value={`৳ ${stats?.totalEarnings || 0}`}
          icon={<TrendingUp className="text-green-600" />}
          color="bg-green-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm uppercase">
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats?.recentOrders?.length > 0 ? (
                  stats.recentOrders.map((order: any) => (
                    <tr
                      key={order.id}
                      className="group hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 font-medium text-gray-700">
                        {order.user?.name}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === "DELIVERED"
                              ? "bg-green-100 text-green-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 font-black text-right">
                        ৳ {order.totalPrice}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-10 text-center text-gray-400">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
          <div className="p-4 bg-orange-50 rounded-2xl">
            <p className="text-sm text-orange-600 font-bold uppercase mb-1">
              Conversion Rate
            </p>
            <h4 className="text-2xl font-black">78%</h4>
            <p className="text-xs text-orange-400 mt-2">
              Based on meal views vs orders
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div
      className={`${color} p-6 rounded-[2.5rem] transition-all hover:scale-105`}
    >
      <div className="p-3 bg-white w-fit rounded-2xl shadow-sm mb-4">
        {icon}
      </div>
      <p className="text-gray-500 font-medium text-sm">{title}</p>
      <h3 className="text-2xl font-black text-gray-900">{value}</h3>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Store,
  ShoppingBag,
  DollarSign,
  Utensils,
  TrendingUp,
  Loader2,
} from "lucide-react";
import Link from "next/link";

const AdminStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/stats/admin/all`,
          {
            method: "GET",
            cache: "no-store",
            credentials: "include",
          },
        );

        console.log(res);
        const result = await res.json();

        setStats(result.data);
      } catch (error) {
        console.error("Admin stats fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  console.log(stats);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin text-orange-600" size={40} />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: `৳${stats?.totalRevenue?.toLocaleString()}`,
      icon: <DollarSign className="text-emerald-600" />,
      bg: "bg-emerald-50",
      detail: "Overall earnings",
    },
    {
      title: "Total Customers",
      value: stats?.totalUsers,
      icon: <Users className="text-blue-600" />,
      bg: "bg-blue-50",
      detail: "Registered users",
    },
    {
      title: "Total Providers",
      value: stats?.totalProviders,
      icon: <Store className="text-purple-600" />,
      bg: "bg-purple-50",
      detail: "Active kitchens",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders,
      icon: <ShoppingBag className="text-orange-600" />,
      bg: "bg-orange-50",
      detail: "Orders placed",
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50/50 min-h-screen">
      <div>
        <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
          Admin <span className="text-orange-600">Overview</span>
        </h1>
        <p className="text-gray-500 font-medium">
          Platform performance and insights at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div
              className={`w-12 h-12 ${card.bg} rounded-2xl flex items-center justify-center mb-4`}
            >
              {card.icon}
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {card.title}
            </p>
            <h3 className="text-2xl font-black text-gray-800 mt-1">
              {card.value}
            </h3>
            <p className="text-xs text-gray-400 mt-2 font-medium">
              {card.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
            <TrendingUp size={20} className="text-orange-600" />
            Recent Platform Activity
          </h3>
          <Link href={"/admin/orders"}>
            <button className="text-xs font-bold text-orange-600 hover:underline">
              View All Orders
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats?.recentOrders?.map((order: any) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-blue-600 text-sm">
                    #{order.id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {order.user?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.provider?.shopName || "N/A"}
                  </td>
                  <td className="px-6 py-4 font-black text-gray-800">
                    ৳{order.totalAmount}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;

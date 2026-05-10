"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Store,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/stats/admin/all`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          },
        );

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="animate-spin text-orange-600" size={40} />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: `৳${stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: <DollarSign className="text-emerald-600" />,
      bg: "bg-emerald-50",
      detail: "Overall earnings",
    },
    {
      title: "Total Customers",
      value: stats?.totalUsers || 0,
      icon: <Users className="text-blue-600" />,
      bg: "bg-blue-50",
      detail: "Registered users",
    },
    {
      title: "Total Providers",
      value: stats?.totalProviders || 0,
      icon: <Store className="text-purple-600" />,
      bg: "bg-purple-50",
      detail: "Active shops",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: <ShoppingBag className="text-orange-600" />,
      bg: "bg-orange-50",
      detail: "Orders placed",
    },
  ];

  const totalPages = Math.ceil(
    (stats?.recentOrders?.length || 0) / itemsPerPage,
  );

  const paginatedOrders = stats?.recentOrders?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl md:text-4xl font-black text-gray-800">
          Admin <span className="text-orange-600">Overview</span>
        </h1>

        <p className="text-sm md:text-base text-gray-500 mt-2">
          Platform performance and insights at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.bg}`}
            >
              {card.icon}
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-widest text-gray-400">
              {card.title}
            </p>

            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mt-2 break-words">
              {card.value}
            </h2>

            <p className="text-sm text-gray-400 mt-2">{card.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6 shadow-sm">
          <h3 className="text-lg font-black text-gray-800 mb-6">
            Monthly Revenue
          </h3>

          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#ea580c" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6 shadow-sm">
          <h3 className="text-lg font-black text-gray-800 mb-6">
            Order Status Distribution
          </h3>

          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.orderStatusData || []}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${((percent || 0) * 100).toFixed(0)}%`
                  }
                >
                  {stats?.orderStatusData?.map((entry: any, index: number) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {stats?.orderStatusData?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm font-medium text-gray-600"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <span>
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="font-black text-gray-800 flex items-center gap-2 text-lg">
            <TrendingUp size={20} className="text-orange-600" />
            Recent Platform Activity
          </h3>

          <Link href="/admin/orders">
            <button className="text-sm font-bold text-orange-600 hover:underline">
              View All Orders
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs uppercase tracking-widest text-gray-400">
                <th className="px-4 md:px-6 py-4">Order ID</th>
                <th className="px-4 md:px-6 py-4">Customer</th>
                <th className="px-4 md:px-6 py-4">Provider</th>
                <th className="px-4 md:px-6 py-4">Amount</th>
                <th className="px-4 md:px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedOrders?.map((order: any) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 md:px-6 py-4 font-bold text-blue-600 text-sm whitespace-nowrap">
                    #{order.id.slice(-6).toUpperCase()}
                  </td>

                  <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {order.user?.name}
                  </td>

                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {order.provider?.shopName || "N/A"}
                  </td>

                  <td className="px-4 md:px-6 py-4 font-bold text-gray-800 whitespace-nowrap">
                    ৳{order.totalAmount}
                  </td>

                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-gray-100 text-gray-700">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 p-6 border-t border-gray-100">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-4 cursor-pointer py-2 rounded-xl border text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 cursor-pointer h-10 rounded-xl text-sm font-bold transition ${
                currentPage === index + 1
                  ? "bg-orange-600 text-white"
                  : "border hover:bg-gray-50"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 cursor-pointer rounded-xl border text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;

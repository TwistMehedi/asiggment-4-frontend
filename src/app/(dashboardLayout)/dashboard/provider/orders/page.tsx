export const dynamic = "force-dynamic";

import { getMyOrdersByProvider } from "@/service/Order/order.service";
import Link from "next/link";
import React from "react";

const Orders = async () => {
  const response = await getMyOrdersByProvider();
  const orders = response?.orders || [];

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all customer orders here.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg font-medium text-sm hover:bg-orange-100 transition-all">
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm uppercase">
              <th className="px-6 py-4 font-semibold">Order ID</th>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order: any) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-blue-600">
                  #{order.id}
                </td>
                <td className="px-6 py-4 text-gray-700">{order?.user.name}</td>
                <td className="px-6 py-4 font-bold text-gray-900">
                  {order.totalAmount} ৳
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Processing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {new Date(order.createdAt).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    day: "numeric",
                    month: "short",
                  })}
                </td>
                <td className="px-6 py-4 text-center">
                  <Link href={`/provider/orders/${order.id}`}>
                    <button className="text-gray-400 hover:text-orange-600 transition-all px-2 py-1">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400">No orders found in the system.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;

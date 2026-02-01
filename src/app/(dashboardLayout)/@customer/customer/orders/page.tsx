import { getMyOrders } from "@/service/Order/order.service";
import Link from "next/link";
import React from "react";

const Orders = async () => {
  const { orders } = await getMyOrders();
  return (
    <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-gray-800">My Orders</h2>
        <span className="px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-bold">
          {orders.length} Orders Found
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-4 font-bold text-gray-400 uppercase text-xs">
                Order ID
              </th>
              <th className="py-4 px-4 font-bold text-gray-400 uppercase text-xs">
                Quantity
              </th>
              <th className="py-4 px-4 font-bold text-gray-400 uppercase text-xs">
                Unit Price
              </th>
              <th className="py-4 px-4 font-bold text-gray-400 uppercase text-xs">
                Total
              </th>
              <th className="py-4 px-4 font-bold text-gray-400 uppercase text-xs text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order: any) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="py-4 px-4">
                  <span className="font-mono text-sm text-gray-600">
                    #{order.orderId.slice(0, 8)}...
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-bold text-gray-700">
                    {order.quantity}x
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">{order.price} ৳</td>
                <td className="py-4 px-4">
                  <span className="font-black text-orange-600">
                    {order.quantity * order.price} ৳
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <Link href={`/customer/orders/${order.orderId}`}>
                    <button className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-all active:scale-95">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

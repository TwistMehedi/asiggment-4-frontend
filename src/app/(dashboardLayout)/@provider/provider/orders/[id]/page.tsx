"use client";

import { useEffect, useState, use } from "react";
import { Loader2, Edit3, X } from "lucide-react";
import { toast } from "sonner";

const OrderDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/order/provider/for/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const result = await response.json();
      const data = result.data || result;
      setOrder(data);
      setNewStatus(data.status);
    } catch (error) {
      console.error("Failed to fetch order", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/order/status/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
          credentials: "include",
        },
      );

      const result = await response.json();

      if (response.ok) {
        setIsModalOpen(false);
        toast.success(
          result.message || result.data?.message || "Status updated!",
        );
        fetchOrder();
      }
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PLACED":
        return "bg-blue-100 text-blue-700";
      case "PREPARING":
        return "bg-purple-100 text-purple-700";
      case "READY":
        return "bg-yellow-100 text-yellow-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-orange-600" />
      </div>
    );
  }

  if (!order) {
    return <div className="p-10 text-center font-bold">Order not found!</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 relative">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">
          Order Details <span className="text-orange-600">#{id.slice(-6)}</span>
        </h2>
        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusStyle(order.status)}`}
          >
            {order.status}
          </span>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 bg-gray-100 hover:bg-orange-100 hover:text-orange-600 rounded-full transition-all"
          >
            <Edit3 size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
          <h3 className="font-bold text-gray-400 text-[10px] uppercase mb-4 tracking-[0.2em]">
            Customer Info
          </h3>
          <p className="text-lg font-black text-gray-800">{order.user?.name}</p>
          <p className="text-sm text-gray-500">{order.user?.email}</p>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-bold text-gray-400 text-[10px] uppercase mb-2 tracking-[0.2em]">
              Delivery Address
            </h3>
            <div className="space-y-1 text-sm text-gray-600 font-medium">
              <p>Area: {order?.address?.areaName}</p>
              <p>
                House: {order?.address?.house}, Road:{" "}
                {order?.address?.RoadNumber}
              </p>
              <p>Post Code: {order?.address?.postCode}</p>
              <p className="text-orange-600 pt-1">
                Phone: {order?.address?.phone}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-bold text-gray-400 text-[10px] uppercase mb-2 tracking-[0.2em]">
              Payment
            </h3>
            <p className="text-sm text-gray-600 font-bold uppercase">
              {order?.payment}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-400 text-[10px] uppercase mb-4 tracking-[0.2em]">
            Order Summary
          </h3>
          <div className="space-y-4">
            {order.items?.map((item: any, index: number) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600 font-bold">
                  {item.meal?.name} x {item.quantity}
                </span>
                <span className="font-black">
                  ৳{item.price * item.quantity}
                </span>
              </div>
            ))}

            <div className="pt-4 border-t border-dashed flex justify-between items-center">
              <span className="text-sm text-gray-400 font-bold uppercase">
                Total Amount
              </span>
              <span className="text-2xl font-black text-orange-600">
                ৳{order.totalAmount}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase text-right">
              Ordered: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-xl text-gray-800 uppercase tracking-tighter">
                Set Status
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="PLACED">PLACED</option>
                <option value="PREPARING">PREPARING</option>
                <option value="READY">READY</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>

              <button
                onClick={handleUpdateStatus}
                disabled={isUpdating}
                className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all flex justify-center items-center shadow-lg shadow-orange-100"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin mr-2" size={18} />
                ) : (
                  "Update Status"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-4">
        <button
          onClick={() => window.history.back()}
          className="text-xs font-black text-gray-400 hover:text-orange-600 transition-colors uppercase tracking-widest"
        >
          ← Back to Orders
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;

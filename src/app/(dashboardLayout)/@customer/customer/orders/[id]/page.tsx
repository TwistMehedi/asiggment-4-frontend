import { getSingleOrder } from "@/service/Order/order.service";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Store,
  Phone,
  ReceiptText,
  ChevronRight,
  Info,
} from "lucide-react";
import Link from "next/link";

const OrdersDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: order } = await getSingleOrder(id);

  if (!order)
    return <div className="text-center p-20 font-bold">Order Not Found!</div>;

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const statusSteps = ["PLACED", "PROCESSING", "ON_THE_WAY", "DELIVERED"];
  const currentStepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-gray-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-2xl">
            <ReceiptText className="text-orange-600" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-800 tracking-tight">
              Order #{order.id.slice(0, 8)}
            </h1>
            <p className="text-sm text-gray-400 font-medium italic">
              {order.meal?.categoryName} Order • {orderDate}
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-3xl font-black text-gray-900">
            {order.totalAmount} ৳
          </p>
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold mt-1 uppercase tracking-wider">
            ● {order.status}
          </span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-8 flex items-center gap-2">
          <Clock size={18} className="text-orange-600" /> Live Tracking
        </h2>
        <div className="flex justify-between items-center relative">
          {statusSteps.map((step, index) => (
            <div key={step} className="flex flex-col items-center z-10 w-full">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                  index <= currentStepIndex
                    ? "bg-orange-600 border-orange-100 text-white"
                    : "bg-white border-gray-100 text-gray-300"
                }`}
              >
                {index <= currentStepIndex ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <div className="w-2 h-2 bg-gray-200 rounded-full" />
                )}
              </div>
              <p
                className={`text-[10px] font-bold mt-3 tracking-tighter ${index <= currentStepIndex ? "text-gray-800" : "text-gray-300"}`}
              >
                {step.replace("_", " ")}
              </p>
            </div>
          ))}
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-0" />
          <div
            className="absolute top-5 left-0 h-1 bg-orange-600 transition-all duration-500 -z-0"
            style={{
              width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center font-black text-orange-600 text-2xl border border-orange-100">
            {order.meal?.name?.[0]}
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="text-lg font-black text-gray-800">
                {order.meal?.name}
              </h3>
              <span className="text-orange-600 font-bold">
                {order.meal?.price} ৳
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
              {order.meal?.description}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md">
                {order.meal?.categoryName}
              </span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md">
                Rich in Vitamins
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-orange-600" /> Delivery Address
          </h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p className="text-gray-900 font-bold text-base">
              {order.address?.areaName}
            </p>
            <p>
              House: {order.address?.house}, Road: {order.address?.roadNumber}
            </p>
            <p>Post Code: {order.address?.postCode}</p>
            <div className="mt-4 pt-4 border-t border-dashed flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-orange-600" />
                <span className="font-bold text-gray-800">
                  {order.address?.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Store size={18} className="text-orange-600" /> Kitchen Info
          </h3>
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200 shadow-sm">
                <Store size={20} className="text-gray-400" />
              </div>
              <div>
                <p className="font-black text-gray-800 leading-none">
                  <Link href={`/meals/provider/${order?.meal?.providerId}`}>
                    {order.provider?.shopName}
                  </Link>
                  {/* {order.provider?.shopName} */}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">
                  Verified Seller
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-[11px] text-gray-500 bg-blue-50/50 p-2 rounded-lg">
            <Info size={14} className="text-blue-500" />
            <span>Contact kitchen for special instructions.</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-10">
        <button className="flex-1 bg-gray-900 text-white py-5 rounded-[1.8rem] font-bold hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95 flex items-center justify-center gap-2">
          Download Invoice
        </button>
        <button className="flex-1 bg-white border-2 border-gray-100 text-gray-700 py-5 rounded-[1.8rem] font-bold hover:bg-gray-50 transition-all active:scale-95">
          Need Help?
        </button>
      </div>
    </div>
  );
};

export default OrdersDetails;

import React from "react";
import { MapPin, Star, MoreVertical, Store, Inbox, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cookies } from "next/headers";
import { EditRestaurantBtn } from "@/components/Meal/EditResturants";

const AllRestaurants = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}/api/meals/admin/resturants`,
    {
      method: "GET",
      cache: "no-store",

      headers: {
        Cookie: (await cookies()).toString(),
        "Content-type": "application/json",
      },
    },
  );

  const result = await response.json();
  const restaurants = result?.restaurants || [];

  // console.log(result);

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2 tracking-tighter uppercase">
              <Store className="text-orange-600" />
              All Restaurants
            </h1>
            <p className="text-gray-500 text-sm font-medium mt-1">
              {restaurants.length > 0
                ? `Managing ${restaurants.length} active restaurants.`
                : "Manage your partner restaurants and their availability."}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/80">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="w-[80px] font-black text-[10px] uppercase tracking-widest text-gray-400 py-5 pl-8">
                    SL
                  </TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 py-5">
                    Restaurant
                  </TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 py-5">
                    Location
                  </TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 py-5 text-center">
                    Status
                  </TableHead>
                  <TableHead className="text-right font-black text-[10px] uppercase tracking-widest text-gray-400 py-5 pr-8">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {restaurants.length > 0 ? (
                  restaurants.map((res: any, index: number) => (
                    <TableRow
                      key={res.id || index}
                      className="hover:bg-orange-50/30 transition-colors border-gray-50"
                    >
                      <TableCell className="font-bold text-gray-400 pl-8">
                        {String(index + 1).padStart(2, "0")}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-black text-gray-800 text-base leading-tight">
                            {res.shopName}
                          </span>
                          {/* <span className="flex items-center gap-1 text-xs text-orange-500 font-bold">
                            <Star size={12} fill="currentColor" />{" "}
                            {res.rating || "N/A"}
                          </span> */}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} className="text-gray-400" />
                          {res.address || "Not specified"}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight ${
                            res.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {res.isOpen.toString() || "Closed"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <EditRestaurantBtn restaurant={res} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                          <Inbox className="text-gray-300" size={32} />
                        </div>
                        <p className="font-black text-gray-800 uppercase tracking-tight">
                          No Restaurants Found
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

export default AllRestaurants;

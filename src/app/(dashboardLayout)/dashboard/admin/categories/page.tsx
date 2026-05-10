"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, FolderTree, Plus, Inbox, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import categories from "@/actions/categories";
import { DeleteCategoryBtn } from "@/components/DeleteCategoryBtn";
import { EditCategoryBtn } from "@/components/Meal/EditeCategoryBtn";
import { useEffect, useState } from "react";

const AdminCategory = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await categories();
      const cats = response?.data || [];
      setData(cats);
      setFilteredData(cats);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = data.filter((cat) =>
      cat.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [query, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2 tracking-tighter uppercase">
              <FolderTree className="text-orange-600" />
              Manage Categories
            </h1>
            <p className="text-gray-500 text-sm font-medium mt-1">
              {data.length > 0
                ? `Total ${data.length} categories active in your platform.`
                : "Organize your meals by adding categories."}
            </p>
          </div>

          <div className="w-full sm:w-auto bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2 px-4">
            <Search size={18} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search categories..."
              className="bg-transparent border-none focus:outline-none text-sm font-medium w-full"
            />
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
                  <TableHead className="min-w-[200px] font-black text-[10px] uppercase tracking-widest text-gray-400 py-5">
                    Category Name
                  </TableHead>
                  <TableHead className="font-black text-[10px] uppercase tracking-widest text-gray-400 py-5 text-center">
                    Inventory
                  </TableHead>
                  <TableHead className="text-right font-black text-[10px] uppercase tracking-widest text-gray-400 py-5 pr-8">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((category: any, index: number) => (
                    <TableRow
                      key={category.id}
                      className="hover:bg-orange-50/30 transition-colors border-gray-50"
                    >
                      <TableCell className="font-bold text-gray-400 pl-8">
                        {String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, "0")}
                      </TableCell>
                      <TableCell className="font-black text-gray-800 text-base">
                        {category.name}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="bg-orange-100/50 text-orange-600 px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-tight">
                          {category._count?.meals || 0} Meals
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end gap-1">
                          <EditCategoryBtn category={category} />

                          <DeleteCategoryBtn id={category.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                          <Inbox className="text-gray-300" size={32} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-black text-gray-800 uppercase tracking-tight">
                            No Categories Found
                          </p>
                          <p className="text-sm text-gray-400 font-medium">
                            {query ? "Try adjusting your search." : "Start by creating a new category to organize your menu."}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 px-6 pb-6">
              <p className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} categories
              </p>
              <div className="flex items-center gap-2">
                {currentPage > 1 && (
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Previous
                  </button>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${
                      pageNum === currentPage
                        ? "text-white bg-orange-600"
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                {currentPage < totalPages && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategory;

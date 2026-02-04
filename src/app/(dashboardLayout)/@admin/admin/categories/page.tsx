export const dynamic = "force-dynamic";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, FolderTree, Plus, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import categories from "@/actions/categories";
import { DeleteCategoryBtn } from "@/components/DeleteCategoryBtn";

const AdminCategory = async () => {
  const response = await categories();
  const data = response?.data || [];

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

          <Button className="bg-orange-600 hover:bg-orange-700 rounded-2xl px-6 font-bold shadow-lg shadow-orange-200 transition-all w-full sm:w-auto">
            <Plus className="mr-2" size={18} /> Add New
          </Button>
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
                {data.length > 0 ? (
                  data.map((category: any, index: number) => (
                    <TableRow
                      key={category.id}
                      className="hover:bg-orange-50/30 transition-colors border-gray-50"
                    >
                      <TableCell className="font-bold text-gray-400 pl-8">
                        {String(index + 1).padStart(2, "0")}
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all"
                          >
                            <Edit2 size={16} />
                          </Button>
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
                            Start by creating a new category to organize your
                            menu.
                          </p>
                        </div>
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

export default AdminCategory;

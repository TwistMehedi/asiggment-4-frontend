import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import categories from "@/actions/categories";
import { DeleteCategoryBtn } from "@/components/DeleteCategoryBtn";

const AdminCategory = async () => {
  const { data } = await categories();
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2">
              <FolderTree className="text-orange-600" />
              Manage Categories
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              You have total {data?.length || 0} categories available.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[100px] font-bold text-gray-700">
                    SL
                  </TableHead>
                  <TableHead className="font-bold text-gray-700">
                    Category Name
                  </TableHead>
                  <TableHead className="font-bold text-gray-700 text-center">
                    Meals Count
                  </TableHead>
                  <TableHead className="text-right font-bold text-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((category: any, index: number) => (
                  <TableRow
                    key={category.id}
                    className="hover:bg-orange-50/30 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-500">
                      {String(index + 1).padStart(2, "0")}
                    </TableCell>
                    <TableCell className="font-bold text-gray-800">
                      {category.name}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                        {category._count?.meals || 0} Meals
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-orange-600 hover:bg-orange-50"
                        >
                          <Edit2 size={18} />
                        </Button>
                        <DeleteCategoryBtn id={category.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {(!data || data.length === 0) && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-32 text-center text-gray-400"
                    >
                      No categories found. Create your first category!
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

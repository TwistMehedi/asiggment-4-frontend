import { Skeleton } from "@/components/ui/skeleton";

const SkeletonMealCard = () => {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm flex flex-col dark:bg-slate-900 dark:border-slate-800">
      <div className="relative h-48 bg-gray-100 overflow-hidden shrink-0 dark:bg-slate-800">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-16" />
          </div>

          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonMealCard;
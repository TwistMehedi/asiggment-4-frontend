"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const categoryOptions = [
  { value: "", label: "All categories" },
  { value: "Vegetarian", label: "Vegetarian" },
  { value: "Biryani", label: "Biryani" },
  { value: "Grill", label: "Grill" },
  { value: "Dessert", label: "Dessert" },
];

const sortOptions = [
  { value: "", label: "Default" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating_desc", label: "Best Rated" },
];

const SearchSection = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    setParam("query", term);
  }, 500);

  return (
    <div className="space-y-6">
      <div className="relative max-w-xl mx-auto">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"
          size={20}
        />
        <Input
          placeholder="Search meals..."
          className="pl-12 py-7 rounded-2xl border-gray-200 bg-white text-gray-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          defaultValue={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="max-w-6xl mx-auto grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">Category</span>
          <select
            value={category}
            onChange={(e) => setParam("category", e.target.value)}
            className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setParam("sort", e.target.value)}
            className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col justify-end">
          <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">Current filters</span>
          <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
            {query ? `${query}` : "Search term"} • {category || "All categories"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;

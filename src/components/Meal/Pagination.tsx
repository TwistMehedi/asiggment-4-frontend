import Link from "next/link";

const Pagination = ({
  totalPages,
  currentPage,
  searchTerm,
  category,
}: {
  totalPages: number;
  currentPage: number;
  searchTerm?: string;
  category?: string;
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getPageLink = (page: number) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("searchTerm", searchTerm);
    if (category) params.set("category", category);
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-12 mb-8">
      <Link
        href={getPageLink(currentPage - 1)}
        className={`px-4 py-2 border rounded-lg ${
          currentPage <= 1
            ? "pointer-events-none opacity-50 bg-gray-100"
            : "hover:bg-gray-50"
        }`}
      >
        Previous
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={getPageLink(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
            currentPage === page
              ? "bg-orange-600 text-white border-orange-600 font-bold"
              : "hover:bg-orange-50 text-gray-700"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={getPageLink(currentPage + 1)}
        className={`px-4 py-2 border rounded-lg ${
          currentPage >= totalPages
            ? "pointer-events-none opacity-50 bg-gray-100"
            : "hover:bg-gray-50"
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;

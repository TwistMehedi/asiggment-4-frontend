import { getCategories } from "@/service/Home/home.service";

const Catagory = async () => {
  const { data } = await getCategories();

  return (
    <section className="px-6 py-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Popular Categories
          </h3>
          <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data?.map((cat: { id: string; name: string }) => (
            <div
              key={cat.id}
              className="group cursor-pointer bg-white border border-gray-100 rounded-3xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  🍱
                </span>
              </div>

              <h4 className="font-bold text-gray-700 text-xl group-hover:text-orange-600 transition-colors">
                {cat?.name}
              </h4>
              <p className="text-sm text-gray-400 mt-2">Explore Items</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catagory;

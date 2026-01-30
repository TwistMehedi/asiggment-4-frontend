import Catagory from "@/components/Home/Catagory";
import Hero from "@/components/Home/Hero";
import HomeMeals from "@/components/Home/HomeMeals";
import Link from "next/link";

export default function Home() {
  const reasons = [
    {
      title: "Fast Delivery",
      desc: "Get your food delivered in under 30 mins.",
    },
    {
      title: "Trusted Providers",
      desc: "We partner with the best rated local kitchens.",
    },
    {
      title: "Cash on Delivery",
      desc: "Pay only when you receive your meal safely.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Catagory />
      <HomeMeals />

      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose FoodHub
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((item) => (
              <div
                key={item.title}
                className="group p-8 bg-white border border-gray-100 rounded-3xl text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                  <span className="text-xl font-bold italic">FH</span>
                </div>
                <h4 className="font-bold text-xl mb-3 text-gray-900">
                  {item.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-auto bg-gray-900 text-gray-400 px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">FoodHub</h2>
            <p className="text-sm">
              Delivering happiness to your doorstep since 2026.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex space-x-6 font-medium">
              <Link href="#" className="hover:text-white transition-colors">
                Facebook
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Instagram
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-xs text-gray-500">
              © 2026 FoodHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative px-4 sm:px-6 py-12 md:py-24 lg:py-32 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-orange-50/50 rounded-l-full hidden lg:block" />

      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
        <div className="text-center md:text-left flex-1 space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Order <span className="text-orange-600">Fresh Food</span>{" "}
            <br className="hidden lg:block" /> Near You
          </h1>

          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
            Discover delicious meals from trusted local providers. Fast delivery
            and cash on delivery available. Experience the best taste in town.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2">
            <Button
              size="lg"
              className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-orange-200 transition-all"
            >
              Order Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg rounded-full"
            >
              View Menu
            </Button>
          </div>

          <div className="flex justify-center md:justify-start items-center gap-8 pt-6 border-t border-gray-100 md:border-none">
            <div>
              <p className="font-bold text-xl text-gray-800">5k+</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Orders
              </p>
            </div>
            <div>
              <p className="font-bold text-xl text-gray-800">4.8</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Rating
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md md:max-w-none">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

            <Image
              src="/Fresh-Organic-Foods.jpg"
              alt="Fresh organic food"
              width={600}
              height={500}
              className="relative rounded-2xl shadow-2xl object-cover transform hover:scale-[1.02] transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

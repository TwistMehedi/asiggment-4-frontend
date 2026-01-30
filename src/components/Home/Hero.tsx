import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="text-center md:text-left flex-1">
          <h2 className="text-4xl font-bold mb-4">Order Fresh Food Near You</h2>

          <p className="text-gray-600 max-w-xl mb-6">
            Discover delicious meals from trusted local providers. Fast delivery
            and cash on delivery available.
          </p>

          <Button size="lg">Order Now</Button>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/Fresh-Organic-Foods.jpg"
            alt="Fresh organic food"
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

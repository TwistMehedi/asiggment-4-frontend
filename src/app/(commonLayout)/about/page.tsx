import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <section className="rounded-[2rem] bg-white p-10 shadow-sm border border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-600 font-bold">
              About FoodHub
            </p>
            <h1 className="mt-4 text-4xl font-black text-gray-900">
              Built to bring local kitchens and customers closer.
            </h1>
            <p className="mt-6 text-gray-600 leading-8">
              FoodHub is a modern food marketplace for busy people who want fresh,
              reliable meals from trusted local providers. We connect customers
              with a curated selection of restaurants and home kitchens across the city.
            </p>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Smart Ordering",
              description:
                "Browse curated meals, filter by category and order in seconds.",
            },
            {
              title: "Fast Delivery",
              description:
                "Our providers deliver quickly with contactless drop-off and real-time updates.",
            },
            {
              title: "Local Quality",
              description:
                "We partner with the best local kitchens to ensure every meal feels homemade.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h2>
              <p className="text-gray-600 leading-7">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[2rem] bg-orange-50 p-10">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-black text-gray-900">
                FoodHub mission is simple.
              </h2>
              <p className="mt-6 text-gray-700 leading-8">
                We make gourmet meals approachable with transparent pricing,
                reliable delivery, and curated provider reviews. Every order is
                designed to feel effortless and delicious.
              </p>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>• Verified providers with safe hygiene standards.</p>
              <p>• Cash on delivery and secure payments.</p>
              <p>• Customer support available for every order.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-10 shadow-sm border border-gray-100">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Need help getting started?</h2>
              <p className="mt-4 text-gray-600 leading-7">
                Visit our support center for answers, or contact the FoodHub team
                for help with orders, account setup, and provider requests.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-4 text-white font-bold hover:bg-orange-700 transition"
              >
                Contact support
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center justify-center rounded-full border border-orange-600 px-6 py-4 text-orange-600 font-bold hover:bg-orange-50 transition"
              >
                Browse FAQs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;

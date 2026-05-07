export const dynamic = "force-dynamic";

import Catagory from "@/components/Home/Catagory";
import Hero from "@/components/Home/Hero";
import HomeMeals from "@/components/Home/HomeMeals";
import NewsLetter from "@/components/Home/NewsLetter";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Catagory />
      <HomeMeals />

      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-600 font-bold">
              Explore our kitchen partners
            </p>
            <h2 className="mt-4 text-4xl font-black text-gray-900">
              Trusted local kitchens near you
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Spice Corner",
                location: "Dhanmondi",
                tag: "Bangladeshi Classics",
              },
              {
                name: "Green Platter",
                location: "Banani",
                tag: "Healthy Bowls",
              },
              {
                name: "Grill House",
                location: "Gulshan",
                tag: "Charcoal BBQ",
              },
            ].map((provider) => (
              <div
                key={provider.name}
                className="rounded-[2rem] border border-gray-100 bg-slate-50 p-8 shadow-sm"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-orange-600 font-bold">
                  {provider.tag}
                </p>
                <h3 className="mt-4 text-2xl font-black text-gray-900">
                  {provider.name}
                </h3>
                <p className="mt-3 text-gray-600">{provider.location}</p>
                <div className="mt-6">
                  <Link
                    href="/meals"
                    className="inline-flex items-center rounded-full bg-orange-600 px-6 py-3 text-white font-bold hover:bg-orange-700 transition"
                  >
                    View menu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-600 font-bold">
              Our Impact
            </p>
            <h2 className="mt-4 text-4xl font-black text-gray-900">
              FoodHub by the Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "500+", label: "Local Providers" },
              { number: "50K+", label: "Meals Delivered" },
              { number: "4.8", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-orange-600 mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-600 font-bold">
              Customer Stories
            </p>
            <h2 className="mt-4 text-4xl font-black text-gray-900">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Ahmed",
                role: "Food Blogger",
                content: "FoodHub has revolutionized my dining experience. Fresh meals delivered right to my door!",
                rating: 5,
              },
              {
                name: "Rahul Khan",
                role: "Business Executive",
                content: "The quality and speed of delivery is unmatched. My go-to platform for meals.",
                rating: 5,
              },
              {
                name: "Priya Das",
                role: "Student",
                content: "Affordable and delicious options. The variety keeps me coming back every day.",
                rating: 5,
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-600 font-bold">
              Frequently Asked Questions
            </p>
            <h2 className="mt-4 text-4xl font-black text-gray-900">
              Got Questions? We Have Answers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How do I place an order?",
                answer: "Browse meals, add to cart, and checkout with your delivery address.",
              },
              {
                question: "Is cash on delivery available?",
                answer: "Yes, we offer cash on delivery for most orders.",
              },
              {
                question: "How do I become a provider?",
                answer: "Register as a provider and contact support for onboarding.",
              },
              {
                question: "What areas do you deliver to?",
                answer: "We deliver across major cities. Check availability during checkout.",
              },
            ].map((faq) => (
              <div
                key={faq.question}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsLetter />

    </div>
  );
}

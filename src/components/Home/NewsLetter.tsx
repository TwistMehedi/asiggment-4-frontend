"use client";

import { toast } from "sonner";

export default function NewsLetter() {
  const handleNewsLetter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const email = formData.get("email") as string;

    if (!email) return;

    toast.success("Thank you for subscribing to our newsletter!");

    // form reset
    form.reset();

    // backend api call এখানে করবে
  };

  return (
    <section className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300 px-6 py-20 text-white">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] font-bold text-orange-100">
            Newsletter
          </p>

          <h2 className="mt-4 text-4xl font-black">
            Get fresh meal deals delivered to your inbox.
          </h2>

          <p className="mt-6 text-gray-100 leading-8">
            Subscribe for weekly offers, new provider launches, and exclusive
            discount codes.
          </p>
        </div>

        <form
          onSubmit={handleNewsLetter}
          className="space-y-4 bg-white/10 rounded-[2rem] p-8 backdrop-blur-sm border border-white/20"
        >
          <div>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              name="email"
              required
              className="w-full rounded-3xl border border-white/30 bg-white/10 px-5 py-4 text-white placeholder:text-orange-100 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-3xl bg-white px-6 py-4 text-orange-600 font-bold shadow-lg shadow-orange-300/20 hover:bg-orange-100 transition"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  );
}
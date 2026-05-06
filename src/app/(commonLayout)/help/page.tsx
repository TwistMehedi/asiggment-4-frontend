import Link from "next/link";

const faqItems = [
  {
    question: "How do I place an order?",
    answer:
      "Search for meals, choose your favorite dishes, add them to the cart, and checkout with address details.",
  },
  {
    question: "Can I pay with cash on delivery?",
    answer:
      "Yes. Cash on delivery is available for most orders. You can also use online payment if your provider supports it.",
  },
  {
    question: "How do I become a provider?",
    answer:
      "Register as a provider and reach out to our support team for onboarding details and menu setup.",
  },
];

const HelpPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <section className="rounded-[2rem] bg-white p-10 shadow-sm border border-gray-100">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-600 font-bold">Help center</p>
          <h1 className="mt-4 text-4xl font-black text-gray-900">Frequently asked questions</h1>
          <p className="mt-4 text-gray-600 leading-8">
            Find answers to common questions about ordering, delivery, account access, and provider support.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900">{item.question}</h2>
              <p className="mt-3 text-gray-600 leading-7">{item.answer}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[2rem] bg-orange-50 p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-black text-gray-900">Can’t find what you need?</h2>
              <p className="mt-4 text-gray-700 leading-7">
                Contact our support team for help with your account, orders, or provider questions.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-full bg-orange-600 px-8 py-4 text-white font-bold hover:bg-orange-700 transition"
            >
              Contact support
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HelpPage;

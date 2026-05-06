const TermsPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto rounded-[2rem] bg-white p-10 shadow-sm border border-gray-100">
        <p className="text-sm uppercase tracking-[0.25em] text-orange-600 font-bold">Terms & Conditions</p>
        <h1 className="mt-4 text-4xl font-black text-gray-900">Terms of service</h1>
        <div className="mt-8 space-y-6 text-gray-600 leading-8">
          <p>
            Welcome to FoodHub. By using our platform, you agree to our terms, including payment,
            account safety, provider access, and acceptable use of the service.
          </p>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Account and login</h2>
            <p>
              You are responsible for keeping your login credentials secure. Do not share your account
              information with others.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Orders and deliveries</h2>
            <p>
              Orders placed through FoodHub are subject to confirmation by the provider. Delivery times
              may vary depending on location and provider availability.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Privacy & refunds</h2>
            <p>
              We protect your personal data and only share it with providers as required to fulfill orders.
              Refund requests are handled by FoodHub support on a case-by-case basis.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;

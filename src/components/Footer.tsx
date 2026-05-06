import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 lg:grid-cols-[1.7fr_1fr_1fr]">
        <div className="space-y-5">
          <Link href="/" className="inline-flex items-center gap-2 text-3xl font-black text-white">
            <span className="text-orange-500">Food</span>Hub
          </Link>
          <p className="max-w-md text-sm leading-7 text-slate-400">
            Fresh meals, trusted delivery, and a simple ordering experience for every customer.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="font-semibold text-slate-500 uppercase tracking-[0.3em]">
              Contact
            </span>
            <Link href="mailto:ataul1708@gmail.com" className="hover:text-white transition-colors">
              ataul1708@gmail.com
            </Link>
            <span className="text-slate-500">•</span>
            <Link href="tel:01732431708" className="hover:text-white transition-colors">
              01732431708
            </Link>
            <span className="text-slate-500">•</span>
            <div className="flex gap-3">
              <Link href="#" className="hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.996.014 6.8.067 5.609.12 4.855.245 4.199.467c-.672.226-1.247.52-1.824.998C1.8 1.943 1.346 2.516.998 3.188.776 3.844.651 4.598.598 5.79c-.053 1.196-.067 1.596-.067 5.217s.014 4.021.067 5.217c.053 1.192.178 1.946.4 2.602.226.672.52 1.247.998 1.824.472.577 1.045 1.031 1.717 1.389.656.222 1.41.347 2.602.4 1.196.053 1.596.067 5.217.067s4.021-.014 5.217-.067c1.192-.053 1.946-.178 2.602-.4.672-.226 1.247-.52 1.824-.998.577-.472 1.031-1.045 1.389-1.717.222-.656.347-1.41.4-2.602.053-1.196.067-1.596.067-5.217s-.014-4.021-.067-5.217c-.053-1.192-.178-1.946-.4-2.602-.226-.672-.52-1.247-.998-1.824C21.057 1.8 20.484 1.346 19.812.998 19.156.776 18.402.651 17.21.598 16.014.545 15.614.53 12.017.53s-4.001.015-5.197.068c-1.192.053-1.946.178-2.602.4-.672.226-1.247.52-1.824.998C2.516 2.8 2.062 3.273.714 3.931c-.656.222-1.41.347-2.602.4C-1.086.067-1.486.053-5.107.053s-4.021.014-5.217.067c-1.192.053-1.946.178-2.602.4-.672.226-1.247.52-1.824.998C-14.057 2.8-14.511 3.273-14.869 3.931c-.222.656-.347 1.41-.4 2.602-.053 1.196-.067 1.596-.067 5.217s.014 4.021.067 5.217c.053 1.192.178 1.946.4 2.602.226.672.52 1.247.998 1.824.472.577 1.045 1.031 1.717 1.389.656.222 1.41.347 2.602.4 1.196.053 1.596.067 5.217.067s4.021-.014 5.217-.067c1.192-.053 1.946-.178 2.602-.4.672-.226 1.247-.52 1.824-.998.577-.472 1.031-1.045 1.389-1.717.222-.656.347-1.41.4-2.602.053-1.196.067-1.596.067-5.217s-.014-4.021-.067-5.217c-.053-1.192-.178-1.946-.4-2.602-.226-.672-.52-1.247-.998-1.824C-10.943 1.8-11.416 1.346-11.778.998c-.656-.222-1.41-.347-2.602-.4C-15.974.545-16.374.53-20.011.53zM12.017 5.8c-3.402 0-6.167 2.765-6.167 6.167s2.765 6.167 6.167 6.167 6.167-2.765 6.167-6.167S15.419 5.8 12.017 5.8zm0 10.133c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zM20.154 5.63c0 .742-.602 1.344-1.344 1.344s-1.344-.602-1.344-1.344.602-1.344 1.344-1.344 1.344.602 1.344 1.344z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-4 font-semibold">
            Company
          </p>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About us
              </Link>
            </li>
            <li>
              <Link href="/meals" className="hover:text-white transition-colors">
                Browse meals
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-4 font-semibold">
            Support
          </p>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>
              <Link href="/help" className="hover:text-white transition-colors">
                Help center
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & policies
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition-colors">
                Account access
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-6 text-sm text-slate-500 sm:flex sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} FoodHub. All rights reserved.</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 sm:mt-0 text-slate-400">
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

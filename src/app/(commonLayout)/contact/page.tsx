import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] bg-white p-10 shadow-sm border border-gray-100">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.25em] text-orange-600 font-bold">
              Get in touch
            </p>
            <h1 className="text-4xl font-black text-gray-900">Contact FoodHub</h1>
            <p className="text-gray-600 leading-8">
              Have a question about your order, provider onboarding, or account?
              Send us a message and we will respond within one business day.
            </p>
          </div>

          <form className="mt-10 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" placeholder="Your name" />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="you@example.com" />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="subject">Subject</FieldLabel>
              <Input id="subject" placeholder="Order question" />
            </Field>
            <Field>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea id="message" placeholder="Tell us how we can help" rows={6} />
            </Field>
            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
              Send Message
            </Button>
          </form>
        </section>

        <aside className="rounded-[2rem] bg-orange-600 p-10 text-white shadow-sm">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-orange-200 font-bold">
                Contact info
              </p>
              <h2 className="mt-4 text-3xl font-black">We are here to help</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="rounded-2xl bg-white/10 p-3">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-orange-200">Email</p>
                  <p className="font-bold text-lg">ataul1708@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="rounded-2xl bg-white/10 p-3">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-orange-200">Phone</p>
                  <p className="font-bold text-lg">01732431708</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="rounded-2xl bg-white/10 p-3">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-orange-200">Address</p>
                  <p className="font-bold text-lg">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/20 bg-white/10 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-orange-200">
                Need immediate assistance?
              </p>
              <p className="mt-3 text-sm leading-7 text-orange-100">
                We’re available Monday through Friday from 9am to 8pm. If you need urgent support, call our hotline.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ContactPage;

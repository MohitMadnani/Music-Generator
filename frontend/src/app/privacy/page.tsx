import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-white hover:bg-blue-600/20">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-gray-400">Last updated: February 2026</p>
        
        <div className="mt-8 space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white">1. Information We Collect</h2>
            <p className="mt-2">
              We collect information you provide directly to us, such as when you create an account,
              generate music, or communicate with us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">2. How We Use Your Information</h2>
            <p className="mt-2">
              We use the information we collect to provide, maintain, and improve our services,
              process your transactions, and communicate with you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">3. Data Security</h2>
            <p className="mt-2">
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">4. Contact Us</h2>
            <p className="mt-2">
              If you have any questions about this Privacy Policy, please contact us at
              privacy@musicgenerator.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

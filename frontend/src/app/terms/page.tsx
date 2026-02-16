import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-white hover:bg-white/10 hover:text-blue-400">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="mt-4 text-gray-400">Last updated: February 2026</p>
        
        <div className="mt-8 space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing and using Music Generator, you accept and agree to be bound by the terms
              and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">2. Use License</h2>
            <p className="mt-2">
              We grant you a limited, non-exclusive, non-transferable license to use the service
              for your personal or commercial projects, subject to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">3. Content Ownership</h2>
            <p className="mt-2">
              You retain all rights to the music you generate. However, you are responsible for
              ensuring that your use complies with all applicable laws and does not infringe upon the rights of others.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">4. Limitations</h2>
            <p className="mt-2">
              The service is provided &quot;as is&quot; without warranties of any kind. We are not liable
              for any damages arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white">5. Contact</h2>
            <p className="mt-2">
              Questions about the Terms of Service should be sent to us at legal@musicgenerator.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

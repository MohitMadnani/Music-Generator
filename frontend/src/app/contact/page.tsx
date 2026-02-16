import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-white hover:bg-blue-600/20">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-gray-400">
          Have questions? We&apos;d love to hear from you.
        </p>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-blue-500/50 hover:bg-white/10">
            <Mail className="mb-4 h-10 w-10 text-blue-400" />
            <h3 className="text-xl font-semibold">Email Support</h3>
            <p className="mt-2 text-gray-400">
              Our support team is here to help
            </p>
            <a
              href="mailto:support@musicgenerator.com"
              className="mt-4 inline-block text-blue-400 hover:text-blue-300"
            >
              support@musicgenerator.com
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-blue-500/50 hover:bg-white/10">
            <MessageSquare className="mb-4 h-10 w-10 text-blue-400" />
            <h3 className="text-xl font-semibold">Community</h3>
            <p className="mt-2 text-gray-400">
              Join our community for updates and discussions
            </p>
            <a
              href="https://discord.gg/example"
              className="mt-4 inline-block text-blue-400 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our Discord
            </a>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
          <div className="mt-6 space-y-4">
            <details className="group">
              <summary className="cursor-pointer text-gray-300 hover:text-white">
                How do credits work?
              </summary>
              <p className="mt-2 text-sm text-gray-400">
                Each song generation costs 1 credit. You can purchase credit packages that never expire.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-gray-300 hover:text-white">
                Can I use the generated music commercially?
              </summary>
              <p className="mt-2 text-sm text-gray-400">
                Yes! With our Studio plan, you get a commercial license for all generated music.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-gray-300 hover:text-white">
                What languages are supported?
              </summary>
              <p className="mt-2 text-sm text-gray-400">
                We support 19+ languages including English, Chinese, Spanish, Japanese, and more.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

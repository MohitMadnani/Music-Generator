import Link from "next/link";
import { Music, Sparkles, Zap, Users } from "lucide-react";
import { AuthButtons, HeroButton, CTAButton } from "@/components/landing/auth-buttons";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold tracking-wider">MUSIC GENERATOR</span>
            </div>
            <AuthButtons />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-blue-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,99,235,0.15),rgba(255,255,255,0))]" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Create Music with
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
              Generate original music from text descriptions and lyrics in seconds.
              Powered by cutting-edge AI technology.
            </p>
            <div className="mt-10 flex items-center justify-center">
              <HeroButton />
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Start with 10 free credits • No credit card required
            </p>
          </div>

          {/* Feature Preview Cards */}
          <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <Music className="mb-4 h-10 w-10 text-blue-500" />
              <h3 className="text-lg font-semibold">Text to Music</h3>
              <p className="mt-2 text-sm text-gray-400">
                Describe your desired sound and watch AI bring it to life
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <Sparkles className="mb-4 h-10 w-10 text-blue-500" />
              <h3 className="text-lg font-semibold">Lyrics to Song</h3>
              <p className="mt-2 text-sm text-gray-400">
                Transform your lyrics into complete songs with vocals
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-white/10 sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <Zap className="mb-4 h-10 w-10 text-blue-500" />
              <h3 className="text-lg font-semibold">Advanced Editing</h3>
              <p className="mt-2 text-sm text-gray-400">
                Fine-tune every detail with powerful AI editing tools
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Everything you need to create</h2>
            <p className="mt-4 text-lg text-gray-400">
              Professional-grade AI music generation tools
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Music />}
              title="19+ Languages"
              description="Create music with vocals in 19 different languages including English, Chinese, Spanish, and more."
            />
            <FeatureCard
              icon={<Sparkles />}
              title="All Genres"
              description="From pop to classical, rap to jazz. Generate any style of music you can imagine."
            />
            <FeatureCard
              icon={<Zap />}
              title="Lightning Fast"
              description="Generate up to 4 minutes of music in just 20 seconds. No more waiting."
            />
            <FeatureCard
              icon={<Users />}
              title="Lyric Editing"
              description="Edit specific lyrics while preserving the melody and vocals of your song."
            />
            <FeatureCard
              icon={<Music />}
              title="Stem Generation"
              description="Generate individual instrument tracks and create custom arrangements."
            />
            <FeatureCard
              icon={<Sparkles />}
              title="Voice Control"
              description="Fine-tune vocal styles, techniques, and expressions for perfect results."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Simple, transparent pricing</h2>
            <p className="mt-4 text-lg text-gray-400">
              Pay only for what you use. No subscriptions, no commitments.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <PricingCard
              name="Starter"
              price="$9"
              credits="10 credits"
              features={[
                "10 song generations",
                "All genres & styles",
                "19+ languages",
                "Basic editing tools",
              ]}
            />
            <PricingCard
              name="Pro"
              price="$19"
              credits="25 credits"
              features={[
                "25 song generations",
                "All genres & styles",
                "19+ languages",
                "Advanced editing tools",
                "Priority generation",
              ]}
              highlighted
            />
            <PricingCard
              name="Studio"
              price="$39"
              credits="50 credits"
              features={[
                "50 song generations",
                "All genres & styles",
                "19+ languages",
                "Advanced editing tools",
                "Priority generation",
                "Commercial license",
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to create your first song?
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Join thousands of creators making music with AI
          </p>
          <div className="mt-10 flex items-center justify-center">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center space-x-2">
              <Music className="h-6 w-6 text-blue-500" />
              <span className="font-bold">MUSIC GENERATOR</span>
            </div>
            <p className="text-sm text-gray-400">
              © 2026 Music Generator. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-blue-500 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-blue-500 transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-blue-500 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function PricingCard({
  name,
  price,
  credits,
  features,
  highlighted = false,
}: {
  name: string;
  price: string;
  credits: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-8 backdrop-blur-sm transition-all ${
        highlighted
          ? "border-blue-500/50 bg-blue-500/10 shadow-2xl shadow-blue-500/20"
          : "border-white/10 bg-white/5 hover:border-blue-500/30 hover:bg-white/10"
      }`}
    >
      {highlighted && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      )}
      <div className="mb-8">
        <h3 className="text-xl font-semibold">{name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-5xl font-bold">{price}</span>
          <span className="ml-2 text-gray-400">one-time</span>
        </div>
        <p className="mt-2 text-sm text-gray-400">{credits}</p>
      </div>
      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <svg
              className="mr-3 h-5 w-5 flex-shrink-0 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link href="/auth/sign-up">
        <button
          className={`w-full rounded-lg px-4 py-3 font-medium transition ${
            highlighted
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-white/10 text-white hover:bg-blue-600/20 hover:border-blue-500/50"
          }`}
        >
          Get Started
        </button>
      </Link>
    </div>
  );
}

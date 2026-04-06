import { Metadata } from "next";
import {
  HelpCircle,
  Globe,
  Compass,
  Flame,
  Waves,
  Cookie,
  ShieldCheck,
  BarChart3,
  Settings,
  Link,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Learn about how GPIC uses cookies on our website.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Creative Header */}
      <section className="relative h-[75vh] flex flex-col items-center justify-center bg-black overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-white/80 text-xs tracking-widest uppercase mb-6">
            • Website Policies
          </p>

          <h1 className="font-heading font-black text-white leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Cookie
          </h1>

          <h1 className="font-heading font-black text-brand-primary-light leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6">
            Policy
          </h1>

          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Learn how we use cookies and similar technologies to improve your
            experience on our website.
          </p>

          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <p className="text-xs text-white/90">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* What Are Cookies */}
          <div className="bg-gradient-to-r from-brand-light to-white rounded-3xl p-8 border-2 border-brand-sky">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                <HelpCircle className="w-10 h-10 text-brand-primary" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-black text-brand-primary mb-4">
                  What Are Cookies?
                </h2>
                <p className="text-brand-dark leading-relaxed mb-4">
                  Cookies are small text files placed on your device when you
                  visit a website. They help websites work efficiently and
                  provide information to site owners.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-brand-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                    <Cookie className="w-5 h-5 text-brand-primary" />
                  </div>
                  <h3 className="font-bold text-brand-dark">
                    Persistent Cookies
                  </h3>
                </div>
                <p className="text-sm text-brand-dark-light">
                  Remain on your device for a set period or until deleted
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-brand-accent/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-brand-accent" />
                  </div>
                  <h3 className="font-bold text-brand-dark">Session Cookies</h3>
                </div>
                <p className="text-sm text-brand-dark-light">
                  Temporary and deleted when you close your browser
                </p>
              </div>
            </div>
          </div>

          {/* Types of Cookies */}
          <div>
            <h2 className="font-heading text-3xl font-black text-brand-primary mb-6">
              Types of Cookies We Use
            </h2>

            <div className="space-y-6">
              {/* Essential */}
              <div className="bg-white border-2 border-green-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-heading text-xl font-bold text-green-900">
                        Essential Cookies
                      </h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        Required
                      </span>
                    </div>
                    <p className="text-brand-dark-light mb-3">
                      Necessary for the website to function. Enable core
                      features like:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Security",
                        "Authentication",
                        "Preferences",
                        "Performance",
                      ].map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-green-700 mt-3 font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      You cannot opt out of essential cookies
                    </p>
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-blue-900 mb-2">
                      Analytics Cookies
                    </h3>
                    <p className="text-brand-dark-light mb-3">
                      Help us understand visitor behavior to improve user
                      experience:
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Pages visited and time spent",
                        "Referral sources",
                        "Device and browser info",
                        "General location (city level)",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-brand-dark"
                        >
                          <BarChart3 className="w-4 h-4 mt-1 text-blue-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">
                        <strong>Tools:</strong> Google Analytics, Vercel
                        Analytics
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Functionality */}
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold text-purple-900 mb-2">
                      Functionality Cookies
                    </h3>
                    <p className="text-brand-dark-light mb-3">
                      Remember your choices for enhanced features:
                    </p>
                    <div className="grid md:grid-cols-3 gap-2">
                      {[
                        "Language preference",
                        "Login info (admin)",
                        "Custom content",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="p-3 bg-purple-50 rounded-lg text-center"
                        >
                          <p className="text-xs text-purple-900 font-semibold">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third-Party Cookies */}
          <div className="bg-white border-2 border-brand-sky rounded-2xl p-8">
            <h2 className="font-heading text-2xl font-black text-brand-primary mb-6">
              Third-Party Cookies
            </h2>

            <div className="space-y-4">
              {[
                {
                  name: "YouTube",
                  purpose:
                    "Live streaming embeds may set cookies for viewing stats",
                  link: "https://policies.google.com/privacy",
                },
                {
                  name: "Google Forms",
                  purpose: "Registration forms use cookies for spam prevention",
                  link: "https://policies.google.com/privacy",
                },
                {
                  name: "Social Media",
                  purpose: "Sharing buttons may track sharing activity",
                  link: null,
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-brand-light rounded-xl"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-accent/20 rounded-lg flex items-center justify-center">
                    <Link className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark mb-1">
                      {service.name}
                    </h4>
                    <p className="text-sm text-brand-dark-light mb-2">
                      {service.purpose}
                    </p>
                    {service.link && (
                      <a
                        href={service.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand-accent hover:underline font-semibold"
                      >
                        View Privacy Policy →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-accent rounded-3xl p-8 text-white text-center">
            <div className="flex justify-center mb-4">
              <HelpCircle className="w-10 h-10" />
            </div>
            <h2 className="font-heading text-3xl font-black mb-4">
              Questions About Cookies?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              We're happy to explain our cookie usage in more detail
            </p>
            <a
              href="mailto:gospelpowerchurch07@gmail.com"
              className="inline-block px-8 py-4 bg-white text-brand-primary font-bold rounded-xl hover:bg-brand-light transition-colors"
            >
              Contact Privacy Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

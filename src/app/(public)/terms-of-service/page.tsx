import { Metadata } from "next";
import {
  FileText,
  Info,
  Check,
  X,
  Clock,
  UserPlus,
  Video,
  HandHelping,
  Mail,
  Newspaper,
  AlertTriangle,
  Shield,
  Phone,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read GPIC's Terms of Service for website usage and legal disclaimers.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section (MATCHED TO PRIVACY POLICY STYLE) */}
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
            Terms
          </h1>

          <h1 className="font-heading font-black text-brand-primary-light leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6">
            of Service
          </h1>

          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Please read these terms carefully before using our website
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
          {/* Introduction */}
          <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 rounded-3xl p-8 border-2 border-brand-primary/10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-black text-brand-primary mb-3">
                  Welcome to GPIC
                </h2>
                <p className="text-brand-dark leading-relaxed mb-4">
                  These Terms of Service govern your access to and use of{" "}
                  <a
                    href="https://www.gpicworldwide.org"
                    className="text-brand-accent hover:underline font-semibold"
                  >
                    www.gpicworldwide.org
                  </a>
                  . By using our website, you agree to be bound by these terms.
                </p>
                <div className="bg-white rounded-lg p-4 border-l-4 border-brand-accent">
                  <p className="text-sm text-brand-dark">
                    <strong>Important:</strong> If you do not agree with any
                    part of these terms, you must not use our website.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Acceptance */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-brand-primary to-brand-accent rounded-full"></div>
            <div className="pl-8">
              <h2 className="font-heading text-3xl font-black text-brand-primary mb-6">
                1. Acceptance of Terms
              </h2>

              <div className="bg-white border-2 border-brand-sky rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <p className="text-brand-dark mb-4">
                  By using the GPIC website, you represent that:
                </p>

                <div className="space-y-3">
                  {[
                    "You are of minimum legal adult age of your country or using with parental supervision",
                    "You have legal capacity to enter into these Terms",
                    "You will comply with all applicable laws",
                    "All information you provide is accurate and current",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-brand-light rounded-lg"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-brand-accent rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-brand-dark text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Permitted Use */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-brand-accent to-brand-secondary rounded-full"></div>
            <div className="pl-8">
              <h2 className="font-heading text-3xl font-black text-brand-primary mb-6">
                2. Permitted Use
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: <Clock className="w-4 h-4" />,
                    text: "View service times",
                  },
                  {
                    icon: <UserPlus className="w-4 h-4" />,
                    text: "Register as member",
                  },
                  {
                    icon: <Video className="w-4 h-4" />,
                    text: "Watch live streams",
                  },
                  {
                    icon: <HandHelping className="w-4 h-4" />,
                    text: "Submit prayer requests",
                  },
                  {
                    icon: <Mail className="w-4 h-4" />,
                    text: "Contact church staff",
                  },
                  {
                    icon: <Newspaper className="w-4 h-4" />,
                    text: "Read church updates",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 rounded-xl border border-brand-sky hover:border-brand-accent transition-colors"
                  >
                    <div className="text-brand-accent">{item.icon}</div>
                    <span className="text-brand-dark font-medium text-sm">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prohibited Activities */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-brand-secondary to-brand-primary rounded-full"></div>
            <div className="pl-8">
              <h2 className="font-heading text-3xl font-black text-brand-primary mb-6">
                3. Prohibited Activities
              </h2>

              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-red-900">
                    You agree NOT to engage in:
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Unlawful activities",
                    "Violating laws",
                    "Harmful content",
                    "Harassment or abuse",
                    "Impersonation",
                    "Unauthorized access",
                    "Distributing malware",
                    "Data scraping",
                    "Using bots",
                    "Interfering with site",
                    "Posting spam",
                    "IP rights violations",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2 bg-white rounded-lg"
                    >
                      <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span className="text-sm text-red-900">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-brand-accent to-brand-primary rounded-full"></div>
            <div className="pl-8">
              <h2 className="font-heading text-3xl font-black text-brand-primary mb-6">
                5. Disclaimers
              </h2>

              <div className="space-y-4">
                <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-6">
                  <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Spiritual Guidance
                  </h4>
                  <p className="text-amber-900 text-sm">
                    Spiritual content is for informational purposes only.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl p-6">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    No Professional Advice
                  </h4>
                  <p className="text-blue-900 text-sm">
                    Content does not constitute professional advice.
                  </p>
                </div>

                <div className="bg-gray-50 border-l-4 border-gray-500 rounded-r-2xl p-6">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    "As Is" Basis
                  </h4>
                  <p className="text-gray-900 text-sm mb-3">
                    Website provided "as is" without warranties regarding:
                  </p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {[
                      "Accuracy or reliability",
                      "Uninterrupted operation",
                      "Freedom from viruses",
                      "Fitness for purpose",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                        <span className="text-xs text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-brand-light to-white rounded-3xl p-8 border-2 border-brand-sky">
            <h2 className="font-heading text-3xl font-black text-brand-primary mb-6">
              Questions About These Terms?
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <a className="flex items-center gap-3 p-4 bg-white border-2 border-brand-sky rounded-xl">
                <Phone className="w-5 h-5 text-brand-accent" />
                <div>
                  <p className="text-xs text-brand-dark-light">Phone</p>
                  <p className="font-bold text-brand-dark text-sm">
                    +234 803 675 1669
                  </p>
                </div>
              </a>

              <a className="flex items-center gap-3 p-4 bg-white border-2 border-brand-sky rounded-xl">
                <Mail className="w-5 h-5 text-brand-accent" />
                <div>
                  <p className="text-xs text-brand-dark-light">Email</p>
                  <p className="font-bold text-brand-dark text-sm">
                    gospelpowerchurch07@gmail.com
                  </p>
                </div>
              </a>
            </div>

            <div className="bg-brand-accent/10 rounded-xl p-6 border-2 border-brand-accent/30">
              <p className="text-center text-brand-dark font-bold">
                BY USING THIS WEBSITE, YOU ACKNOWLEDGE THAT YOU HAVE READ,
                UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

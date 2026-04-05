import { Metadata } from "next";
import PrivacyHero from "./PrivacyHero";
import {
  UserPlus,
  Mail,
  HandHeart,
  Phone,
  CalendarCheck,
  Globe,
  Monitor,
  Clock,
  Link,
  Calendar,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - GPIC",
  description:
    "Read GPIC's Privacy Policy to understand how we protect your personal information.",
};

export default function PrivacyPage() {
  const items = [
    { text: "Register as a new member", icon: UserPlus },
    { text: "Subscribe to newsletters", icon: Mail },
    { text: "Submit prayer requests", icon: HandHeart },
    { text: "Contact us via email/phone", icon: Phone },
    { text: "Participate in events", icon: CalendarCheck },
    // { text: "Make donations", icon: Wallet },
  ];

  const autoItems = [
    { text: "IP address and browser type", icon: Globe },
    { text: "Operating system details", icon: Monitor },
    { text: "Pages visited and time spent", icon: Clock },
    { text: "Referring website source", icon: Link },
    { text: "Date and time of visits", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Elegant Header */}
      <PrivacyHero />

      {/* Content with Sidebar Layout */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Sticky Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-32 space-y-2">
                <h3 className="font-heading text-sm font-black text-brand-primary uppercase tracking-wider mb-4">
                  Quick Links
                </h3>
                <nav className="space-y-2">
                  {[
                    "Introduction",
                    "Information We Collect",
                    "How We Use Your Info",
                    "Data Sharing",
                    "Data Security",
                    "Your Rights",
                    "Contact Us",
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block px-4 py-2 text-sm text-brand-dark hover:bg-brand-light hover:text-brand-primary rounded-lg transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Introduction */}
              <section id="introduction" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-12 bg-gradient-to-b from-brand-primary to-brand-accent rounded-full"></div>
                  <h2 className="font-heading text-3xl font-black text-brand-primary">
                    Introduction
                  </h2>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-brand-dark leading-relaxed text-sm">
                    Gospel Power International Church ("GPIC," "we," "us," or
                    "our") is committed to protecting your privacy. This Privacy
                    Policy explains how we collect, use, disclose, and safeguard
                    your information when you visit our website{" "}
                    <a
                      href="https://www.gpicworldwide.org"
                      className="text-brand-accent hover:underline font-semibold"
                    >
                      www.gpicworldwide.org
                    </a>
                    .
                  </p>
                  <div className="bg-brand-secondary/10 border-l-4 border-brand-secondary rounded-r-lg p-6 mt-6">
                    <p className="text-brand-dark font-semibold mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4 text-brand-secondary" />
                      Key Point
                    </p>
                    <p className="text-brand-dark text-sm">
                      By using our website, you consent to the practices
                      described in this policy. If you do not agree, please
                      discontinue use of our website.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information We Collect */}
              <section id="information-we-collect" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-12 bg-gradient-to-b from-brand-accent to-brand-secondary rounded-full"></div>
                  <h2 className="font-heading text-3xl font-black text-brand-primary">
                    1. Information We Collect
                  </h2>
                </div>

                <div className="space-y-8">
                  {/* Personal Information Card */}
                  <div className="bg-white border-2 border-brand-sky rounded-2xl p-8 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-brand-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-brand-dark mb-2">
                          1.1 Personal Information
                        </h3>
                        <p className="text-brand-dark-light mb-4 text-sm">
                          Information you voluntarily provide when you:
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {items.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-accent/10">
                              <Icon className="w-4 h-4 text-brand-accent" />
                            </div>
                            <span className="text-brand-dark text-sm">
                              {item.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-brand-light rounded-xl p-4">
                      <p className="text-sm font-bold text-brand-dark mb-3">
                        📋 Data We May Collect:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Full Name",
                          "Phone Number",
                          "WhatsApp Number",
                          "Email",
                          "Address",
                          "Prayer Requests",
                          "Attendance Records",
                        ].map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-brand-dark border border-brand-sky"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Automatically Collected Info Card */}
                  <div className="bg-gradient-to-br from-brand-accent/5 to-brand-secondary/5 border-2 border-brand-accent/20 rounded-2xl p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-brand-accent"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-brand-dark mb-2">
                          1.2 Automatically Collected Information
                        </h3>
                        <p className="text-brand-dark-light mb-4 text-sm">
                          When you visit our website, we automatically collect:
                        </p>
                        <ul className="space-y-3">
                          {autoItems.map((item, i) => {
                            const Icon = item.icon;
                            return (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-brand-dark"
                              >
                                <div className="mt-1">
                                  <Icon className="w-4 h-4 text-brand-accent mt-0" />
                                </div>
                                <span className="text-sm mt-0.5">
                                  {item.text}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How We Use Your Info */}
              <section id="how-we-use-your-info" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-12 bg-gradient-to-b from-brand-secondary to-brand-primary rounded-full"></div>
                  <h2 className="font-heading text-3xl font-black text-brand-primary">
                    2. How We Use Your Information
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: "",
                      title: "Church Administration",
                      desc: "Manage membership, track attendance, organize activities",
                    },
                    {
                      icon: "",
                      title: "Communication",
                      desc: "Send service reminders, events, newsletters via SMS/WhatsApp/email",
                    },
                    {
                      icon: "",
                      title: "Prayer Support",
                      desc: "Respond to prayer requests and provide pastoral care",
                    },
                    {
                      icon: "",
                      title: "Follow-up",
                      desc: "Reach out to new members and absent attendees",
                    },
                    {
                      icon: "",
                      title: "Website Improvement",
                      desc: "Analyze usage and enhance user experience",
                    },
                    {
                      icon: "",
                      title: "Legal Compliance",
                      desc: "Comply with applicable laws and regulations",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white border-2 border-brand-sky rounded-xl p-6 hover:border-brand-accent hover:shadow-md transition-all"
                    >
                      <div className="text-4xl mb-3">{item.icon}</div>
                      <h3 className="font-heading text-lg font-bold text-brand-dark mb-2">
                        {item.title}
                      </h3>
                      <p className="text-brand-dark-light text-sm">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Sharing */}
              <section id="data-sharing" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-12 bg-gradient-to-b from-brand-primary to-brand-accent rounded-full"></div>
                  <h2 className="font-heading text-3xl font-black text-brand-primary">
                    3. How We Share Your Information
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-brand-accent/10 to-brand-secondary/10 rounded-2xl p-8 border-2 border-brand-accent/30 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-accent rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-brand-dark mb-2">
                        We Don't Sell Your Data
                      </h3>
                      <p className="text-brand-dark text-sm">
                        We respect your privacy and{" "}
                        <strong>never sell, rent, or trade</strong> your
                        personal information to third parties.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Church Staff",
                      desc: "Authorized staff and volunteers who need access to provide services",
                    },
                    {
                      title: "Service Providers",
                      desc: "Third-party providers for SMS, email, hosting, and storage",
                    },
                    {
                      title: "Legal Requirements",
                      desc: "When required by law, court order, or government regulation",
                    },
                    {
                      title: "Protection of Rights",
                      desc: "To protect GPIC's rights, property, or safety",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 bg-white border border-brand-sky rounded-lg"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                        <span className="text-brand-accent font-bold">
                          {i + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-dark mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-brand-dark-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Security */}
              <section id="data-security" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-12 bg-gradient-to-b from-brand-accent to-brand-primary rounded-full"></div>
                  <h2 className="font-heading text-3xl font-black text-brand-primary">
                    4. Data Security
                  </h2>
                </div>

                <div className="bg-white border-2 border-brand-primary/20 rounded-2xl p-8">
                  <p className="text-brand-dark mb-6 font-semibold">
                    We implement robust security measures to protect your
                    information:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { icon: "", text: "SSL/TLS encryption" },
                      { icon: "", text: "Password-protected systems" },
                      { icon: "", text: "Regular security audits" },
                      { icon: "", text: "Restricted data access" },
                      { icon: "", text: "Secure backups" },
                      { icon: "", text: "Disaster recovery" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-brand-light rounded-lg"
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-brand-dark font-medium text-sm">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                    <p className="text-sm text-amber-900">
                      <strong>Note:</strong> No internet transmission is 100%
                      secure. While we use commercially acceptable security
                      measures, we cannot guarantee absolute security.
                    </p>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section id="your-rights" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-12 bg-gradient-to-b from-brand-secondary to-brand-accent rounded-full"></div>
                  <h2 className="font-heading text-3xl font-black text-brand-primary">
                    5. Your Rights
                  </h2>
                </div>

                <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 rounded-2xl p-8 border-2 border-brand-primary/20">
                  <p className="text-brand-dark mb-6 font-semibold">
                    You have the following rights regarding your personal
                    information:
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        right: "Access",
                        desc: "Request a copy of your personal data",
                      },
                      {
                        right: "Correction",
                        desc: "Request correction of inaccurate information",
                      },
                      {
                        right: "Deletion",
                        desc: "Request deletion of your data",
                      },
                      {
                        right: "Opt-Out",
                        desc: "Unsubscribe from promotional messages",
                      },
                      {
                        right: "Object",
                        desc: "Object to certain data processing",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 bg-white rounded-xl"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
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
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-dark mb-1">
                            {item.right}
                          </h4>
                          <p className="text-sm text-brand-dark-light">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section id="contact-us" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-12 bg-gradient-to-b from-brand-primary to-brand-secondary rounded-full"></div>
                  <h2 className="font-heading text-3xl font-black text-brand-primary">
                    6. Contact Us
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-brand-primary to-brand-accent rounded-2xl p-8 text-white">
                  <h3 className="font-heading text-2xl font-bold mb-4">
                    Questions About Your Privacy?
                  </h3>
                  <p className="text-white/90 mb-6 text-sm">
                    We're here to help. Contact our privacy team:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                      <p className="text-sm text-white/70 mb-2">Address</p>
                      <p className="font-medium text-sm">
                        Church Auditorium, Opp. Highbrow School
                        <br />
                        Okemini Sars Rd, Rumuaghorlu
                        <br />
                        Port Harcourt, Rivers State
                      </p>
                    </div>

                    <div className="space-y-4 text-sm">
                      <a
                        href="tel:+23480367515669"
                        className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="font-medium">+234 803 675 15669</span>
                      </a>

                      <a
                        href="mailto:privacy@gpic.org"
                        className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="font-medium">privacy@gpic.org</span>
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

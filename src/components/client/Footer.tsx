"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (value: string) => {
    // Strict check: must have characters before @, a domain, a dot, and a TLD
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !isValidEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're subscribed!");
        setEmail("");
        setEmailError("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <footer className="bg-brand-dark text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-max section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 tracking-tight">
              WANT TO GET UPDATES FROM US?
            </h2>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Your Email"
                required
                disabled={status === "loading"}
                className={`w-full px-6 py-4 bg-white/5 border text-white placeholder:text-white/50 focus:outline-none transition-colors rounded-l-lg sm:rounded-r-none rounded-r-lg sm:rounded-l-lg disabled:opacity-50
          ${emailError ? "border-red-400" : "border-white/20 focus:border-brand-secondary"}`}
              />
              {emailError && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-lg">
                  ✕
                </span>
              )}
              {email && !emailError && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 text-lg">
                  ✓
                </span>
              )}
              <button
                type="submit"
                className="px-8 py-4 bg-brand-secondary text-white font-sans font-bold text-sm tracking-wider uppercase hover:bg-brand-secondary-dark transition-colors rounded-r-lg sm:rounded-l-none rounded-l-lg sm:rounded-r-lg"
              >
                {status === "loading" ? "SUBSCRIBING..." : "SUBSCRIBE"}
              </button>
            </form>

            {emailError && (
              <p className="mt-2 text-xs text-red-400 font-sans">
                {emailError}
              </p>
            )}

            {status === "success" && (
              <p className="mt-4 text-sm font-sans text-green-400">
                ✓ {message}
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm font-sans text-red-400">✕ {message}</p>
            )}
            <p className="mt-6 text-xs text-white/60 leading-relaxed font-sans">
              By subscribing to GPIC's Newsletter you consent to receive
              recurring automated messages via email.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            {/* About Us */}
            <div className="space-y-6">
              <h3 className="font-heading text-lg font-bold tracking-tight mb-4">
                ABOUT US
              </h3>
              <p className="font-sans text-sm text-white/80 leading-relaxed">
                Over the years, proving that with determination, faith, focus
                and the right team, anything is possible. GPIC has grown to be a
                transformational space where lives are changed through powerful
                encounters with God's presence and Word.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold tracking-tight mb-4">
                QUICK LINKS
              </h3>
              <ul className="space-y-3 font-sans text-sm">
                <li>
                  <Link
                    href="/live"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Live Stream
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    About GPIC
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ministries"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Ministries
                  </Link>
                </li>
                <li>
                  <Link
                    href="/newcomer"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Become a Member
                  </Link>
                </li>
              </ul>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold tracking-tight mb-4">
                NEXT STEPS
              </h3>
              <ul className="space-y-3 font-sans text-sm">
                <li>
                  <Link
                    href="live"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Watch Sermons
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Share Testimonies
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Request Prayer
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Upcoming Programs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Join Our WhatsApp Channel
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Just Accepted Christ?
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Contact */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold tracking-tight mb-4">
                LEGAL
              </h3>
              <ul className="space-y-3 font-sans text-sm mb-6">
                <li>
                  <Link
                    href="/privacy"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>

              {/* Contact Info */}
              <div className="pt-6 space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin
                    size={18}
                    className="mt-1 flex-shrink-0 text-brand-secondary"
                  />
                  <span className="text-sm text-white/80 font-sans">
                    Opp. Highbrow School,
                    <br />
                    Okemini Sars Road, Rumuaghorlu
                    <br />
                    Port Harcourt, Rivers State.
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone
                    size={18}
                    className="flex-shrink-0 text-brand-secondary"
                  />
                  <span className="text-sm text-white/80 font-sans">
                    +234 (080) 367-51-669
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail
                    size={18}
                    className="flex-shrink-0 text-brand-secondary"
                  />
                  <span className="text-sm text-white/80 font-sans">
                    gospelpowerchurch07@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <div>
                  <div className="font-heading text-2xl font-bold tracking-tight text-white">
                    GOSPEL
                  </div>
                  <div className="text-xs text-white/60 tracking-widest font-sans font-bold">
                    POWER INT'L CHURCH
                  </div>
                </div>
              </Link>

              {/* Social Media */}
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/GospelPowerInternationalChurch"
                  className="w-11 h-11 border border-white/20 hover:border-brand-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-secondary/10"
                  aria-label="Facebook"
                >
                  <Facebook size={20} className="text-white" />
                </a>
                <a
                  href="https://www.tiktok.com/@gospel.power.intl?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 border border-white/20 hover:border-brand-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-secondary/10"
                  aria-label="TikTok"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-1.88V16.03a5.273 5.273 0 1 1-5.273-5.273c.148 0 .293.013.435.03v2.63a2.65 2.65 0 1 0 1.87 2.53V2.25h2.968a4.79 4.79 0 0 0 3.77 4.436v0z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-11 h-11 border border-white/20 hover:border-brand-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-secondary/10"
                  aria-label="Instagram"
                >
                  <Instagram size={20} className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 border border-white/20 hover:border-brand-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-secondary/10"
                  aria-label="YouTube"
                >
                  <Youtube size={20} className="text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-max px-6 md:px-12 lg:px-24 py-6">
          <p className="text-center font-sans text-sm text-white/60">
            © {new Date().getFullYear()} Gospel Power International Church. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
                className="flex-1 px-6 py-4 bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-secondary transition-colors rounded-l-lg sm:rounded-r-none rounded-r-lg sm:rounded-l-lg"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-brand-secondary text-white font-sans font-bold text-sm tracking-wider uppercase hover:bg-brand-secondary-dark transition-colors rounded-r-lg sm:rounded-l-none rounded-l-lg sm:rounded-r-lg"
              >
                SUBSCRIBE
              </button>
            </form>
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

              {/* Download App */}
              {/* <div className="pt-4">
                <h4 className="font-heading text-base font-bold tracking-tight mb-4">
                  DOWNLOAD OUR APP
                </h4>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="inline-block hover:opacity-80 transition-opacity"
                    aria-label="Download on App Store"
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Download on App Store"
                      className="h-10"
                    />
                  </a>
                  <a
                    href="#"
                    className="inline-block hover:opacity-80 transition-opacity"
                    aria-label="Get it on Google Play"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-10"
                    />
                  </a>
                </div>
              </div> */}
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold tracking-tight mb-4">
                QUICKLINKS
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
                    href="/contact"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Contact Us
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
                    href="/blog"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Our Blog
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
                    href="/sermons"
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
                    href="/events"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Upcoming Programs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ministries"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Join A Small Group
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
                    href="/terms"
                    className="text-white/80 hover:text-brand-secondary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
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
                    +234 (080) 367-515-669
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail
                    size={18}
                    className="flex-shrink-0 text-brand-secondary"
                  />
                  <span className="text-sm text-white/80 font-sans">
                    info@gpic.org
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
                {/* <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-heading text-xl font-bold">
                      G
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-secondary rounded-full border-2 border-brand-dark"></div>
                </div> */}
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
                  href="#"
                  className="w-11 h-11 border border-white/20 hover:border-brand-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-secondary/10"
                  aria-label="Facebook"
                >
                  <Facebook size={20} className="text-white" />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 border border-white/20 hover:border-brand-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-brand-secondary/10"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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

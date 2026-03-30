"use client";

import Link from "next/link";

export default function Cta() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-brand-primary via-brand-accent to-brand-secondary rounded-2xl p-10 md:p-12 relative overflow-hidden">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />

          <div className="relative">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-4">
              Ready to Join Our Family?
            </h2>

            <p className="text-white/80 text-sm md:text-base mb-8 max-w-xl mx-auto">
              Fill out the registration form and take the first step in your
              journey with GPIC.
            </p>

            <Link
              href="/newcomer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-primary text-sm font-medium rounded-lg hover:bg-gray-100 transition"
            >
              <span>Start Registration</span>

              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

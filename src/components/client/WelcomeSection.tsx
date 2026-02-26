"use client";

import { motion } from "framer-motion";

export default function WelcomeSection() {
  return (
    <section className="bg-brand-sky py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
        >
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            {/* Small Intro Text */}
            <p className="font-sans uppercase tracking-[0.4em] text-xs text-primary-light">
              Welcome To GPIC
            </p>

            {/* Main Heading */}
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-dark leading-tight">
              Worship with us
            </h2>

            {/* Paragraph */}
            <p className="font-sans text-dark-light text-base md:text-lg leading-relaxed max-w-xl">
              At Gospel Power International Church, we are passionate about
              transforming lives through the power of God’s Word. Whether you
              join us in person or online, we are dedicated to raising a
              generation rooted deeply in faith and love. There’s a place for
              everyone here — and we can’t wait to worship with you.
            </p>
          </div>

          {/* RIGHT SIDE BUTTON */}
          <div className="flex md:justify-end">
            <button
              className="border border-dark text-dark font-sans px-10 py-4 
              uppercase tracking-wider text-sm 
              hover:bg-dark hover:text-light transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

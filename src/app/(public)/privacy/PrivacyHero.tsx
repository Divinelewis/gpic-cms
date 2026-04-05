"use client";

import { motion } from "framer-motion";

export default function PrivacyHero() {
  return (
    <section className="relative h-[75vh] flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white/80 text-xs tracking-widest uppercase mb-6"
        >
          • Legal Information
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading font-black text-white leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Privacy
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading font-black text-brand-primary-light leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6"
        >
          Policy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8"
        >
          Your privacy matters to us. Learn how we collect, use, and protect
          your personal information at Gospel Power International Church.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
        >
          <p className="text-xs text-white/90">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

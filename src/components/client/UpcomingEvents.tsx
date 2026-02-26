"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const events = [{ id: 1, image: "/images/flier1.jpg" }];

const slides = events.length > 0 ? events : [{ id: 0, image: null }];

export default function UpcomingEvents() {
  const [current, setCurrent] = useState(0);

  // ✅ AUTO SLIDE EVERY 5 SECONDS
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="bg-brand-accent-light py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center"
        >
          {/* LEFT CONTENT */}
          <div className="space-y-6 text-center lg:text-left">
            <p className="font-sans uppercase tracking-[0.4em] text-xs text-primary-light">
              Upcoming Events
            </p>

            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-dark leading-tight">
              Join Our Services and Programs
            </h2>

            <p className="font-sans text-dark-light text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Find out God’s plan for you. Experience Him uniquely. Stay
              connected with all our upcoming programs and special services.
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link href="/events">
                <button className="border border-dark text-dark font-sans px-10 py-4 uppercase tracking-wider text-sm hover:bg-dark hover:text-light transition-all duration-300">
                  View Events
                </button>
              </Link>

              <Link href="/livestream">
                <button className="bg-dark text-light font-sans px-10 py-4 uppercase tracking-wider text-sm hover:opacity-90 transition-all duration-300">
                  Livestream
                </button>
              </Link>
            </div> */}
          </div>

          {/* RIGHT FLIER SLIDER */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-[148/105] rounded-2xl overflow-hidden shadow-xl">
              <AnimatePresence mode="sync">
                <motion.div
                  key={slides[current].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  {slides[current].image ? (
                    <img
                      src={slides[current].image}
                      alt="Event Flyer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-dark flex items-center justify-center text-center px-6">
                      <div>
                        <h3 className="text-light font-heading text-lg uppercase tracking-widest">
                          No Events Available
                        </h3>
                        <p className="text-light/70 text-sm mt-3">
                          Always check back for updates.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Arrows */}
              {slides.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* ✅ Slide Indicators */}
            {slides.length > 1 && (
              <div className="absolute bottom-[-40px] flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      current === index ? "w-8 bg-dark" : "w-2 bg-dark/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const slides = [
  {
    id: 1,
    image: "images/frame1.png",
    badge: "Our Vision",
    line1: "WE ENVISION ALL MEN",
    line2: "CELEBRATING ENDLESS",
    highlight: "LIFE IN CHRIST",
  },
  // https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop
  // https://images.unsplash.com/photo-1473172707857-f9e276582ab6?q=80&w=2070&auto=format&fit=crop
  {
    id: 2,
    image: "images/frame1.png",
    badge: "Experience God",
    line1: "A PLACE OF POWER",
    line2: "FAITH AND WORSHIP",
    highlight: "TRANSFORMATION",
  },
  {
    id: 3,
    image: "images/frame1.png",
    badge: "Join Us",
    line1: "DISCOVER YOUR",
    line2: "DIVINE PURPOSE",
    highlight: "IN CHRIST",
  },
];

export default function HeroSlider() {
  const router = useRouter();

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          />

          {/* DARK OVERLAY — adjust /90 to control darkness */}
          <div className="absolute inset-0 bg-black/90"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center text-center px-6 pointer-events-auto">
            <div className="max-w-6xl mx-auto space-y-6 md:space-y-5">
              {/* Badge */}
              <div className="flex justify-center">
                <span
                  className="font-sans text-[8px] md:text-sm tracking-[0.10em] uppercase 
                  bg-white/10 backdrop-blur-sm text-white 
                  px-5 py-1.5 rounded-full border border-white/20"
                >
                  {slides[currentSlide].badge}
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-1 md:space-y-1">
                <h1
                  className="font-heading font-black uppercase text-white tracking-tight
                  text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight"
                >
                  {slides[currentSlide].line1}
                </h1>

                <h1
                  className="font-heading font-black uppercase text-white tracking-tight
                  text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight"
                >
                  {slides[currentSlide].line2}
                </h1>

                <h1
                  className="font-heading font-black uppercase text-brand-primary-light tracking-tight
                  text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight"
                >
                  {slides[currentSlide].highlight}
                </h1>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
                <button
                  onClick={() => router.push("/live")}
                  className="bg-brand-light text-brand-primary font-semibold text-sm px-5 py-2 rounded-full 
                  hover:bg-brand-cream transition-all duration-300"
                >
                  WATCH LIVE
                </button>

                <button
                  onClick={() => router.push("/ministries")}
                  className="border border-white text-white text-sm px-5 py-2 rounded-full
                  hover:bg-white hover:text-brand-primary transition-all duration-300"
                >
                  VISIT US
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Desktop Arrows */}
      <button
        onClick={prevSlide}
        className="absolute z-20 left-4 top-1/2 -translate-y-1/2
        p-1.5 bg-white/10 backdrop-blur-sm text-white rounded-full
        hover:bg-white/20 transition"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute z-20 right-4 top-1/2 -translate-y-1/2
        p-1.5 bg-white/10 backdrop-blur-sm text-white rounded-full
        hover:bg-white/20 transition"
      >
        <ChevronRight size={18} />
      </button>

      {/* Indicators */}
      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-10 h-2 bg-brand-secondary"
                : "w-2 h-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

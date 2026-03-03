"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  {
    src: "carousel/photo1.jpg",
    alt: "",
    rotation: 3,
  },
  {
    src: "carousel/photo1.jpg",
    alt: "",
    rotation: -2,
  },
  {
    src: "carousel/photo2.jpg",
    alt: "",
    rotation: 4,
  },
  {
    src: "carousel/photo2.jpg",
    alt: "",
    rotation: -3,
  },
  {
    src: "carousel/photo1.jpg",
    alt: "",
    rotation: 2,
  },
  {
    src: "carousel/photo2.jpg",
    alt: "",
    rotation: -4,
  },
  {
    src: "carousel/photo3.jpg",
    alt: "",
    rotation: 3,
  },
  {
    src: "carousel/photo3.jpg",
    alt: "",
    rotation: -2,
  },
  {
    src: "carousel/photo1.jpg",
    alt: "",
    rotation: 4,
  },
  {
    src: "carousel/photo2.jpg",
    alt: "",
    rotation: -3,
  },
];

export default function ImageCarousel() {
  const [duplicatedImages, setDuplicatedImages] = useState<typeof images>([]);

  useEffect(() => {
    setDuplicatedImages([...images, ...images, ...images]);
  }, []);

  return (
    <section className="bg-gradient-to-b from-white via-brand-light to-white py-20 md:py-28 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-brand-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl"></div>

      {/* Header - Constrained */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 bg-brand-secondary/10 px-6 py-2 rounded-full">
              <div className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse"></div>
              <span className="text-brand-secondary font-bold text-xs tracking-widest uppercase">
                Our Gallery
              </span>
            </div>
          </div>

          <h2 className="font-heading font-black text-3xl py-4 sm:text-4xl md:text-5xl lg:text-6xl text-dark leading-tight">
            Moments in Church
          </h2>
          <p className="font-sans text-dark-light text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Capturing the joy, power, and presence of God in our gatherings
          </p>
        </motion.div>
      </div>

      {/* Desktop Carousel - Wider Container with Fade (lg screens and above only) */}
      <div className="hidden md:block">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="relative mb-12">
            {/* Enhanced Fade Overlays for Desktop - Only on lg+ screens, matching background color */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-brand-light via-brand-light/80 to-transparent z-10 pointer-events-none"></div>
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-brand-light via-brand-light/80 to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling Images Container */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-8 py-4"
                animate={{
                  x: [0, -1920],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 45,
                    ease: "linear",
                  },
                }}
              >
                {duplicatedImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 relative group"
                    style={{
                      width: "320px",
                      height: "240px",
                    }}
                    whileHover={{ scale: 1.08, zIndex: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className="w-full h-full overflow-hidden shadow-2xl border-[6px] border-white relative"
                      style={{
                        transform: `rotate(${image.rotation}deg)`,
                        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                      }}
                    >
                      {/* Decorative Corner */}
                      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-brand-secondary/30 z-10"></div>
                      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-brand-secondary/30 z-10"></div>

                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        style={{
                          transform: `rotate(${-image.rotation}deg) scale(1.2)`,
                        }}
                      />

                      {/* Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Caption on Hover */}
                    <div
                      className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        transform: `rotate(${image.rotation}deg)`,
                      }}
                    >
                      <div
                        className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
                        style={{
                          transform: `rotate(${-image.rotation}deg)`,
                        }}
                      >
                        <p className="text-brand-primary font-heading font-black text-sm text-center">
                          {image.alt}
                        </p>
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-brand-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        transform: `rotate(${image.rotation}deg)`,
                      }}
                    ></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Carousel - Two Rows - NO FADE */}
      <div className="md:hidden space-y-8">
        {/* First Row - Left to Right */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 py-2"
            animate={{
              x: [0, -1200],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 relative"
                style={{
                  width: "200px",
                  height: "150px",
                }}
              >
                <div
                  className="w-full h-full overflow-hidden shadow-xl border-[5px] border-white relative"
                  style={{
                    transform: `rotate(${image.rotation}deg)`,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-1 right-1 w-4 h-4 border-t border-r border-brand-secondary/40"></div>
                  <div className="absolute bottom-1 left-1 w-4 h-4 border-b border-l border-brand-secondary/40"></div>

                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    style={{
                      transform: `rotate(${-image.rotation}deg) scale(1.3)`,
                    }}
                  />

                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-primary/20"></div>
                </div>

                {/* Small Corner Dot */}
                <div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-brand-secondary rounded-full border-2 border-white"
                  style={{
                    transform: `rotate(${image.rotation}deg)`,
                  }}
                ></div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 py-2"
            animate={{
              x: [-1200, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 relative"
                style={{
                  width: "200px",
                  height: "150px",
                }}
              >
                <div
                  className="w-full h-full overflow-hidden shadow-xl border-[5px] border-white relative"
                  style={{
                    transform: `rotate(${-image.rotation}deg)`,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-1 left-1 w-4 h-4 border-t border-l border-brand-accent/40"></div>
                  <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r border-brand-accent/40"></div>

                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    style={{
                      transform: `rotate(${image.rotation}deg) scale(1.3)`,
                    }}
                  />

                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-brand-accent/20"></div>
                </div>

                {/* Small Corner Dot */}
                <div
                  className="absolute -bottom-1 -left-1 w-3 h-3 bg-brand-accent rounded-full border-2 border-white"
                  style={{
                    transform: `rotate(${-image.rotation}deg)`,
                  }}
                ></div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Decorative Elements - Constrained */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-16">
        <div className="flex items-center justify-center gap-4">
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-brand-secondary/30 to-transparent"></div>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-brand-secondary rounded-full"></div>
            <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
            <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
          </div>
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-brand-secondary/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}

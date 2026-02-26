"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PastorImage from "../../../public/images/revephrcolor.png";
import Logo from "../../../public/images/Logo.png";

export default function PastorSection() {
  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden text-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE — PASTOR IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center md:justify-start"
          >
            {/* Soft Gold Glow Behind Image */}
            <div
              className="absolute w-80 h-80 md:w-[420px] md:h-[420px] 
              bg-secondary/20 rounded-full blur-3xl"
            ></div>

            <Image
              src={PastorImage}
              alt="Apostle Ephraim Nwachukwu"
              priority
              className="relative z-10 w-full max-w-md md:max-w-lg object-contain"
            />
          </motion.div>

          {/* RIGHT SIDE — TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 text-center md:text-left"
          >
            {/* Logo */}
            <div className="flex justify-center md:justify-start">
              <Image
                src={Logo}
                alt="Gospel Power International Church Logo"
                width={55}
                height={55}
              />
            </div>

            {/* Section Label */}
            <p className="font-sans uppercase tracking-[0.4em] text-secondary text-sm">
              Our Lead Pastor
            </p>

            {/* Pastor Name */}
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Apostle Ephraim Nwachukwu
            </h2>

            {/* Description */}
            <p className="font-sans text-light/80 text-base md:text-lg leading-relaxed max-w-xl">
              Apostle Ephraim Nwachukwu is the visionary leader of
              <span className="text-secondary">
                {" "}
                Gospel Power International Church
              </span>
              , a ministry committed to proclaiming Christ and raising believers
              grounded deeply in truth and purpose.
              <br />
              <br />
              Through passionate teaching and apostolic leadership, he continues
              to inspire spiritual growth, transformation, and kingdom impact
              across communities and nations.
            </p>

            {/* Button
            <div>
              <button
                className="border border-light text-light font-sans px-8 py-3 rounded-full
                hover:bg-light hover:text-dark transition-all duration-300 uppercase tracking-wide text-sm"
              >
                Read More
              </button>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { useState } from "react";

interface Campus {
  id: number;
  name: string;
  location: string;
  address: string;
  serviceTimes: string[];
  image: string;
  country: string;
}

const campuses: Campus[] = [
  {
    id: 1,
    name: "GPIC Port Harcourt",
    location: "Rivers State",
    address: "Okemini Sars Road, Rumuaghorlu",
    serviceTimes: ["Sunday 7:30am", "Wednesday 6pm WAT"],
    image: "images/gpicph.jpg",
    country: "NIGERIA",
  },
  {
    id: 2,
    name: "GPIC Bayelsa",
    location: "Bayelsa",
    address: "",
    serviceTimes: ["Sunday 9:00am", "Wednesday 6pm WAT"],
    image: "images/gpicph.jpg",
    country: "NIGERIA",
  },
];

const countries = [{ name: "NIGERIA", count: 2, flag: "🇳🇬" }];

export default function MinistriesPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const filteredCampuses = selectedCountry
    ? campuses.filter((campus) => campus.country === selectedCountry)
    : campuses;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center bg-black">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop')",
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-xs font-bold tracking-widest uppercase mb-8"
          >
            ● MINISTRIES
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading font-black text-white leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            RAISING DISCIPLES,
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-heading font-black text-brand-primary-light leading-tight mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            FOR CHRIST.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white text-base mb-8"
          >
            Join us at a Gospel Power Church near you
          </motion.p>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-heading font-black text-center text-brand-dark mb-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            VISIT GOSPEL POWER CHURCH
          </motion.h2>

          {/* Country Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {countries.map((country, index) => (
              <motion.button
                key={country.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() =>
                  setSelectedCountry(
                    selectedCountry === country.name ? null : country.name,
                  )
                }
                className={`px-6 py-3 border-2 rounded-full font-sans text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  selectedCountry === country.name
                    ? "border-brand-primary bg-brand-primary text-white"
                    : "border-brand-dark-light text-brand-dark hover:border-brand-primary"
                }`}
              >
                <span className="text-lg">{country.flag}</span>
                <span>
                  {country.name} ({country.count})
                </span>
              </motion.button>
            ))}
          </div>

          {/* Campus Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCampuses.map((campus, index) => (
              <motion.div
                key={campus.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-brand-sky hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Campus Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={campus.image}
                    alt={campus.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Campus Info */}
                <div className="p-6">
                  <h3 className="font-heading text-lg font-black text-brand-dark mb-4">
                    {campus.name}
                  </h3>

                  {/* Address */}
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin
                      className="text-brand-secondary flex-shrink-0 mt-1"
                      size={16}
                    />
                    <p className="text-brand-dark-light text-xs leading-relaxed">
                      {campus.address}
                    </p>
                  </div>

                  {/* Service Times */}
                  <div className="flex items-start gap-2">
                    <Clock
                      className="text-brand-secondary flex-shrink-0 mt-1"
                      size={16}
                    />
                    <div>
                      <p className="text-xs font-bold text-brand-dark uppercase tracking-wide mb-2">
                        Service Times
                      </p>
                      {campus.serviceTimes.map((time, idx) => (
                        <p
                          key={idx}
                          className="text-brand-dark-light text-xs mb-1"
                        >
                          {time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredCampuses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-brand-dark-light text-lg">
                No campuses found for the selected country.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

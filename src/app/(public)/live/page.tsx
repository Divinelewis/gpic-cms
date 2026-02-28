"use client";

import { motion } from "framer-motion";
import { Radio, Calendar, Clock, Users, Play } from "lucide-react";

export default function LivePage() {
  const youtubeChannelId = "UCxxxxxxxxxxxxxx";
  const youtubeEmbedUrl = `https://www.youtube.com/embed/live_stream?channel=${youtubeChannelId}&autoplay=1`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-brand-secondary/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-brand-secondary"
          >
            <Radio className="text-brand-secondary animate-pulse" size={20} />
            <span className="text-brand-secondary font-bold text-sm tracking-widest uppercase">
              Live Now
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            WATCH LIVE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Experience church from anywhere. Join us live for worship, teaching,
            and fellowship.
          </motion.p>
        </div>
      </section>

      {/* Live Stream Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-black overflow-hidden shadow-2xl">
            <div
              className="relative w-full bg-black"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={youtubeEmbedUrl}
                title="GPIC Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="p-8 md:p-12 bg-brand-dark text-white">
              <h2 className="font-heading text-3xl font-black mb-8">
                Sunday Service Live Stream
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                  <Calendar size={20} />
                  <div>
                    <h3 className="font-heading font-black mb-1">
                      Every Sunday - 7:00am
                    </h3>
                    <p className="text-sm text-white/70">
                      Join us weekly for worship
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock size={20} />
                  <div>
                    <h3 className="font-heading font-black mb-1">
                      Every Wednesday - 6:00pm
                    </h3>
                    <p className="text-sm text-white/70">Mid-Week Service</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users size={20} />
                  <div>
                    <h3 className="font-heading font-black mb-1">
                      Interactive Chat
                    </h3>
                    <p className="text-sm text-white/70">
                      Connect with the community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Can't Watch Live Section */}
      <section className="py-20 px-6 bg-brand-light">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8">
            <h3 className="font-heading text-3xl font-black text-brand-primary mb-6">
              Can&apos;t Watch Live?
            </h3>

            <p className="mb-6">
              All our services are recorded and available anytime.
            </p>

            <div className="space-y-4">
              <a
                href="/sermons"
                className="block w-full px-6 py-4 bg-white text-brand-primary text-center font-bold border hover:bg-brand-secondary hover:text-white transition-all duration-300"
              >
                View Past Sermons
              </a>

              <a
                href="https://youtube.com/@yourchannelname"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-transparent border-2 border-brand-primary text-brand-primary text-center font-bold hover:bg-brand-primary hover:text-white transition-all duration-300"
              >
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="py-20 px-6 bg-brand-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-white mb-6">
            Never Miss a Service
          </h2>

          <a
            href="https://youtube.com/@yourchannelname"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-brand-secondary text-white font-black hover:bg-brand-secondary-light transition-colors uppercase tracking-wider text-sm"
          >
            Subscribe Now
          </a>
        </div>
      </section> */}
    </div>
  );
}

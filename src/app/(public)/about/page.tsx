"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/85"></div>

        {/* Hero Text */}
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-xs font-bold tracking-widest uppercase mb-8"
          >
            ● ABOUT US
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading font-black text-white leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            WE ARE DISCIPLES,
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading font-black text-brand-primary-light leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            OF CHRIST.
          </motion.h1>
        </div>
      </section>

      {/* We Serve God Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left Side - Bold Statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading font-black text-brand-dark leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                WE SERVE GOD
              </h2>
              <h2 className="font-heading font-black text-brand-secondary leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                BY HIS SPIRIT
              </h2>
            </motion.div>

            {/* Right Side - Two Columns of Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="space-y-4">
                <p className="text-brand-dark-light text-sm leading-relaxed">
                  Gospel Power International Church (GPIC) is a vibrant,
                  Spirit-filled community founded by Apostle Ephraim Nwachukwu.
                  Our vision is to see all people celebrate an endless life in
                  Christ Jesus and fully embrace the power of His death, burial,
                  and resurrection.
                </p>
                <p className="text-brand-dark-light text-sm leading-relaxed">
                  At GPIC, we are committed to knowing Christ deeply and making
                  Him known throughout the world. We nurture spiritual growth
                  through in-depth teaching services, powerful prayer sessions,
                  and outreach programs, empowering believers to live out their
                  faith boldly. Our services are marked by the word of God,
                  where prayer, prophecies, and spiritual songs flow freely in
                  an atmosphere of worship.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-brand-dark-light text-sm leading-relaxed">
                  We hold firmly to the Word of God as the ultimate standard of
                  conduct, and we believe that the greatest demonstration of
                  God&apos;s love is found in the redemptive work of Christ.
                  Through His grace, we are blessed and righteous in His sight.
                </p>
                <p className="text-brand-dark-light text-sm leading-relaxed">
                  Under Apostle Ephraim Nwachukwu&apos;s leadership, GPIC
                  continues to grow into a global ministry across Nigeria. We
                  are the hands and feet of Christ, spreading the gospel to the
                  uttermost parts of the earth.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-brand-sky py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-none overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop"
                alt="Worship"
                className="w-full h-full object-cover grayscale"
              />
            </motion.div>

            {/* Right Side - Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-sans text-xs font-bold tracking-[0.3em] uppercase text-brand-dark-light mb-4">
                  OUR MISSION
                </h3>
                <p className="text-brand-dark-light text-sm leading-relaxed">
                  1 Corinthians 1:10: We are the heart that embraces all with
                  love; the voice that speaks change into people with hope,
                  comfort, and peace.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-xs font-bold tracking-[0.3em] uppercase text-brand-dark-light mb-4">
                  OUR VISION
                </h3>
                <p className="text-brand-dark-light text-sm leading-relaxed">
                  Our core vision is to see a church made up of people from many
                  ethnic backgrounds and nationalities with strong passion to
                  serve God, love one another, saturating our environment and
                  the world with the presence and power of God.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="font-sans text-xs font-bold tracking-[0.3em] uppercase text-brand-dark-light mb-6">
                GLOBAL REACH
              </h3>
              <p className="text-brand-dark-light text-sm leading-relaxed mb-8">
                With over 27 expressions across the globe, including Nigeria,
                the United States, Canada, the United Kingdom, and South Africa,
                Gospel Power International Church is committed to expanding
                God&apos;s Kingdom and creating a community of believers who
                will change their world.
              </p>
              <button
                onClick={() => router.push("/ministries")}
                className="px-5 py-2 border border-brand-dark text-brand-dark text-xs font-sans hover:bg-brand-dark hover:text-white transition-all duration-300"
              >
                View All Ministries
              </button>
            </motion.div>

            {/* Right Side - Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-80 flex items-center justify-center"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Globe className="text-brand-dark-light/20" size={200} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="inline-block bg-white border border-brand-dark-light px-4 py-1.5 text-xs font-bold text-brand-dark mx-1 mb-2">
                      🇳🇬 RIVERS STATE
                    </div>
                    <div className="inline-block bg-white border border-brand-dark-light px-4 py-1.5 text-xs font-bold text-brand-dark mx-1 mb-2">
                      🇳🇬 BAYELSA
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-gradient-to-b from-brand-accent-light to-brand-accent py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-brand-light/95 backdrop-blur-sm rounded-none px-12 py-16"
          >
            {/* Heading */}
            <h2 className="font-heading font-black text-brand-dark text-center mb-12 tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              CORE VALUES
            </h2>

            {/* Four Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Faith */}
              <div>
                <h3 className="font-sans text-sm font-black text-brand-dark mb-4 tracking-wide">
                  FAITH
                </h3>
                <p className="text-brand-dark-light text-sm leading-relaxed">
                  We believe in the unlimited power of God to bring change and
                  transformation in every situation.
                </p>
              </div>

              {/* Prayer */}
              <div>
                <h3 className="font-sans text-sm font-black text-brand-dark mb-4 tracking-wide">
                  PRAYER
                </h3>
                <p className="text-brand-dark-light text-sm leading-relaxed">
                  Our foundation is built on fervent and consistent prayer,
                  which has birthed the NSPPD movement.
                </p>
              </div>

              {/* Love */}
              <div>
                <h3 className="font-sans text-sm font-black text-brand-dark mb-4 tracking-wide">
                  LOVE
                </h3>
                <p className="text-brand-dark-light text-sm leading-relaxed">
                  We aim to show God&apos;s love to all people, welcoming
                  everyone to experience His grace and mercy.
                </p>
              </div>

              {/* Community */}
              <div>
                <h3 className="font-sans text-sm font-black text-brand-dark mb-4 tracking-wide">
                  COMMUNITY
                </h3>
                <p className="text-brand-dark-light text-sm leading-relaxed">
                  We foster a strong sense of family, where everyone is valued
                  and supported in their spiritual journey.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

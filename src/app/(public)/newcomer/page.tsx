"use client";

import { motion } from "framer-motion";

// export const metadata: Metadata = {
//   title: "New Member Registration | GPIC",
//   description:
//     "Welcome to Gospel Power International Church! Register as a new member.",
// };

export default function NewcomerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-brand-light/30 to-white">
      {/* ANIMATED HERO SECTION */}
      <section className="relative h-[75vh] flex flex-col items-center justify-center bg-black">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070&auto=format&fit=crop')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          {/* Badge */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/80 text-xs tracking-widest uppercase mb-6"
          >
            • Welcome Home
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading font-black text-white leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            We're Excited to
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-heading font-black text-brand-primary-light leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6"
          >
            Meet You
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8"
          >
            Thank you for choosing Gospel Power International Church as your
            spiritual home. Fill the form below and begin your journey with us.
          </motion.p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* INSTRUCTIONS CARD */}
          <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 md:p-10 mb-12 border border-brand-sky overflow-hidden">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-brand-accent/10 to-transparent rounded-bl-full"></div>

            {/* Icon */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="font-heading text-3xl font-black text-brand-primary">
                Registration Instructions
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                  text: "Fill out all required fields marked with *",
                  color: "text-brand-accent",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  ),
                  text: "Ensure your phone numbers are correct",
                  color: "text-brand-primary",
                },
                // {
                //   icon: (
                //     <path
                //       strokeLinecap="round"
                //       strokeLinejoin="round"
                //       strokeWidth={2.5}
                //       d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                //     />
                //   ),
                //   text: "Share prayer requests - we'd love to pray with you",
                //   color: "text-brand-secondary",
                // },
                // {
                //   icon: (
                //     <path
                //       strokeLinecap="round"
                //       strokeLinejoin="round"
                //       strokeWidth={2.5}
                //       d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                //     />
                //   ),
                //   text: "First-timers receive a special welcome gift!",
                //   color: "text-brand-accent",
                // },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-brand-light/50 transition-all duration-300"
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 ${item.color} bg-gradient-to-br from-current/10 to-current/5 rounded-xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300`}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <p className="text-brand-dark text-base leading-relaxed pt-1.5">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* EMBEDDED FORM SECTION */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-brand-sky">
            {/* Form Header */}
            <div className="relative bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary p-8 overflow-hidden">
              {/* Decorative Circles */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-3xl font-black text-white">
                  Registration Form
                </h3>
                <p className="text-white/80 mt-2 text-sm">
                  Fill in your details below to join our family
                </p>
              </div>
            </div>

            {/* Form Container */}
            <div className="relative w-full bg-gradient-to-b from-brand-light/20 to-white">
              <div
                className="relative w-full"
                style={{ paddingBottom: "110%" }}
              >
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLScKI-mPb1zsyE1u1lbYoAYJHc8uJUxCZdGbMMql7gq4dAUfpA/viewform?embedded=true"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  title="GPIC Newcomer Registration Form"
                />
              </div>
            </div>
          </div>

          {/* CONTACT HELP CARD */}
          <div className="mt-12 relative bg-gradient-to-br from-brand-secondary/5 via-brand-accent/5 to-brand-primary/5 rounded-3xl p-8 md:p-10 border-2 border-brand-secondary/20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary rounded-full blur-3xl"></div>
            </div>

            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-accent to-brand-secondary rounded-2xl shadow-lg mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>

              <h3 className="font-heading text-2xl font-black text-brand-primary mb-3">
                Need Help?
              </h3>
              <p className="text-brand-dark-light mb-8 max-w-md mx-auto">
                If you have any questions or need assistance filling out the
                form, we're here to help!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+23480367515669"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-brand-primary text-brand-primary font-bold rounded-xl hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <svg
                    className="w-5 h-5 group-hover:rotate-12 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>Call Us Now</span>
                </a>
                <a
                  href="https://wa.me/23480367515669"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-brand-light/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-accent/10 text-brand-accent font-bold rounded-full text-sm uppercase tracking-wider mb-4">
              Your Journey Starts Here
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-brand-primary mb-4">
              What Happens Next?
            </h2>
            <p className="text-brand-dark-light text-lg max-w-2xl mx-auto">
              Here's what you can expect after submitting your registration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "We Receive Your Info",
                description:
                  "Your registration is sent to our welcome team immediately and securely stored",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                ),
                color: "from-brand-primary to-brand-primary-dark",
                delay: "0",
              },
              {
                step: "2",
                title: "We Reach Out",
                description:
                  "Expect a warm welcome message via WhatsApp within 24 hours from our team",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                ),
                color: "from-brand-accent to-brand-secondary",
                delay: "100",
              },
              {
                step: "3",
                title: "See You Sunday!",
                description:
                  "Join us for Sunday service at 7:00 AM and receive your special welcome gift",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                ),
                color: "from-brand-secondary to-brand-accent",
                delay: "200",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-brand-sky overflow-hidden hover:-translate-y-2"
                style={{ animationDelay: `${step.delay}ms` }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} opacity-5 rounded-bl-full transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:opacity-10`}
                ></div>

                {/* Step Number */}
                <div className="relative mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-3xl font-black text-white">
                      {step.step}
                    </span>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-light rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className={`w-6 h-6 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {step.icon}
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-2xl font-black text-brand-primary mb-3 relative">
                  {step.title}
                </h3>

                <p className="text-brand-dark-light leading-relaxed relative">
                  {step.description}
                </p>

                {/* Arrow Icon */}
                <div className="mt-6 relative">
                  <div className="inline-flex items-center text-brand-accent font-bold text-sm group-hover:translate-x-2 transition-transform duration-300">
                    Learn more
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
    </div>
  );
}

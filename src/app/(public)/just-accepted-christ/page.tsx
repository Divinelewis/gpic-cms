import { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  Crown,
  Wind,
  Gift,
  BookOpen,
  Lightbulb,
  Users,
  Building,
  Footprints,
  Hand,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Just Accepted Christ?",
  description:
    "Congratulations on your decision to follow Jesus! Learn what it means to be born again and start your journey with Christ.",
};

export default function JustAcceptedChristPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO (FIXED — matches your privacy style) */}
      <section className="relative min-h-[75vh] flex items-center justify-center py-20 bg-black overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070&auto=format&fit=crop')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-white/80 text-xs tracking-widest uppercase mb-6">
            • New Life in Christ
          </p>

          <h1 className="font-heading font-black text-white leading-tight text-4xl md:text-6xl">
            Just Accepted
          </h1>

          <h1 className="font-heading font-black text-brand-primary-light leading-tight text-4xl md:text-6xl mb-6">
            Christ?
          </h1>

          <p className="text-white/80 text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            This is the beginning of a brand new life. Here’s what just happened
            and how to grow strong in your walk with Jesus.
          </p>

          <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <p className="text-xs text-white/90">
              “If anyone is in Christ, he is a new creation.” – 2 Corinthians
              5:17
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* CONGRATS */}
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-brand-accent mx-auto mb-4" />
            <h2 className="font-heading text-4xl font-black text-brand-primary mb-4">
              Congratulations!
            </h2>
            <p className="text-brand-dark text-base leading-relaxed max-w-2xl mx-auto">
              You’ve made the most important decision of your life, choosing to
              follow Jesus. Heaven is rejoicing, and your journey with God has
              just begun.
            </p>
          </div>

          {/* WHAT HAPPENED */}
          <div className="bg-gradient-to-br from-brand-light to-white rounded-3xl p-10 border-2 border-brand-sky">
            <h2 className="font-heading text-3xl font-black text-brand-primary mb-8">
              What Just Happened?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Heart className="w-6 h-6" />,
                  title: "Your sins are forgiven",
                  desc: "God has wiped away your past completely.",
                },
                {
                  icon: <Crown className="w-6 h-6" />,
                  title: "You are now God’s child",
                  desc: "You belong to Him and have a new identity.",
                },
                {
                  icon: <Wind className="w-6 h-6" />,
                  title: "The Holy Spirit lives in you",
                  desc: "God is now with you, guiding and helping you.",
                },
                {
                  icon: <Gift className="w-6 h-6" />,
                  title: "You received eternal life",
                  desc: "Your future is secure in Christ.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-brand-sky"
                >
                  <div className="text-brand-accent mb-3">{item.icon}</div>
                  <h3 className="font-bold text-brand-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-dark-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* WHAT TO DO NEXT */}
          <div>
            <h2 className="font-heading text-4xl font-black text-brand-primary mb-6 text-center">
              What Should You Do Next?
            </h2>

            <div className="space-y-8">
              {/* STEP 1 */}
              <div className="bg-white border-2 rounded-3xl p-8">
                <div className="flex items-start gap-6">
                  <BookOpen className="w-8 h-8 text-brand-primary" />
                  <div>
                    <h3 className="font-bold text-xl mb-3">
                      Read Your Bible Daily
                    </h3>
                    <p className="text-brand-dark-light">
                      The Bible is God speaking to you. Start with the book of
                      John to understand Jesus better.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="bg-white border-2 rounded-3xl p-8">
                <div className="flex items-start gap-6">
                  <Hand className="w-8 h-8 text-brand-accent" />
                  <div>
                    <h3 className="font-bold text-xl mb-3">Pray Every Day</h3>
                    <p className="text-brand-dark-light">
                      Prayer is simply talking to God. Be honest, be real, and
                      build your relationship with Him daily.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="bg-white border-2 rounded-3xl p-8">
                <div className="flex items-start gap-6">
                  <Users className="w-8 h-8 text-brand-secondary" />
                  <div>
                    <h3 className="font-bold text-xl mb-3">
                      Join a Church Community
                    </h3>
                    <p className="text-brand-dark-light">
                      You were not meant to walk alone. Connect with other
                      believers and grow together.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 4 */}
              <div className="bg-white border-2 rounded-3xl p-8">
                <div className="flex items-start gap-6">
                  <Building className="w-8 h-8 text-brand-primary" />
                  <div>
                    <h3 className="font-bold text-xl mb-3">
                      Get Planted in Church
                    </h3>
                    <p className="text-brand-dark-light">
                      Attend services regularly, listen to teachings, and stay
                      rooted in God’s house.
                    </p>
                  </div>
                </div>
              </div>

              {/* STEP 5 */}
              <div className="bg-white border-2 rounded-3xl p-8">
                <div className="flex items-start gap-6">
                  <Footprints className="w-8 h-8 text-brand-accent" />
                  <div>
                    <h3 className="font-bold text-xl mb-3">
                      Start Living for Christ
                    </h3>
                    <p className="text-brand-dark-light">
                      Your life will begin to change. Follow Jesus daily in your
                      decisions, actions, and lifestyle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-accent rounded-3xl p-10 text-white text-center">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-4" />

            <h2 className="font-heading text-3xl font-black mb-4">
              Take Your Next Step
            </h2>

            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              We'd love to walk this journey with you. Join our church family
              and grow in your faith.
            </p>

            <Link
              href="/newcomer"
              className="inline-block px-8 py-4 bg-white text-brand-primary font-bold rounded-xl"
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

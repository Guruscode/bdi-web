'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Share2, Mail } from 'lucide-react'

export function FounderSpotlightSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/gift-okoh.jpg"
                alt="Gift Okoh, Founder"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent"></div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-6"
          >
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Meet Our Founder</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Gift Okoh</h2>
            </div>

            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                Gift Okoh is a passionate advocate for science education and career development. With a background in science and a vision for empowering the next generation, she founded Beyond Degree Initiative to bridge the gap between academic science and diverse career opportunities.
              </p>

              <p>
                Her mission is simple yet powerful: to create a community where science professionals feel supported, inspired, and equipped to build meaningful careers that extend far beyond traditional academic paths.
              </p>

              <p>
                When not building community connections, Gift enjoys mentoring young scientists, exploring innovative approaches to science communication, and advocating for diversity in STEM fields.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Share2 size={20} />
              </a>
              <a
                href="mailto:contact@beyonddegree.org"
                className="p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                Learn More About Our Mission
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

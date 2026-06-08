'use client'

import { motion } from 'framer-motion'

export function MissionSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Beyond Degree Initiative is dedicated to empowering science students, graduates, researchers, and young professionals to build fulfilling careers that extend far beyond traditional academic paths. We create spaces for meaningful connections, shared learning, and collaborative innovation.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            Whether you&apos;re exploring entrepreneurship, transitioning industries, or scaling your impact, our community provides the support, mentorship, and network you need to thrive.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

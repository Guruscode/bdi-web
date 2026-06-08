'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'

export function CTASection() {
  return (
    <section id="join" className="py-16 sm:py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-y border-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Ready to Thrive Beyond Your Degree?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Join hundreds of ambitious science professionals building meaningful careers and making an impact.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
            >
              Join Community Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all"
            >
              Explore Events
            </Link>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-muted-foreground mb-4">Have questions? We&apos;d love to hear from you.</p>
            <div className="flex gap-4 justify-center">
              <a
                href="mailto:contact@beyonddegree.org"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white border border-border text-foreground hover:border-primary hover:bg-primary/5 transition-colors font-medium"
              >
                <Mail size={18} />
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

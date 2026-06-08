'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    number: '200+',
    label: 'Active Members',
    description: 'Growing community of science professionals',
  },
  {
    number: '10+',
    label: 'Events Hosted',
    description: 'Webinars, workshops, and networking events',
  },
  {
    number: '1',
    label: 'Countries',
    description: 'Global reach across multiple continents',
  },
  {
    number: '95%',
    label: 'Satisfaction Rate',
    description: 'Members report positive career impact',
  },
]

export function ImpactStatsSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforming careers and building the future of science professionals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-white border border-border hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">{stat.number}</p>
              <p className="text-lg font-semibold text-foreground mb-1">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

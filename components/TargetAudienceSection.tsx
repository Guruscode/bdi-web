'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Users, Beaker, Briefcase } from 'lucide-react'

const audiences = [
  {
    icon: GraduationCap,
    title: 'Science Students',
    description: 'Explore career possibilities while still studying and build your professional network',
  },
  {
    icon: Users,
    title: 'Recent Graduates',
    description: 'Navigate your early career with mentorship and connections from experienced professionals',
  },
  {
    icon: Beaker,
    title: 'Researchers',
    description: 'Collaborate on projects and discover entrepreneurial opportunities in research',
  },
  {
    icon: Briefcase,
    title: 'Young Professionals',
    description: 'Advance your career and explore diverse paths within and beyond science',
  },
]

export function TargetAudienceSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Who Is This For?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond Degree is built for ambitious science professionals at every stage of their journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-white border border-border text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{audience.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{audience.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

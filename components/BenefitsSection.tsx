'use client'

import { motion } from 'framer-motion'
import { Users, Lightbulb, Briefcase, BookOpen, Network, TrendingUp } from 'lucide-react'

const benefits = [
  {
    icon: Users,
    title: 'Global Community',
    description: 'Connect with 200+ like-minded professionals across 1+ countries',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Hub',
    description: 'Access resources and collaborate on groundbreaking projects',
  },
  {
    icon: Briefcase,
    title: 'Career Development',
    description: 'Build skills and explore diverse career paths in science and beyond',
  },
  {
    icon: BookOpen,
    title: 'Learning Opportunities',
    description: 'Participate in workshops, webinars, and mentorship programs',
  },
  {
    icon: Network,
    title: 'Strong Network',
    description: 'Build lasting relationships with industry leaders and peers',
  },
  {
    icon: TrendingUp,
    title: 'Growth Support',
    description: 'Access tools and guidance to accelerate your professional growth',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function BenefitsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Why Join Beyond Degree?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the benefits of joining our thriving community of scientists and innovators
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                variants={item}
                className="p-6 rounded-xl bg-white border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { UserPlus, MessageSquare, Calendar, Star } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: UserPlus,
    title: 'Join the Community',
    description: 'Sign up and create your profile to connect with fellow science professionals',
  },
  {
    number: 2,
    icon: MessageSquare,
    title: 'Engage & Network',
    description: 'Participate in discussions, share ideas, and build meaningful relationships',
  },
  {
    number: 3,
    icon: Calendar,
    title: 'Attend Events',
    description: 'Join webinars, workshops, and networking events tailored to your interests',
  },
  {
    number: 4,
    icon: Star,
    title: 'Grow & Succeed',
    description: 'Advance your career with mentorship, collaborations, and new opportunities',
  },
]

export function HowItWorksSection() {
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started on your Beyond Degree journey in four simple steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Step Number Circle */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl mb-4 relative z-10 shadow-lg">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

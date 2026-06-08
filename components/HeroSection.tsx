'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -25, 0],
      rotate: [0, 3, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const pulseVariants = {
    animate: {
      boxShadow: [
        '0 0 20px 0px rgba(255, 107, 53, 0.5)',
        '0 0 40px 10px rgba(255, 107, 53, 0.2)',
        '0 0 20px 0px rgba(255, 107, 53, 0.5)',
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-background">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              {/* <motion.p className="text-primary font-bold text-sm tracking-widest uppercase">
                Welcome to Beyond Degree
              </motion.p> */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance text-foreground leading-tight">
                Your Journey to Beyond Degree
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Join a thriving global community of ambitious students and young professionals. Network, learn, and grow beyond the classroom with peers from every background.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="https://chat.whatsapp.com/JLsBmd5XbvC0Lye2u0vCsg?mode=gi_t"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap shadow-lg hover:shadow-2xl hover:scale-105"
              >
                Join Our Community
              </Link>
              <Link
                href="#about"
                className="px-8 py-4 border-2 border-foreground text-foreground rounded-xl font-bold hover:bg-foreground hover:text-background transition-all duration-300 inline-flex items-center justify-center hover:scale-105"
              >
                Learn More
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-8 pt-8 lg:pt-4">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-primary">200+</div>
                <p className="text-sm text-muted-foreground font-medium">Active Members</p>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-primary">10+</div>
                <p className="text-sm text-muted-foreground font-medium">Monthly Events</p>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-primary">1</div>
                <p className="text-sm text-muted-foreground font-medium">Country</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image - Highly Animated */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end perspective"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative w-full max-w-sm"
            >
              {/* Glow effect background */}
              <motion.div
                variants={pulseVariants}
                animate="animate"
                className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-primary to-primary/50 blur-2xl opacity-40 pointer-events-none"
              />

              {/* Image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/30 bg-white backdrop-blur-sm">
                <motion.div
                  animate={{
                    rotateY: [0, 10, 0],
                    rotateX: [0, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-full h-full"
                  style={{ transformPerspective: '1000px' }}
                >
                  <Image
                    src="/images/gift-okoh.jpg"
                    alt="Gift Okoh - Founder"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </motion.div>

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating accent dots */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.2,
                }}
                className="absolute -top-4 -right-4 w-4 h-4 bg-primary rounded-full blur-sm"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.4,
                }}
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/60 rounded-full blur-md"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

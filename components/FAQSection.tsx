'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'Who can join Beyond Degree?',
    answer: 'Beyond Degree is open to science students, recent graduates, researchers, and young professionals who are interested in exploring diverse career paths and connecting with like-minded individuals.',
  },
  {
    question: 'Is membership free?',
    answer: 'Yes! Basic community membership is completely free. We also offer premium membership options with additional benefits and exclusive events.',
  },
  {
    question: 'How often are events held?',
    answer: 'We host a variety of events regularly - from weekly discussion groups to monthly webinars and quarterly networking events. Check our Events page for the full schedule.',
  },
  {
    question: 'What if I&apos;m not sure about my career path?',
    answer: 'That&apos;s exactly what Beyond Degree is for! Our mentorship programs and community discussions are designed to help you explore options and find clarity on your professional journey.',
  },
  {
    question: 'How can I contribute to the community?',
    answer: 'There are many ways to get involved - share your expertise in discussions, mentor newer members, speak at events, or help organize community activities. We encourage active participation!',
  },
  {
    question: 'Is there a community code of conduct?',
    answer: 'Yes, we maintain a Community Code of Conduct to ensure a respectful, inclusive, and supportive environment for all members. It&apos;s available on our Community Guidelines page.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Everything you need to know about Beyond Degree</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
              >
                <span className="font-semibold text-foreground">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-primary transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-4 bg-muted/20 border-t border-border"
                >
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

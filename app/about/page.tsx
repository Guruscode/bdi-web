import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { FounderSpotlightSection } from '@/components/FounderSpotlightSection'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-muted/30 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
                About Beyond Degree
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
                Empowering science professionals to build meaningful careers beyond traditional academic paths.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our Mission</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Beyond Degree Initiative exists to bridge the gap between academic science and the diverse career opportunities available to science professionals. We believe that a degree in science is just the beginning of a remarkable journey.
                  </p>
                  <p>
                    Our mission is to create a supportive, inclusive community where science students, graduates, researchers, and young professionals can explore diverse career paths, build meaningful connections, and unlock their full potential.
                  </p>
                  <p>
                    Whether you&apos;re interested in entrepreneurship, industry, policy, education, or any other field, we&apos;re here to help you navigate your unique career journey.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">What We Believe</h3>
                  <ul className="space-y-3">
                    {[
                      'Science education opens doors to countless possibilities',
                      'Community and mentorship are transformative',
                      'Diversity strengthens innovation and impact',
                      'Every science professional deserves support and opportunity',
                      'Collaboration creates greater impact than individual effort',
                    ].map((belief, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-primary font-bold">✓</span>
                        <span className="text-muted-foreground">{belief}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Spotlight */}
        <FounderSpotlightSection />

        {/* Values Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Inclusivity',
                  description:
                    'We welcome science professionals from all backgrounds, experiences, and career stages. Everyone has value to contribute.',
                },
                {
                  title: 'Empowerment',
                  description:
                    'We empower our members to take ownership of their careers and support them in achieving their goals.',
                },
                {
                  title: 'Collaboration',
                  description:
                    'We believe in the power of collaboration. Together, we accomplish more than we ever could alone.',
                },
                {
                  title: 'Impact',
                  description:
                    'We are committed to creating meaningful impact in the science community and beyond.',
                },
                {
                  title: 'Excellence',
                  description:
                    'We strive for excellence in everything we do, from our events to our community interactions.',
                },
                {
                  title: 'Growth',
                  description:
                    'We foster continuous learning and growth, helping members develop new skills and perspectives.',
                },
              ].map((value, i) => (
                <div key={i} className="p-6 rounded-xl bg-white border border-border hover:border-primary/50 hover:shadow-lg transition-all">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our Impact</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Making a difference in the lives of science professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: '200+', label: 'Community Members' },
                { number: '50+', label: 'Events Hosted' },
                { number: '1', label: 'Countries Represented' },
                { number: '95%', label: 'Member Satisfaction' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-white border border-border">
                  <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Join Our Community</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Whether you&apos;re just starting your science career or well-established in your field, there&apos;s a place for you here.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
              >
                Get Started
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all"
              >
                Explore Events
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

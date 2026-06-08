'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Share2, Share } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/bd-logo.png"
                alt="Beyond Degree Initiative"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="font-bold text-foreground">Beyond Degree</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering science students and professionals to thrive beyond their degrees.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex gap-4">
              <a
                href="mailto:contact@beyonddegree.org"
                className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-border transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-border transition-colors"
                aria-label="LinkedIn"
              >
                <Share2 size={20} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-border transition-colors"
                aria-label="Twitter"
              >
                <Share size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Beyond Degree Initiative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

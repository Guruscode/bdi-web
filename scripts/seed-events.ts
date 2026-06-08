import { createClient } from '@libsql/client'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const envPath = path.resolve(process.cwd(), '.env.local')
const envRaw = fs.readFileSync(envPath, 'utf-8')
const env: Record<string, string> = {}

for (const line of envRaw.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eqIdx = trimmed.indexOf('=')
  if (eqIdx === -1) continue
  const key = trimmed.slice(0, eqIdx).trim()
  let value = trimmed.slice(eqIdx + 1).trim()
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1)
  }
  env[key] = value
}

// Current year for dates
const year = new Date().getFullYear()

const events = [
  {
    title: 'THE DEGREE ILLUSION',
    slug: 'the-degree-illusion',
    description: 'Why certificates no longer guarantee clarity, fulfilment, or relevance in today\'s rapidly evolving career landscape. A deep dive into the gap between academic credentials and real-world career success.',
    date: `${year}-01-25`,
    time: '3:00 PM UTC',
    type: 'Discussion',
    category: 'career',
    published: 1,
  },
  {
    title: 'SKILLS, LEVERAGE & EMPLOYABILITY',
    slug: 'skills-leverage-employability',
    description: 'What the market actually rewards in a digital, AI-driven economy. Understanding the difference between hard skills, soft skills, and the leverage that makes you indispensable.',
    date: `${year}-03-22`,
    time: '3:00 PM UTC',
    type: 'Discussion',
    category: 'skills',
    published: 1,
  },
  {
    title: 'POWER, SYSTEMS & HOW OPPORTUNITY REALLY MOVES',
    slug: 'power-systems-opportunity',
    description: 'Why merit alone is not enough — and how positioning, networks, and understanding systems play a crucial role in career advancement.',
    date: `${year}-04-26`,
    time: '3:00 PM UTC',
    type: 'Discussion',
    category: 'career',
    published: 1,
  },
  {
    title: 'IDENTITY BEYOND JOB TITLES',
    slug: 'identity-beyond-job-titles',
    description: 'Who you are when your degree, role, or plan no longer defines you. Exploring identity, purpose, and self-worth beyond professional labels.',
    date: `${year}-05-24`,
    time: '3:00 PM UTC',
    type: 'Discussion',
    category: 'inspiration',
    published: 1,
  },
  {
    title: 'CAREER CHOICES IN THE AGE OF NOISE',
    slug: 'career-choices-age-of-noise',
    description: 'Escaping timelines, comparison culture, and social pressure. How to make authentic career decisions in a world of endless options and opinions.',
    date: `${year}-06-28`,
    time: '3:00 PM UTC',
    type: 'Discussion',
    category: 'career',
    published: 1,
  },
  {
    title: 'FAILURE, DELAYS & THE HIDDEN CAREER SEASON',
    slug: 'failure-delays-hidden-career-season',
    description: 'How rejection and uncertainty actually shape strong futures. Reframing setbacks as essential parts of the career journey.',
    date: `${year}-07-26`,
    time: '3:00 PM UTC',
    type: 'Discussion',
    category: 'career',
    published: 1,
  },
  {
    title: '1-Day Freelancing Webinar',
    slug: 'freelancing-webinar',
    description: 'Get hands-on with freelancing. Learn the practical skills, tools, and strategies to start and grow your freelance career in the digital economy.',
    date: `${year}-07-21`,
    time: '10:00 AM UTC',
    type: 'Workshop',
    category: 'skills',
    published: 1,
  },
  {
    title: 'The Beyond Degree Conversation',
    slug: 'beyond-degree-conversation',
    description: 'A special community conversation bringing together science professionals to discuss career transitions, opportunities, and building meaningful careers beyond traditional academic paths.',
    date: `${year}-07-29`,
    time: '4:00 PM UTC',
    type: 'Networking',
    category: 'networking',
    published: 1,
  },
]

async function main() {
  const turso = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  })

  // Get admin user ID
  const adminResult = await turso.execute({
    sql: 'SELECT id FROM users LIMIT 1',
  })
  const adminId = (adminResult.rows[0]?.id as number) || 1

  let inserted = 0
  let skipped = 0

  for (const event of events) {
    // Check if event already exists
    const existing = await turso.execute({
      sql: 'SELECT id FROM events WHERE slug = ?',
      args: [event.slug],
    })

    if (existing.rows.length > 0) {
      console.log(`⏭️  Skipped (exists): ${event.title}`)
      skipped++
      continue
    }

    await turso.execute({
      sql: `INSERT INTO events (title, slug, description, date, time, type, category, published, author_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [event.title, event.slug, event.description, event.date, event.time, event.type, event.category, event.published, adminId],
    })

    console.log(`✅ Inserted: ${event.title} — ${event.date}`)
    inserted++
  }

  console.log(`\n🎉 Done! ${inserted} inserted, ${skipped} skipped`)
  process.exit(0)
}

main().catch((error) => {
  console.error('❌ Seed failed:', error)
  process.exit(1)
})

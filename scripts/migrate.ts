import { createClient } from '@libsql/client'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const dotenvPath = path.resolve(process.cwd(), '.env.local')
const envContent = fs.readFileSync(dotenvPath, 'utf-8')
const envVars = Object.fromEntries(
  envContent
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('#'))
    .map((line) => {
      const [key, ...rest] = line.split('=')
      return [key.trim(), rest.join('=').trim()]
    })
)

async function main() {
  // Connect to Turso
  const turso = createClient({
    url: envVars.TURSO_DATABASE_URL,
    authToken: envVars.TURSO_AUTH_TOKEN,
  })

  // Run migration
  const migrationPath = path.resolve(process.cwd(), 'lib/migrations/001_initial.sql')
  const migrationSql = fs.readFileSync(migrationPath, 'utf-8')

  // Split by semicolons and execute each statement
  const statements = migrationSql
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  for (const statement of statements) {
    await turso.execute(statement)
    console.log(`✅ Executed: ${statement.substring(0, 60)}...`)
  }

  // Seed admin user
  const email = envVars.ADMIN_EMAIL
  const password = envVars.ADMIN_PASSWORD

  const existing = await turso.execute({
    sql: 'SELECT id FROM users WHERE email = ?',
    args: [email],
  })

  if (existing.rows.length === 0) {
    const passwordHash = await bcrypt.hash(password, 12)
    await turso.execute({
      sql: 'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)',
      args: [email, passwordHash, 'Admin'],
    })
    console.log(`✅ Admin user created: ${email}`)
  } else {
    console.log(`ℹ️  Admin user already exists: ${email}`)
  }

  console.log('\n🎉 Migration complete!')
  process.exit(0)
}

main().catch((error) => {
  console.error('❌ Migration failed:', error)
  process.exit(1)
})

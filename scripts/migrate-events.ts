import { createClient } from '@libsql/client'
import fs from 'fs'
import path from 'path'

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

async function main() {
  const turso = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  })

  const migrationPath = path.resolve(process.cwd(), 'lib/migrations/003_events.sql')
  const migrationSql = fs.readFileSync(migrationPath, 'utf-8')

  const statements = migrationSql
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  for (const statement of statements) {
    await turso.execute(statement)
    console.log(`✅ Executed: ${statement.substring(0, 60)}...`)
  }

  console.log('\n🎉 Events migration complete!')
  process.exit(0)
}

main().catch((error) => {
  console.error('❌ Migration failed:', error)
  process.exit(1)
})

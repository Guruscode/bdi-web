import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { turso } from './db'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)
const SESSION_COOKIE = 'admin_session'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createSession(userId: number, email: string) {
  const token = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!token) return null

  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return {
      userId: verified.payload.userId as number,
      email: verified.payload.email as string,
    }
  } catch {
    return null
  }
}

export async function authenticateUser(email: string, password: string) {
  const result = await turso.execute({
    sql: 'SELECT id, email, password_hash FROM users WHERE email = ?',
    args: [email],
  })

  const user = result.rows[0]
  if (!user) return null

  const valid = await verifyPassword(password, user.password_hash as string)
  if (!valid) return null

  return { id: user.id as number, email: user.email as string }
}

export async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL!
  const password = process.env.ADMIN_PASSWORD!

  const existing = await turso.execute({
    sql: 'SELECT id FROM users WHERE email = ?',
    args: [email],
  })

  if (existing.rows.length > 0) return

  const passwordHash = await hashPassword(password)
  await turso.execute({
    sql: 'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)',
    args: [email, passwordHash, 'Admin'],
  })

  console.log(`✅ Admin user created: ${email}`)
}

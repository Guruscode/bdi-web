'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { turso } from './db'
import { getSession } from './auth'

export type Category = {
  id: number
  name: string
  slug: string
}

export type BlogPost = {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  cover_image: string | null
  published: number
  created_at: string
  updated_at: string
  author_id: number
  categories?: Category[]
}

export async function getCategories() {
  const result = await turso.execute({
    sql: 'SELECT id, name, slug FROM categories ORDER BY name ASC',
  })
  return result.rows as unknown as Category[]
}

export async function getPublishedPosts(categorySlug?: string) {
  let sql: string
  let args: (string | number)[] = []

  if (categorySlug) {
    sql = `SELECT DISTINCT bp.id, bp.title, bp.slug, bp.excerpt, bp.cover_image, bp.created_at, bp.updated_at
           FROM blog_posts bp
           LEFT JOIN post_categories pc ON bp.id = pc.post_id
           LEFT JOIN categories c ON pc.category_id = c.id
           WHERE bp.published = 1 AND c.slug = ?
           ORDER BY bp.created_at DESC`
    args = [categorySlug]
  } else {
    sql = `SELECT id, title, slug, excerpt, cover_image, created_at, updated_at
           FROM blog_posts
           WHERE published = 1
           ORDER BY created_at DESC`
  }

  const result = await turso.execute({ sql, args })
  const posts = result.rows as unknown as BlogPost[]

  // Fetch categories for each post
  for (const post of posts) {
    post.categories = await getPostCategories(post.id)
  }

  return posts
}

export async function getPostCategories(postId: number) {
  const result = await turso.execute({
    sql: `SELECT c.id, c.name, c.slug
          FROM categories c
          INNER JOIN post_categories pc ON c.id = pc.category_id
          WHERE pc.post_id = ?
          ORDER BY c.name`,
    args: [postId],
  })
  return result.rows as unknown as Category[]
}

export async function getPostBySlug(slug: string) {
  const result = await turso.execute({
    sql: `SELECT bp.*, u.name as author_name
          FROM blog_posts bp
          LEFT JOIN users u ON bp.author_id = u.id
          WHERE bp.slug = ? AND bp.published = 1`,
    args: [slug],
  })
  const post = result.rows[0] as unknown as (BlogPost & { author_name: string }) | undefined
  if (post) {
    post.categories = await getPostCategories(post.id)
  }
  return post
}

export async function getAllPosts() {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const result = await turso.execute({
    sql: `SELECT bp.*, u.name as author_name
          FROM blog_posts bp
          LEFT JOIN users u ON bp.author_id = u.id
          ORDER BY bp.created_at DESC`,
  })
  const posts = result.rows as unknown as (BlogPost & { author_name: string })[]
  for (const post of posts) {
    post.categories = await getPostCategories(post.id)
  }
  return posts
}

export async function getPostById(id: number) {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const result = await turso.execute({
    sql: 'SELECT * FROM blog_posts WHERE id = ?',
    args: [id],
  })
  const post = result.rows[0] as unknown as BlogPost | undefined
  if (post) {
    post.categories = await getPostCategories(post.id)
  }
  return post
}

export async function createPost(formData: FormData) {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string || null
  const cover_image = formData.get('cover_image') as string || null
  const published = formData.get('published') === 'on' ? 1 : 0
  const categoryIds = formData.getAll('categories') as string[]

  const result = await turso.execute({
    sql: `INSERT INTO blog_posts (title, slug, content, excerpt, cover_image, published, author_id)
          VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id`,
    args: [title, slug, content, excerpt, cover_image, published, session.userId],
  })

  const postId = result.rows[0]?.id as number

  // Insert categories
  if (categoryIds.length > 0 && postId) {
    for (const categoryId of categoryIds) {
      await turso.execute({
        sql: 'INSERT OR IGNORE INTO post_categories (post_id, category_id) VALUES (?, ?)',
        args: [postId, parseInt(categoryId)],
      })
    }
  }

  revalidatePath('/blog')
  revalidatePath('/admin/blog')
  redirect('/admin/blog')
}

export async function updatePost(id: number, formData: FormData) {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string || null
  const cover_image = formData.get('cover_image') as string || null
  const published = formData.get('published') === 'on' ? 1 : 0
  const categoryIds = formData.getAll('categories') as string[]

  // Update the post
  await turso.execute({
    sql: `UPDATE blog_posts
          SET title = ?, slug = ?, content = ?, excerpt = ?, cover_image = ?, published = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`,
    args: [title, slug, content, excerpt, cover_image, published, id],
  })

  // Update categories: delete old, insert new
  await turso.execute({
    sql: 'DELETE FROM post_categories WHERE post_id = ?',
    args: [id],
  })

  for (const categoryId of categoryIds) {
    await turso.execute({
      sql: 'INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)',
      args: [id, parseInt(categoryId)],
    })
  }

  revalidatePath('/blog')
  revalidatePath('/blog/' + slug)
  revalidatePath('/admin/blog')
  redirect('/admin/blog')
}

export async function deletePost(id: number) {
  const session = await getSession()
  if (!session) redirect('/admin/login')

  await turso.execute({
    sql: 'DELETE FROM blog_posts WHERE id = ?',
    args: [id],
  })

  revalidatePath('/blog')
  revalidatePath('/admin/blog')
}

import { getPostById, getCategories } from '@/lib/blog'
import { notFound } from 'next/navigation'
import EditPostForm from './EditPostForm'

export const dynamic = 'force-dynamic'

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostById(parseInt(id))

  if (!post) {
    notFound()
  }

  const categories = await getCategories()

  return <EditPostForm post={post} categories={categories} />
}

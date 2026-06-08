import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getPublishedPosts, getCategories } from '@/lib/blog'
import Link from 'next/link'
import { Calendar, ArrowRight, Tag } from 'lucide-react'
import type { Category } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const posts = await getPublishedPosts(category)
  const categories = await getCategories()

  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-muted/30 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-balance">
                Our Blog
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
                Insights, stories, and resources from the Beyond Degree community to help you navigate your career journey.
              </p>
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  !category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white text-foreground border border-border hover:border-primary/50'
                }`}
              >
                All Posts
              </Link>
              {categories.map((cat: Category) => (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.slug}`}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    category === cat.slug
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white text-foreground border border-border hover:border-primary/50'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">No posts yet</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {category
                    ? 'No posts found in this category. Try another category.'
                    : 'Check back soon for new articles, insights, and stories from our community.'}
                </p>
                {category && (
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                  >
                    View all posts <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block rounded-xl bg-white border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    {/* Cover Image */}
                    {post.cover_image ? (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/30">BD</span>
                      </div>
                    )}

                    <div className="p-6 space-y-3">
                      {/* Categories */}
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {post.categories.map((cat) => (
                            <span
                              key={cat.id}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-primary/5 text-primary"
                            >
                              <Tag size={10} />
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        <span>
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Read More */}
                      <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

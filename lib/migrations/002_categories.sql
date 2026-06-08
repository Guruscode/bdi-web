-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create post_categories junction table for many-to-many
CREATE TABLE IF NOT EXISTS post_categories (
  post_id INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_post_categories_post_id ON post_categories(post_id);
CREATE INDEX IF NOT EXISTS idx_post_categories_category_id ON post_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Seed default categories
INSERT OR IGNORE INTO categories (name, slug) VALUES ('Career', 'career');
INSERT OR IGNORE INTO categories (name, slug) VALUES ('Entrepreneurship', 'entrepreneurship');
INSERT OR IGNORE INTO categories (name, slug) VALUES ('Education', 'education');
INSERT OR IGNORE INTO categories (name, slug) VALUES ('Research', 'research');
INSERT OR IGNORE INTO categories (name, slug) VALUES ('Community', 'community');
INSERT OR IGNORE INTO categories (name, slug) VALUES ('Skills', 'skills');
INSERT OR IGNORE INTO categories (name, slug) VALUES ('Inspiration', 'inspiration');

import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage?: string;
  coverImage?: string;
  category: string;
  tags: string[];
  featured: boolean;
  publishedAt: Date;
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxLength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxLength: [500, 'Excerpt cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxLength: [100, 'Author name cannot exceed 100 characters']
  },
  authorRole: {
    type: String,
    required: [true, 'Author role is required'],
    trim: true,
    maxLength: [100, 'Author role cannot exceed 100 characters']
  },
  authorImage: {
    type: String,
    trim: true
  },
  coverImage: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    maxLength: [50, 'Category cannot exceed 50 characters']
  },
  tags: {
    type: [String],
    required: [true, 'At least one tag is required'],
    validate: {
      validator: function(v: string[]) {
        return v.length > 0;
      },
      message: 'At least one tag is required'
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    required: [true, 'Published date is required'],
    default: Date.now
  },
  readingTime: {
    type: Number,
    default: 5
  }
}, {
  timestamps: true
});

// Create slug from title if not provided
BlogSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;

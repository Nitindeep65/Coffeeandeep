// Server-side data fetching functions — runs on the server, data is ready before HTML is sent
import connectDB from '@/lib/mongodb/connect';
import Project from '@/lib/mongodb/models/Project';
import Blog from '@/lib/mongodb/models/Blog';

/**
 * Fetch all projects directly from MongoDB on the server.
 * No API round-trip needed — data is embedded in the initial HTML.
 */
export async function getProjects() {
  try {
    await connectDB();
    const projects = await Project.find({}).sort({ order: 1 }).lean();
    // Serialize MongoDB _id and dates to plain JSON-safe objects
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error('Server: Error fetching projects:', error);
    return [];
  }
}

/**
 * Fetch all blogs directly from MongoDB on the server.
 */
export async function getBlogs() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ publishedAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error('Server: Error fetching blogs:', error);
    return [];
  }
}

import { Metadata } from 'next';
import BlogList from '@/components/blog-list';
import { getBlogs } from '@/lib/data';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog | Tech Insights',
  description: 'Exploring cutting-edge technologies shaping tomorrow\'s digital landscape',
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <BlogList initialBlogs={blogs} />
    </main>
  );
}

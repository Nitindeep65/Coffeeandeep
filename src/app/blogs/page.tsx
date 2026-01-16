import { Metadata } from 'next';
import BlogList from '@/components/blog-list';

export const metadata: Metadata = {
  title: 'Blog | Tech Insights',
  description: 'Exploring cutting-edge technologies shaping tomorrow\'s digital landscape',
};

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <BlogList />
    </main>
  );
}

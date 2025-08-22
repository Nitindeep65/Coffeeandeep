import Navbar from '@/components/navbar';
import AllProjects from '@/components/all-projects';

export const metadata = {
  title: "All Projects | Developer Portfolio",
  description: "View all my projects and development work",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <AllProjects />
    </>
  );
}

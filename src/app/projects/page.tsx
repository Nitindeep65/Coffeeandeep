import Navbar from '@/components/navbar';
import AllProjects from '@/components/all-projects';
import { getProjects } from '@/lib/data';

export const revalidate = 60;

export const metadata = {
  title: "All Projects | Developer Portfolio",
  description: "View all my projects and development work",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <AllProjects initialProjects={projects} />
    </>
  );
}

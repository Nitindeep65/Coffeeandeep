import { Metadata } from 'next';
import BlogDetail from '@/components/blog-detail';
import connectDB from '@/lib/mongodb/connect';
import Blog from '@/lib/mongodb/models/Blog';
import { notFound } from 'next/navigation';

interface BlogDocument {
  _id: { toString: () => string };
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
}

interface StaticBlog {
  _id: string;
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
  publishedAt: string;
  readingTime: number;
}

// Static blogs data - same as in blog.tsx
const staticBlogs: StaticBlog[] = [
  {
    _id: '1',
    title: 'Next-Gen AI: Transforming Business Operations',
    slug: 'next-gen-ai-transforming-business',
    excerpt: 'Exploring how artificial intelligence is revolutionizing the way businesses operate and make decisions in the modern digital landscape.',
    content: `The AI Revolution in Business

Artificial Intelligence is no longer a futuristic concept. It's here, and it's fundamentally changing how businesses operate. From automating routine tasks to providing deep insights through data analysis, AI is becoming an indispensable tool for modern enterprises.

Customer Experience

AI-powered chatbots and virtual assistants are transforming customer service. These systems can handle thousands of queries simultaneously, providing instant responses around the clock. Machine learning algorithms analyze customer behavior to deliver personalized experiences at scale.

Data-Driven Decision Making

Gone are the days of gut-feeling decisions. AI systems process vast amounts of data to identify patterns and trends that humans might miss. Predictive analytics help businesses anticipate market changes, optimize inventory, and forecast demand with unprecedented accuracy.

Process Automation

Robotic Process Automation combined with AI is eliminating repetitive tasks across industries. From invoice processing to HR onboarding, these intelligent systems free up human workers to focus on creative and strategic work.

Implementation Strategies

Successfully integrating AI requires a thoughtful approach. Start with clear business objectives and invest in data infrastructure and quality. Build cross-functional teams that combine domain expertise with technical skills. Begin with pilot projects before scaling, and prioritize ethical AI practices and transparency.

The Road Ahead

As AI technology continues to evolve, we'll see even more sophisticated applications. Natural Language Processing is enabling more natural human-machine interactions. Computer vision is opening new possibilities in quality control and security. The businesses that embrace these technologies today will be the leaders of tomorrow.

The key is not to view AI as a replacement for human intelligence, but as an amplifier of human capability. When humans and AI work together, the results are transformative.`,
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    authorImage: '/image/profile.jpg',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    category: 'AI',
    tags: ['AI', 'Business', 'Technology'],
    featured: true,
    publishedAt: new Date().toISOString(),
    readingTime: 8
  },
  {
    _id: '2',
    title: 'Exploring cost-effective cloud migration patterns and multi-cloud management',
    slug: 'cloud-migration-patterns',
    excerpt: 'A comprehensive guide to migrating your infrastructure to the cloud while optimizing costs and leveraging multi-cloud strategies.',
    content: `Why Cloud Migration Matters

In today's digital-first world, cloud migration isn't just about moving servers. It's about transforming how your organization operates. The cloud offers scalability, flexibility, and cost efficiencies that on-premise infrastructure simply cannot match.

Common Migration Patterns

There are six main approaches to consider when planning a migration. Rehost, often called lift and shift, moves applications as-is to the cloud. It's the fastest approach but may not fully leverage cloud benefits. Replatform involves making minor optimizations during migration, like moving to managed databases. Repurchase means switching to SaaS solutions, such as moving from an on-prem CRM to Salesforce. Refactor requires re-architecting applications to be cloud-native, which takes more effort but delivers maximum benefits. Retain keeps some workloads on-premise when it makes sense. Finally, retire decommissions applications that are no longer needed.

Multi-Cloud Strategy

A multi-cloud approach offers several advantages. You avoid vendor lock-in and can negotiate better pricing. You can use the best services from each provider. Geographic reach improves as you deploy closer to users worldwide. And resilience increases by reducing the risk of single-provider outages.

Cost Optimization Tips

Right-sizing is essential. Monitor usage and adjust instance sizes since most organizations are over-provisioned by 30-40%. Consider reserved instances by committing to 1-3 year terms for predictable workloads, saving up to 70%. Use spot instances for fault-tolerant workloads at up to 90% discount. Implement auto-scaling to match resources to demand rather than peak capacity.

Getting Started

Assess your current infrastructure and applications first. Define clear business objectives and success metrics. Start with low-risk, high-impact workloads. Build internal cloud expertise. Implement robust governance and security from day one.

The cloud journey is a marathon, not a sprint. Take it step by step, learn continuously, and optimize as you go.`,
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    category: 'Cloud',
    tags: ['Cloud', 'Migration', 'AWS', 'Azure', 'DevOps'],
    featured: false,
    publishedAt: new Date().toISOString(),
    readingTime: 6
  },
  {
    _id: '3',
    title: 'Implementing adaptive security frameworks for distributed workforces',
    slug: 'adaptive-security-frameworks',
    excerpt: 'How to build robust security systems that protect your organization in the era of remote work and distributed teams.',
    content: `The New Security Landscape

The traditional security perimeter has dissolved. With employees working from home, coffee shops, and co-working spaces around the world, the concept of inside and outside the network no longer applies. This demands a fundamental shift in how we approach security.

Zero Trust Architecture

The core principle is simple: never trust, always verify. Every user must prove their identity regardless of location. Only compliant, healthy devices get access. Users receive minimum permissions needed for their role. The network is divided into small zones to contain breaches. And real-time analysis monitors user behavior and network traffic continuously.

Building Your Framework

Start by assessing your current state. Inventory all assets, applications, and data flows. Identify critical business processes and map current security controls.

Next, define your security policies. Create role-based access policies. Establish device compliance requirements. Set data classification standards.

Then implement technical controls. Deploy identity and access management. Implement multi-factor authentication. Set up endpoint detection and response. Enable secure access service edge.

Finally, train your people. Security is only as strong as its weakest link. Regular training should cover phishing awareness, password hygiene, data handling procedures, and incident reporting.

Adaptive Response

Modern security frameworks must adapt in real-time. Risk-based authentication increases verification for unusual behavior. Automated threat response contains threats before they spread. Continuous compliance ensures regular audits and policy updates.

The Human Element

Technology alone isn't enough. Create a security-conscious culture where everyone understands their role in security. Reporting incidents should be encouraged, not punished. Security should be seen as an enabler, not a blocker.

Remember that security is a journey, not a destination. Stay vigilant and stay adaptive.`,
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    category: 'Security',
    tags: ['Security', 'Remote Work', 'Zero Trust', 'Cybersecurity'],
    featured: false,
    publishedAt: new Date().toISOString(),
    readingTime: 5
  },
  {
    _id: '4',
    title: 'Reducing latency in smart city deployments through fog computing',
    slug: 'fog-computing-smart-cities',
    excerpt: 'How edge and fog computing are enabling real-time processing for smart city applications, from traffic management to emergency response.',
    content: `The Smart City Challenge

Smart cities generate enormous amounts of data every second from traffic sensors, surveillance cameras, environmental monitors, and smart meters. Sending all this data to centralized cloud servers creates unacceptable latency for time-critical applications.

Enter Fog Computing

Fog computing extends cloud capabilities to the edge of the network, processing data closer to where it's generated. Think of it as a fog that sits between the cloud and IoT devices.

The benefits for smart cities are significant. Processing achieves ultra-low latency, measured in milliseconds rather than seconds. Bandwidth efficiency improves since only relevant data goes to the cloud. Reliability increases because operations continue even when cloud connectivity is lost. And privacy improves by keeping sensitive data local.

Real-World Applications

In traffic management, fog nodes at intersections analyze traffic patterns in real-time, adjusting signal timing to optimize flow. Response time drops from seconds to milliseconds, reducing congestion and emissions.

For emergency response, where seconds matter, fog computing enables instant video analysis for incident detection, automatic dispatch optimization, and real-time coordination between emergency services.

Environmental monitoring uses distributed sensors to track air quality, noise levels, and weather conditions. Fog nodes process data locally, triggering immediate alerts when thresholds are exceeded.

Smart lighting allows intelligent streetlights to adjust brightness based on pedestrian and vehicle traffic, saving energy while maintaining safety.

Architecture Considerations

A hierarchical processing approach works best. At the device level, basic filtering and aggregation occurs. At the fog level, real-time analytics and local decisions happen. At the cloud level, historical analysis and machine learning training take place.

Key technologies include containerization with Docker and Kubernetes for portable workloads, message queuing with MQTT and Kafka for reliable data streams, and edge AI for local inference.

Implementation Challenges

Several challenges must be addressed. Heterogeneous infrastructure means dealing with diverse devices and protocols. Security requires protecting a distributed attack surface. Management of thousands of fog nodes needs automated orchestration. And power budgets are limited on many edge devices.

The Future

As 5G networks roll out and edge hardware becomes more powerful, fog computing will enable even more ambitious smart city applications. Autonomous vehicles, augmented reality, and real-time city-wide optimization are just the beginning.

The smart cities of tomorrow are being built today, one fog node at a time.`,
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    coverImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80',
    category: 'IoT',
    tags: ['IoT', 'Smart Cities', 'Edge Computing', 'Fog Computing'],
    featured: false,
    publishedAt: new Date().toISOString(),
    readingTime: 7
  },
  {
    _id: '5',
    title: 'Enterprise applications of distributed ledger technology in supply chains',
    slug: 'blockchain-supply-chains',
    excerpt: 'Discover how blockchain and distributed ledger technology are revolutionizing supply chain transparency, traceability, and efficiency.',
    content: `Beyond Cryptocurrency

While blockchain gained fame through Bitcoin, its most transformative applications may be in enterprise supply chains. Distributed ledger technology offers something supply chains desperately need: a single source of truth that all parties can trust.

The Supply Chain Problem

Modern supply chains are incredibly complex. They involve multiple parties including suppliers, manufacturers, logistics providers, and retailers. They span cross-border transactions. They rely on paper-based processes prone to errors. They suffer from limited visibility into upstream and downstream activities. And counterfeit goods cost billions annually.

How Blockchain Helps

Immutable record keeping means once data is recorded on the blockchain, it cannot be altered. This creates an auditable trail from raw materials to end consumer.

Shared visibility ensures all authorized parties see the same data in real-time, eliminating information silos and disputes.

Smart contracts enable automated execution of business logic. They can release payment when goods are delivered, trigger alerts when conditions are violated, and automatically update inventory systems.

Provenance tracking traces any product back to its origin, which is essential for food safety recalls, conflict mineral compliance, luxury goods authentication, and pharmaceutical supply chain integrity.

Real-World Implementations

In the food industry, major retailers track produce from farm to shelf. When contamination is detected, affected products are identified in seconds instead of days.

Pharmaceutical companies track medications through the supply chain, ensuring authenticity and proper handling of temperature and humidity.

Automotive OEMs and suppliers share production data, improving quality control and enabling faster recalls.

In logistics, shipping documents digitized on blockchain reduce processing time from days to hours.

Implementation Considerations

Choose the right platform by evaluating permissioned versus permissionless options, transaction throughput requirements, integration capabilities, and consortium governance models.

Start with a focused use case rather than trying to apply blockchain everywhere. Identify high-value problems in areas with trust issues between parties, processes with high documentation overhead, and products requiring strict traceability.

Build the consortium carefully since blockchain value comes from network effects. Engage key trading partners, industry associations, and regulators where appropriate.

Plan for integration because blockchain doesn't replace existing systems. It connects them. APIs and middleware are essential.

Challenges to Address

Scalability presents transaction throughput limits. Privacy requires balancing transparency with competitive secrets. Adoption depends on getting all parties on board. And standards for interoperability between different platforms are still evolving.

The Road Ahead

As the technology matures and standards emerge, blockchain will become invisible infrastructure, as fundamental to supply chains as the internet is today. Companies investing now are building competitive advantages that will compound over time.

The future supply chain is transparent, automated, and trustworthy. Blockchain makes it possible.`,
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    category: 'Blockchain',
    tags: ['Blockchain', 'Supply Chain', 'DLT', 'Enterprise'],
    featured: false,
    publishedAt: new Date().toISOString(),
    readingTime: 6
  }
];

// Helper function to find static blog by slug
function findStaticBlog(slug: string): StaticBlog | undefined {
  return staticBlogs.find(blog => blog.slug === slug);
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // First check static blogs
  const staticBlog = findStaticBlog(slug);
  if (staticBlog) {
    return {
      title: `${staticBlog.title} | Tech Insights`,
      description: staticBlog.excerpt,
    };
  }
  
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug }).lean() as BlogDocument | null;
    
    if (!blog) {
      return {
        title: 'Blog Not Found',
      };
    }
    
    return {
      title: `${blog.title} | Tech Insights`,
      description: blog.excerpt,
    };
  } catch {
    return {
      title: 'Blog | Tech Insights',
    };
  }
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  
  // First check static blogs
  const staticBlog = findStaticBlog(slug);
  if (staticBlog) {
    return (
      <main className="min-h-screen bg-white dark:bg-black">
        <BlogDetail blog={staticBlog} />
      </main>
    );
  }
  
  // Then try database
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug }).lean() as BlogDocument | null;
    
    if (!blog) {
      notFound();
    }
    
    // Convert MongoDB document to plain object
    const blogData = {
      _id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      authorRole: blog.authorRole,
      authorImage: blog.authorImage || null,
      coverImage: blog.coverImage || null,
      category: blog.category,
      tags: blog.tags,
      featured: blog.featured,
      publishedAt: blog.publishedAt.toISOString(),
      readingTime: blog.readingTime,
    };
    
    return (
      <main className="min-h-screen bg-white dark:bg-black">
        <BlogDetail blog={blogData} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching blog:', error);
    notFound();
  }
}

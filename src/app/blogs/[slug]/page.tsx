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
    content: `## The AI Revolution in Business

Artificial Intelligence is no longer a futuristic concept—it's here, and it's fundamentally changing how businesses operate. From automating routine tasks to providing deep insights through data analysis, AI is becoming an indispensable tool for modern enterprises.

## Key Areas of Impact

### 1. Customer Experience
AI-powered chatbots and virtual assistants are transforming customer service. These systems can handle thousands of queries simultaneously, providing instant responses 24/7. Machine learning algorithms analyze customer behavior to deliver personalized experiences at scale.

### 2. Data-Driven Decision Making
Gone are the days of gut-feeling decisions. AI systems process vast amounts of data to identify patterns and trends that humans might miss. Predictive analytics help businesses anticipate market changes, optimize inventory, and forecast demand with unprecedented accuracy.

### 3. Process Automation
Robotic Process Automation (RPA) combined with AI is eliminating repetitive tasks across industries. From invoice processing to HR onboarding, these intelligent systems free up human workers to focus on creative and strategic work.

## Implementation Strategies

Successfully integrating AI requires a thoughtful approach:

- Start with clear business objectives
- Invest in data infrastructure and quality
- Build cross-functional teams combining domain expertise with technical skills
- Begin with pilot projects before scaling
- Prioritize ethical AI practices and transparency

## The Road Ahead

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
    content: `## Why Cloud Migration Matters

In today's digital-first world, cloud migration isn't just about moving servers—it's about transforming how your organization operates. The cloud offers scalability, flexibility, and cost efficiencies that on-premise infrastructure simply cannot match.

## Common Migration Patterns

### The 6 R's of Migration

- **Rehost (Lift and Shift)**: Move applications as-is to the cloud. Fastest approach but may not fully leverage cloud benefits.
- **Replatform**: Make minor optimizations during migration, like moving to managed databases.
- **Repurchase**: Switch to SaaS solutions (e.g., moving from on-prem CRM to Salesforce).
- **Refactor**: Re-architect applications to be cloud-native. Highest effort but maximum benefits.
- **Retain**: Keep some workloads on-premise when it makes sense.
- **Retire**: Decommission applications that are no longer needed.

## Multi-Cloud Strategy

Why put all your eggs in one basket? A multi-cloud approach offers:

- **Vendor Independence**: Avoid lock-in and negotiate better pricing
- **Best-of-Breed Services**: Use the best services from each provider
- **Geographic Reach**: Deploy closer to users worldwide
- **Resilience**: Reduce risk of single-provider outages

## Cost Optimization Tips

### Right-Sizing
Monitor usage and adjust instance sizes. Most organizations are over-provisioned by 30-40%.

### Reserved Instances
Commit to 1-3 year terms for predictable workloads and save up to 70%.

### Spot Instances
Use for fault-tolerant workloads at up to 90% discount.

### Auto-Scaling
Scale resources based on demand rather than peak capacity.

## Getting Started

1. Assess your current infrastructure and applications
2. Define clear business objectives and success metrics
3. Start with low-risk, high-impact workloads
4. Build internal cloud expertise
5. Implement robust governance and security from day one

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
    content: `## The New Security Landscape

The traditional security perimeter has dissolved. With employees working from home, coffee shops, and co-working spaces around the world, the concept of "inside" and "outside" the network no longer applies. This demands a fundamental shift in how we approach security.

## Zero Trust Architecture

The core principle: Never trust, always verify.

### Key Components

- **Identity Verification**: Every user must prove their identity, regardless of location
- **Device Health**: Only compliant, healthy devices get access
- **Least Privilege Access**: Users get minimum permissions needed for their role
- **Micro-segmentation**: Network divided into small zones to contain breaches
- **Continuous Monitoring**: Real-time analysis of user behavior and network traffic

## Building Your Framework

### Step 1: Assess Your Current State
- Inventory all assets, applications, and data flows
- Identify critical business processes
- Map current security controls

### Step 2: Define Security Policies
- Create role-based access policies
- Establish device compliance requirements
- Set data classification standards

### Step 3: Implement Technical Controls
- Deploy identity and access management (IAM)
- Implement multi-factor authentication (MFA)
- Set up endpoint detection and response (EDR)
- Enable secure access service edge (SASE)

### Step 4: Train Your People
Security is only as strong as its weakest link. Regular training on:
- Phishing awareness
- Password hygiene
- Data handling procedures
- Incident reporting

## Adaptive Response

Modern security frameworks must adapt in real-time:

- **Risk-Based Authentication**: Increase verification for unusual behavior
- **Automated Threat Response**: Contain threats before they spread
- **Continuous Compliance**: Regular audits and policy updates

## The Human Element

Technology alone isn't enough. Create a security-conscious culture where:
- Everyone understands their role in security
- Reporting incidents is encouraged, not punished
- Security is seen as an enabler, not a blocker

Remember: Security is a journey, not a destination. Stay vigilant, stay adaptive.`,
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
    content: `## The Smart City Challenge

Smart cities generate enormous amounts of data every second—from traffic sensors and surveillance cameras to environmental monitors and smart meters. Sending all this data to centralized cloud servers creates unacceptable latency for time-critical applications.

## Enter Fog Computing

Fog computing extends cloud capabilities to the edge of the network, processing data closer to where it's generated. Think of it as a "fog" that sits between the cloud and IoT devices.

### Benefits for Smart Cities

- **Ultra-Low Latency**: Process data in milliseconds, not seconds
- **Bandwidth Efficiency**: Only send relevant data to the cloud
- **Reliability**: Continue operating even when cloud connectivity is lost
- **Privacy**: Keep sensitive data local

## Real-World Applications

### Traffic Management
Fog nodes at intersections analyze traffic patterns in real-time, adjusting signal timing to optimize flow. Response time drops from seconds to milliseconds, reducing congestion and emissions.

### Emergency Response
When seconds matter, fog computing enables:
- Instant video analysis for incident detection
- Automatic dispatch optimization
- Real-time coordination between emergency services

### Environmental Monitoring
Distributed sensors monitor air quality, noise levels, and weather conditions. Fog nodes process data locally, triggering immediate alerts when thresholds are exceeded.

### Smart Lighting
Intelligent streetlights adjust brightness based on pedestrian and vehicle traffic, saving energy while maintaining safety.

## Architecture Considerations

### Hierarchical Processing
- **Device Level**: Basic filtering and aggregation
- **Fog Level**: Real-time analytics and local decisions
- **Cloud Level**: Historical analysis and machine learning training

### Key Technologies
- Containerization (Docker, Kubernetes) for portable workloads
- Message queuing (MQTT, Kafka) for reliable data streams
- Edge AI for local inference

## Implementation Challenges

- **Heterogeneous Infrastructure**: Diverse devices and protocols
- **Security**: Distributed attack surface requires robust protection
- **Management**: Thousands of fog nodes need automated orchestration
- **Power**: Edge devices may have limited power budgets

## The Future

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
    content: `## Beyond Cryptocurrency

While blockchain gained fame through Bitcoin, its most transformative applications may be in enterprise supply chains. Distributed ledger technology (DLT) offers something supply chains desperately need: a single source of truth that all parties can trust.

## The Supply Chain Problem

Modern supply chains are incredibly complex:
- Multiple parties (suppliers, manufacturers, logistics, retailers)
- Cross-border transactions
- Paper-based processes prone to errors
- Limited visibility into upstream and downstream activities
- Counterfeit goods costing billions annually

## How Blockchain Helps

### Immutable Record Keeping
Once data is recorded on the blockchain, it cannot be altered. This creates an auditable trail from raw materials to end consumer.

### Shared Visibility
All authorized parties see the same data in real-time, eliminating information silos and disputes.

### Smart Contracts
Automated execution of business logic:
- Release payment when goods are delivered
- Trigger alerts when conditions are violated
- Automatically update inventory systems

### Provenance Tracking
Trace any product back to its origin, essential for:
- Food safety recalls
- Conflict mineral compliance
- Luxury goods authentication
- Pharmaceutical supply chain integrity

## Real-World Implementations

### Food Industry
Major retailers track produce from farm to shelf. When contamination is detected, affected products are identified in seconds instead of days.

### Pharmaceuticals
Track medications through the supply chain, ensuring authenticity and proper handling (temperature, humidity).

### Automotive
OEMs and suppliers share production data, improving quality control and enabling faster recalls.

### Logistics
Shipping documents digitized on blockchain reduce processing time from days to hours.

## Implementation Considerations

### Choose the Right Platform
- Permissioned vs. permissionless
- Transaction throughput requirements
- Integration capabilities
- Consortium governance model

### Start with a Focused Use Case
Don't try to blockchain everything. Identify high-value problems:
- Areas with trust issues between parties
- Processes with high documentation overhead
- Products requiring strict traceability

### Build the Consortium
Blockchain value comes from network effects. Engage:
- Key trading partners
- Industry associations
- Regulators where appropriate

### Plan for Integration
Blockchain doesn't replace existing systems—it connects them. APIs and middleware are essential.

## Challenges to Address

- **Scalability**: Transaction throughput limits
- **Privacy**: Balancing transparency with competitive secrets
- **Adoption**: Getting all parties on board
- **Standards**: Interoperability between different platforms

## The Road Ahead

As the technology matures and standards emerge, blockchain will become invisible infrastructure—as fundamental to supply chains as the internet is today. Companies investing now are building competitive advantages that will compound over time.

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

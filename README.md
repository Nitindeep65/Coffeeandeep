# Portfolio Website - Nitindeep Singh

A modern, responsive portfolio website built with Next.js 15, featuring a sleek design, dynamic content management, and professional presentation.

## 🚀 Overview

This portfolio showcases my work as a Full Stack Developer and Software Engineer. It features a modern design with dark/light mode support, interactive components, and a complete content management system for projects and experiences.

## ✨ Features

- **🎨 Modern Design**: Clean, professional UI with dark/light mode toggle
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **🎯 Interactive Components**: Pixel art animations, typing effects, and smooth scrolling
- **📊 Content Management**: Dynamic project and experience management
- **📬 Contact System**: Functional contact form with email notifications
- **⚡ Performance Optimized**: Built with Next.js 15 and Turbopack
- **🔧 Developer Tools**: TypeScript, Tailwind CSS, and modern development stack

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible component library
- **Framer Motion** - Smooth animations and transitions

### Backend & Database
- **MongoDB** - Database for storing projects and experiences
- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email handling for contact form

### Development Tools
- **Biome** - Fast linter and formatter
- **Turbopack** - Ultra-fast bundler
- **Vercel Analytics** - Performance monitoring

## 🏗️ Project Structure

```
portfolio/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   └── ...            # Feature components
│   ├── lib/               # Utilities and configurations
│   └── hooks/             # Custom React hooks
├── public/                # Static assets
└── ...config files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Environment variables (see below)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nitindeep65/Coffeeandeep.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # Email (for contact form)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # Optional: Analytics
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter (Biome)
- `npm run format` - Format code (Biome)

## 🎯 Key Features Explained

### Dynamic Content Management
- Add/edit projects and experiences through the UI
- Image upload and management
- Real-time content updates

### Modern UI Components
- Interactive pixel art profile image
- Typing animation terminal component
- Smooth scroll navigation
- Responsive sidebar with mobile sheet overlay

### Performance Optimizations
- Next.js 15 with Turbopack for ultra-fast builds
- Optimized images with Next.js Image component
- Efficient bundle splitting and lazy loading

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

2. **Environment Variables**
   Configure your environment variables in the Vercel dashboard

3. **Database**
   Ensure your MongoDB database is accessible from your deployment

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for personal use. Feel free to use it as inspiration for your own portfolio.

## 📧 Contact

**Nitindeep Singh**
- Portfolio: [Live Demo](https://your-portfolio-url.com)
- LinkedIn: [singhdeep1](https://www.linkedin.com/in/singhdeep1/)
- GitHub: [Nitindeep65](https://github.com/Nitindeep65)
- Twitter: [@_NitindeepSingh](https://x.com/_NitindeepSingh)

---

*Built with ❤️ using Next.js and modern web technologies*

# Course Recommender Platform

A modern, AI-powered course recommendation platform built with Next.js 14, TypeScript, and Framer Motion. This platform helps users discover personalized learning paths through an intuitive, animated interface.

## ✨ Features

- 🤖 AI-powered course recommendations
- 🎨 Modern, responsive UI with dark theme
- 🌊 Smooth animations and transitions using Framer Motion
- 💫 Interactive magnetic buttons and custom cursor
- 🔍 Real-time course filtering and search
- 📱 Fully responsive design for all devices
- ⚡ Server-side rendering for optimal performance

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Components:** Radix UI
- **State Management:** React Hooks
- **API Integration:** REST API with Next.js API routes
- **Development:** ESLint, Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/course-recommender.git
   cd course-recommender
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Deployment

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm run start
   # or
   yarn start
   ```

## 🚀 Deployment

### Deploying to Vercel (Recommended)

1. Create a Vercel account at [vercel.com](https://vercel.com)

2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy the project:
   ```bash
   vercel
   ```

   During deployment, Vercel will ask you a few questions:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: course-recommender (or your preferred name)
   - Directory: ./
   - Override settings: No

5. Your project will be deployed and you'll receive a production URL.

### Environment Variables

Make sure to add these environment variables in your Vercel project settings:

```env
NEXT_PUBLIC_API_URL=your-api-url
```

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to the "Domains" section
3. Add your custom domain
4. Follow Vercel's instructions for DNS configuration

### Automatic Deployments

Vercel automatically deploys:
- Every push to the main branch
- Pull requests (preview deployments)

### Monitoring

- View deployment status in Vercel Dashboard
- Monitor performance in real-time
- Access deployment logs and analytics

## 🏗️ Project Structure

```
course-recommender/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # Reusable UI components
│   ├── lib/                # Utility functions
│   └── styles/             # Global styles
├── public/                 # Static assets
├── .env.local             # Environment variables
└── package.json           # Project dependencies
```

## 🎨 UI Components

- **MagneticButton:** Interactive button with magnetic hover effect
- **CustomCursor:** Animated cursor with trailing effect
- **Header:** Responsive navigation with animation effects
- **CourseCard:** Animated course display component
- **SearchBar:** Real-time course search component

## 🔧 Development

### Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run lint` to check for linting issues
- Run `npm run format` to format code

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: description of your changes"
   ```

3. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Framer Motion for the animation library
- Tailwind CSS for the utility-first CSS framework
- Radix UI for accessible components

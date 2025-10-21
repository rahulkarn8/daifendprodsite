# Daifend - AI Cybersecurity Platform

## Overview

This is a modern full-stack web application for Daifend, an AI-powered cybersecurity company. The application showcases Daifend's services, research, and live threat monitoring capabilities through an interactive, dark-themed interface with cybersecurity aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with separate client and server directories, using a modern React frontend with an Express.js backend. The system is designed as a static website with potential for dynamic features through the Express API layer.

### Frontend Architecture
- **React 18** with TypeScript for the main application
- **Vite** as the build tool and development server
- **Wouter** for client-side routing (lightweight React Router alternative)
- **Tailwind CSS** with custom cybersecurity theme colors
- **shadcn/ui** component library built on Radix UI primitives
- **Framer Motion** for animations and interactive elements
- **TanStack Query** for server state management

### Backend Architecture
- **Express.js** server with TypeScript
- **Custom Vite integration** for development and production builds
- **Modular routing** system with separation of concerns
- **Memory storage** implementation with interface-based design for future database integration

## Key Components

### UI Component System
The application uses a comprehensive design system based on shadcn/ui:
- **Consistent styling** with CSS variables and Tailwind utility classes
- **Accessible components** built on Radix UI primitives
- **Dark theme** optimized for cybersecurity aesthetics
- **Custom color palette** with cyber-themed colors (blue, purple, cyan, green)

### Page Structure
- **Home**: Landing page with hero section, stats, testimonials, and CTA
- **Offerings**: Service tabs showing AI security strategy, cybersecurity LLM, self-healing systems, and LLM security
- **Research**: Research areas including AI-powered attacks, quantum cryptography, AI simulations, and agentic AI
- **Live Threats**: Real-time threat monitoring dashboard with simulated data
- **Resources**: Content hub for whitepapers, webinars, and educational materials

### Interactive Features
- **Advanced animated backgrounds** with floating particles, gradient orbs, and matrix rain effects
- **Real-time AI security visualization** with interactive network diagrams and 3D-style nodes
- **Live code animation** showing responsible AI security frameworks being written and executed
- **Interactive threat simulation** with updating counters and status indicators
- **Sophisticated tabbed interfaces** for organizing complex cybersecurity content
- **Scale.com-inspired animations** with premium blur effects and micro-interactions
- **Responsive design** optimized for desktop and mobile with enhanced visual hierarchy

## Recent Major Updates (July 19, 2025)

**Premium Visual Enhancement:**
- Completely redesigned hero section with Scale.com-inspired aesthetics
- Added responsible AI standards development focus throughout
- Implemented advanced gradient text effects and sophisticated animations
- Created interactive AI architecture visualization with real-time node monitoring
- Built live code animation component showing ethical AI security frameworks
- Enhanced color system with cyber-themed palette and improved contrast
- Removed all placeholder company references, focused on responsible AI standards work

**New Interactive Components:**
- **InteractiveDashboard**: Scale.com-inspired real-time threat monitoring
- **AIVisualization**: 3D-style network showing AI processing layers with ethics monitoring
- **CodeAnimation**: Live code typing simulation with syntax highlighting
- **MatrixRain**: Cybersecurity-themed background effects
- **Enhanced HeroSection**: 80+ animated particles, gradient mesh, floating security icons

## Data Flow

The application operates as a sophisticated cybersecurity demonstration:
- **Client-side rendering** with React components and advanced animations
- **Real-time data simulation** for AI security monitoring and threat detection
- **Interactive state management** for complex UI interactions and visualizations
- **Query client** configured for future API integration with security data sources

## External Dependencies

### Database Layer
- **Drizzle ORM** configured for PostgreSQL with schema definitions
- **Neon Database** integration ready for serverless PostgreSQL
- **Migration system** set up for schema evolution

### Development Tools
- **TypeScript** for type safety across the entire stack
- **ESBuild** for fast server-side bundling
- **PostCSS** with Autoprefixer for CSS processing
- **Path mapping** for clean import statements

### UI and Animation Libraries
- **Radix UI** primitives for accessible components
- **Framer Motion** for complex animations and interactions
- **Lucide React** for consistent iconography
- **Date-fns** for date manipulation

## Deployment Strategy

The application is structured for flexible deployment:

### Development
- **Vite dev server** with HMR for frontend development
- **tsx** for running TypeScript server code directly
- **Integrated development** with server and client running together

### Production
- **Static asset generation** through Vite build process
- **Server bundle creation** using ESBuild
- **Environment-based configuration** for different deployment targets
- **Replit-optimized** with specific plugins and error handling

### Database Strategy
- **Drizzle migrations** ready for database provisioning
- **Environment variable** configuration for database connections
- **Memory storage fallback** for development without database setup
- **Interface-based design** allowing easy swapping between storage implementations

The architecture supports both static deployment (for the marketing site) and full-stack deployment (when API functionality is needed) without requiring significant refactoring.
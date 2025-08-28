# Sathi Ko Recipe - Simple Recipe Website

## Overview

Sathi Ko Recipe is a full-stack recipe website designed for international students and cooking beginners. The application provides simple, affordable, and healthy meal recipes with features like search, filtering, and detailed recipe instructions. Built as a modern web application with a focus on mobile-first design and user-friendly navigation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod schema validation

### Backend Architecture
- **Server**: Express.js with TypeScript
- **API Design**: RESTful endpoints for recipe and contact management
- **Data Storage**: In-memory storage (MemStorage class) for development with interface for future database integration
- **Database Schema**: Drizzle ORM schemas defined for PostgreSQL (prepared for future migration)
- **Validation**: Zod schemas shared between frontend and backend

### Key Features
- **Recipe Management**: CRUD operations for recipes with search and filtering capabilities
- **Contact System**: Contact form with server-side validation and storage
- **Theme Support**: Light/dark mode toggle with persistent storage
- **Responsive Design**: Mobile-first approach with responsive components
- **Error Handling**: Custom error boundaries and toast notifications

### Data Models
- **Recipe Schema**: Comprehensive recipe structure including ingredients, instructions, nutrition facts, cooking tips, ratings, and categorization
- **Contact Schema**: Simple contact form structure with name, email, reason, and message fields

### Development Tools
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Code Quality**: ESLint configuration and TypeScript strict mode
- **Build Process**: Vite for frontend bundling, ESBuild for server compilation
- **Development Server**: Hot module replacement and error overlay for development

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL database connectivity (prepared for production)
- **drizzle-orm** & **drizzle-kit**: Type-safe database ORM and migration tools
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **react-hook-form** & **@hookform/resolvers**: Form management with validation

### UI Components
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Frontend build tool and development server
- **typescript**: Type checking and compilation
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development tooling for Replit environment

### Validation and Utilities
- **zod**: Schema validation shared between client and server
- **drizzle-zod**: Integration between Drizzle schemas and Zod validation
- **date-fns**: Date manipulation utilities
- **clsx** & **tailwind-merge**: Conditional CSS class management
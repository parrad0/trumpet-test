# Widgets App

**Project to complete the Trumpet assessment** built with Next.js 15, using SSR and Server Actions. The idea was to use the latest version of Next.js with its newest features.

A modern web application for managing widgets with MongoDB backend, React Query for data fetching, and complete testing suite with e2e.

## 🏗️ Architecture

### Frontend Stack
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Query (@tanstack/react-query)** - Server state management
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library
shadcn ui to be explained

### Backend Stack
- **Next.js SSR** - Server-side API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **ZSA (Zod Server Actions)** - Type-safe server actions
- **Zod** - Schema validation

### Testing Stack
- **Vitest** - Unit and integration testing framework (better ES modules support)
- **React Testing Library** - Component testing
- **@testing-library/jest-dom** - Extended Jest matchers
- **Playwright** - End-to-end testing

## 📁 Project Structure

```
├── app/
│   ├── api/widgets/           # API routes (REST endpoints)
│   ├── providers.tsx          # React Query provider setup
│   ├── page.tsx              # Main page with Suspense
│   ├── loading.tsx           # Loading skeleton
│   ├── error.tsx             # Error boundary
│   └── layout.tsx            # Root layout
├── components/               # React components
│   ├── ui/                   # Reusable UI components
│   ├── text-widget.tsx       # Main widget component
│   ├── widget-header.tsx     # Widget header with actions
│   ├── widget-textarea.tsx   # Text input component
│   ├── character-count.tsx   # Character counter
│   ├── widget-renderer.tsx   # Widget type renderer
│   └── widgets-list.tsx      # Widgets container
├── hooks/                    # Custom React hooks
│   ├── serverActionHook.ts         # Widgets CRUD operations
│   ├── useTextWidget.ts    # React Query hooks
├── lib/                      # Utilities and configurations
│   ├── mongodb.ts           # Database connection
│   ├── actions.ts           # Server side actions for widget
│   └── utils.ts             # Utility functions
├── models/                   # MongoDB models
│   └── Widget.ts            # Widget schema and model
├── types/                    # TypeScript type definitions
│   └── widget.ts            # Widget-related types
└── tests/                   # Test suites (Vitest)
    ├── unit/                # Unit tests
    │   ├── components/      # Component tests
    │   ├── hooks/          # Hook tests
    │   └── lib/            # Utility tests
    ├── integration/         # Integration tests
    │   └── server-actions.test.ts
    └── e2e/                 # End-to-end tests (Playwright)
        └── widgets.spec.ts  # E2E widget workflows
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+**
- **Docker and Docker Compose**
- **npm, yarn, or pnpm** (pnpm recommended for better dependency management)

### 1. Clone and Install

```bash
git clone <repository-url>
cd trumpet-test

# Using npm (with automatic peer dependency handling)
npm install

# Or using pnpm (recommended, handles peer deps better)
pnpm install

# Or if you have peer dependency issues
npm run install:clean
```

> **Note**: The project includes `.npmrc` configuration to automatically install peer dependencies and avoid common dependency conflicts.

### 2. Start MongoDB with Docker

```bash
docker-compose up -d
```

This starts MongoDB with:
- **Port**: 27017
- **Database**: `widgets_db`
- **User**: `widgets_user`
- **Password**: `widgets_password`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🧪 Testing

### Test Structure
```
tests/
├── unit/                    # Unit tests (jsdom environment, Vitest)
│   ├── components/         # Component tests
│   ├── hooks/             # Hook tests
│   └── lib/               # Utility tests
├── integration/            # Integration tests (node environment, Vitest)
│   └── server-actions-docker.test.ts  # MongoDB integration tests
└── e2e/                    # End-to-end tests (Playwright)
    └── widgets.spec.ts     # Complete user workflows
```

### Available Test Commands

```bash
# Run all unit tests
npm test
# or
npm run test:unit

# Run unit tests in watch mode
npm run test:watch

# Run unit tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration

# Run Docker MongoDB integration tests
npm run test:docker

# Run end-to-end tests
npm run test:e2e

# Run all tests (unit + integration + e2e)
npm run test:all
```

### Test Requirements

**For Unit Tests:**
- No external dependencies required
- Uses jsdom environment for React components

**For Integration Tests:**
- Requires Docker MongoDB to be running
- Tests real database operations
- Uses factory pattern for test data generation

**For E2E Tests:**
- Requires application to be running (`npm run dev`)
- Tests complete user workflows
- Uses Playwright for browser automation


## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
| `npm run test:unit` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:integration` | Run integration tests |
| `npm run test:docker` | Run Docker MongoDB tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:all` | Run all tests |

## 🎯 Challenge Requirements

### Core Requirements ✅
- ✅ **Add Multiple Text Widgets** - Users can add unlimited text widgets via button
- ✅ **Independent Text Storage** - Each widget stores its own text independently  
- ✅ **Large Text Handling** - Supports 1000+ character strings with performance optimization
- ✅ **Persistent Storage** - Widget content persists across page refreshes via MongoDB
- ✅ **Widget Borders** - Clear visual separation between widgets
- ✅ **Unit Testing** - Comprehensive test suite with Vitest
- ✅ **Git Version Control** - Full git history and proper commits

### Bonus Features ✅
- ✅ **Delete Widgets** - Users can remove unwanted widgets
- ✅ **Docker Container** - Complete Docker setup with docker-compose
- ✅ **E2E Testing** - Playwright end-to-end test coverage

## ✨ Features

- ✅ **CRUD Operations** - Create, read, update, delete widgets
- ✅ **Real-time Updates** - Optimistic UI updates with React Query
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **Database Persistence** - MongoDB with Mongoose
- ✅ **Modern UI** - Tailwind CSS with Radix UI components
- ✅ **Server Actions** - Type-safe server operations with ZSA
- ✅ **Comprehensive Testing** - Unit, integration, and e2e tests
- ✅ **Error Handling** - Proper error boundaries and validation
- ✅ **Performance** - React 19 concurrent features + debounced saves
- ✅ **Accessibility** - Radix UI accessible components


## ⚖️ Tradeoffs Made

### Technology Choices
- **Next.js 15 over Express/React**: Chose Next.js 15 to leverage Server Actions and native SSR, though it adds complexity vs a simple SPA
- **MongoDB over In-Memory**: Real persistence vs simplicity - chose MongoDB to demonstrate scalability
- **React Query over useState**: Better server state management but larger bundle size
- **ZSA over tRPC**: Type-safe Server Actions simpler than full tRPC setup

### Performance vs Features
- **Debounced saves**: 500ms delay vs real-time - balance between UX and server load
- **Optimistic updates**: Better UX but more complex state management

## 🚀 Improvements I Would Implement

### Authentication & Users
- **Auth System** - JWT/NextAuth so each user sees only their widgets
- **Multi-tenancy** - Data separation by user/organization
- **Permissions** - Read/write roles for widgets

### Enhanced UI/UX
- **Complete Design System** - Design tokens, dark/light theme
- **Drag & Drop** - Widget reordering
- **Rich Text Editor** - Formatting, images, links in text widgets
- **Widget Templates** - Predefined templates
- **Better Responsive** - Improved mobile experience

### Performance & Scalability  
- **Virtualization** - For large widget lists
- **CDN** - For static assets
- **Pagination** - For many widgets
- **Real-time collaboration** - WebSockets for simultaneous editing

### DevOps & Monitoring
- **CI/CD Pipeline** - GitHub Actions with automatic deploy
- **Error Tracking** - Sentry integration
- **Analytics** - Usage metrics and performance monitoring
- **Health Checks** - Health endpoints for k8s
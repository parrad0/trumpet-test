# Widgets App

A modern web application for managing widgets with MongoDB backend, React Query for data fetching, and comprehensive testing suite.

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
- **Jest** - Unit testing framework
- **Vitest** - Integration testing framework (better ES modules support)
- **React Testing Library** - Component testing
- **@testing-library/jest-dom** - Extended Jest matchers

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
└── tests/                   # Test suites
    ├── unit/                # Unit tests
    │   ├── components/      # Component tests
    │   ├── hooks/          # Hook tests
    │   └── lib/            # Utility tests
    └── integration/         # Integration tests
        └── server-actions.test.ts
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
├── unit/                    # Unit tests (jsdom environment)
│   ├── components/         # Component tests
│   ├── hooks/             # Hook tests
│   └── lib/               # Utility tests
└── integration/            # Integration tests (node environment)
    └── server-actions-docker.test.ts  # MongoDB integration tests
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

# Run all tests (unit + integration)
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
| `npm run test:all` | Run all tests |

## ✨ Features

- ✅ **CRUD Operations** - Create, read, update, delete widgets
- ✅ **Real-time Updates** - 
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **Database Persistence** - MongoDB with Mongoose
- ✅ **Modern UI** - Tailwind CSS with Radix UI components
- ✅ **Server Actions** - Type-safe server operations with ZSA
- ✅ **Comprehensive Testing** - Unit and integration tests
- ✅ **Error Handling** - Proper error boundaries and validation
- ✅ **Performance** - React 19 concurrent features
- ✅ **Accessibility** - Radix UI accessible components

## 🧩 Widget System

The application uses an extensible widget system:

```typescript
// Widget types are defined in types/widget.ts
export enum WidgetType {
  TEXT = 'text',
  // Future types can be added here
  // IMAGE = 'image',
  // CHART = 'chart',
}
# Frontend Developer Code Test

## Overview
This is a practical coding assessment for a mid-level frontend developer position. You'll be building a **Task Management Dashboard** using React, Vite, and Tailwind CSS.

## Time Allocation
- **Estimated Time**: 2-3 hours
- **Focus**: Quality over speed - we value clean, maintainable code

## The Challenge
Build a responsive task management dashboard with the following features:

### Core Requirements (Must Have)
1. **Task List Display**
   - Display a list of tasks with title, description, status, and priority
   - Show task creation date
   - Tasks should be visually distinct based on priority (High, Medium, Low)

2. **Task Management**
   - Add new tasks with form validation
   - Mark tasks as complete/incomplete
   - Delete tasks
   - Edit existing tasks (inline or modal)

3. **Filtering & Sorting**
   - Filter by status (All, Completed, Pending)
   - Filter by priority
   - Sort by date created or priority

4. **Responsive Design**
   - Mobile-first approach
   - Works well on desktop, tablet, and mobile
   - Clean, modern UI using Tailwind CSS

### Bonus Features (Nice to Have)
- Local storage persistence
- Search functionality
- Drag and drop to reorder tasks
- Task categories/tags
- Due dates with visual indicators
- Dark/light theme toggle
- Animations and micro-interactions

## Technical Requirements
- ✅ React 18+ with functional components and hooks
- ✅ Vite for build tooling
- ✅ Tailwind CSS for styling
- ✅ TypeScript (preferred) or JavaScript
- ✅ Clean, readable code with proper component structure
- ✅ Basic error handling
- ✅ Responsive design principles

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Docker (for containerized development)

### Option 1: Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Option 2: Docker Development
```bash
# Build and run the container
docker-compose up --build

# Or using Docker directly
docker build -t frontend-test .
docker run -p 3000:3000 frontend-test
```

The application will be available at `http://localhost:3000`

## Project Structure
```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── styles/             # Global styles
└── App.tsx             # Main application component
```

## Evaluation Criteria

### Code Quality (40%)
- Clean, readable, and well-organized code
- Proper component decomposition
- Consistent naming conventions
- Error handling and edge cases

### Functionality (30%)
- All core requirements implemented
- Features work as expected
- Good user experience

### Design & Responsive (20%)
- Clean, modern interface
- Proper use of Tailwind CSS
- Mobile responsiveness
- Attention to UI/UX details

### Best Practices (10%)
- Proper React patterns and hooks usage
- Performance considerations
- Accessibility basics
- Git commit history (if applicable)

## Submission Guidelines

1. **Code Submission**
   - Complete the implementation
   - Ensure the app runs without errors
   - Test on different screen sizes

2. **Documentation**
   - Update this README with any additional setup instructions
   - Document any assumptions made
   - List any bonus features implemented

3. **Questions to Address** (in your submission)
   - What challenges did you face and how did you solve them?
   - What would you improve given more time?
   - How did you ensure the application is accessible?

## Mock Data
Initial tasks are provided in `src/data/mockTasks.ts`. You can use this as a starting point and modify as needed.

## Notes
- Focus on clean, maintainable code over complex features
- Use semantic HTML and consider accessibility
- Feel free to use any additional libraries you think are necessary (but justify the choice)
- Ask questions if requirements are unclear

Good luck! We're excited to see your solution.
# Frontend Developer Code Test

## Overview
Build a **Sales Analytics Dashboard** that displays sales data with interactive charts and filters. This test focuses on data visualization, TypeScript proficiency, and clean UI implementation.

## Time Allocation
- **Estimated Time**: 2-3 hours
- **Focus**: Data visualization, TypeScript, and clean code architecture

## The Challenge: Sales Analytics Dashboard

Create a responsive dashboard that visualizes sales data from a provided mock dataset using charts and interactive filters.

### Core Requirements (Must Complete)

#### 1. Data Display & Visualization
- **Sales Overview Cards**: Total sales, average order value, total orders, top performing month
- **Line Chart**: Monthly sales trend over time
- **Bar Chart**: Sales by product category 
- **Pie/Donut Chart**: Revenue distribution by region
- **Data Table**: Detailed sales records with sorting

#### 2. Interactive Filtering
- **Date Range Filter**: Filter data by date range
- **Category Filter**: Multi-select dropdown for product categories
- **Region Filter**: Filter by geographic regions
- **Search**: Search through sales records
- **Clear Filters**: Reset all active filters

#### 3. TypeScript Implementation
- Strong typing for all data structures
- Proper interfaces for sales data, chart data, and filter states
- Type-safe filter and data transformation functions
- No `any` types - demonstrate proper TypeScript usage

#### 4. Responsive Design
- Mobile-first responsive layout using Tailwind CSS
- Charts that adapt to different screen sizes
- Clean, professional dashboard aesthetic
- Loading states and error handling

### Technical Requirements

#### Must Use
- ✅ React 18+ with TypeScript (strict mode)
- ✅ Vite for build tooling
- ✅ Tailwind CSS for styling
- ✅ Chart library (Recharts recommended)
- ✅ Lucide React for icons

#### Data Requirements
- Work with provided `mockSalesData.ts` file
- Implement proper data filtering and aggregation
- Type-safe data transformations
- Handle edge cases (empty data, invalid dates, etc.)

#### Code Quality Standards
- Strong TypeScript typing throughout
- Reusable components with proper prop types
- Custom hooks for data processing logic
- Clean separation between data logic and UI components
- Proper error boundaries

## Mock Data Structure

The provided dataset includes sales records with the following structure:

```typescript
interface SaleRecord {
  id: string;
  date: string; // ISO date string
  customerName: string;
  productName: string;
  category: 'Electronics' | 'Clothing' | 'Books' | 'Home' | 'Sports';
  region: 'North' | 'South' | 'East' | 'West';
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  salesRep: string;
}
```

## Getting Started

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Lint code
npm run lint
```

### Docker Development
```bash
# Start development environment
docker-compose up --build

# The app will be available at http://localhost:5173
```

## Project Structure
```
src/
├── components/
│   ├── charts/         # Chart components
│   ├── filters/        # Filter components
│   ├── ui/            # Reusable UI components
│   └── dashboard/     # Dashboard-specific components
├── hooks/             # Custom hooks for data processing
├── types/            # TypeScript type definitions
├── utils/            # Data transformation utilities
├── data/             # Mock data file
└── App.tsx           # Main application
```

## Evaluation Criteria

### TypeScript & Code Quality (40%)
- Proper TypeScript usage with strong typing
- Well-structured interfaces and types
- Clean, readable, and maintainable code
- Proper component decomposition
- Custom hooks for complex logic

### Data Visualization (30%)
- Effective use of charts to display insights
- Proper data transformation and aggregation
- Interactive and responsive charts
- Clear visual hierarchy and design

### Functionality (20%)
- All filtering features work correctly
- Data updates reflect in all charts
- Proper error handling
- Good user experience

### UI/UX Design (10%)
- Clean, professional dashboard design
- Responsive layout that works on all devices
- Intuitive user interface
- Proper loading and empty states

## Deliverables

### Required
1. **Working Dashboard**: All core features implemented
2. **Clean TypeScript**: Strong typing throughout
3. **Responsive Design**: Works on mobile and desktop
4. **Documentation**: Brief README update with your approach

### Bonus (Optional)
- Export functionality (CSV/JSON)
- Additional chart types
- Advanced filtering options
- Animations and micro-interactions
- Dark/light theme toggle

## Submission Guidelines

1. **Code Quality**
   - Ensure TypeScript compiles without errors
   - Test all filtering functionality
   - Verify responsive design on different screen sizes

2. **Documentation**
   - Document any assumptions made
   - Explain your approach to data visualization
   - List any additional features implemented


Good luck! We're looking forward to seeing your approach to building a data-driven dashboard.
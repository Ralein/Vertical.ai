# Sales Dashboard

A full-stack web-based Sales Dashboard built with Next.js that displays KPIs, lead status, sales trends, and allows date filtering.

## Features

- 📊 Real-time KPI tracking (Total Leads, Contacted Leads, Sales Closed, Total Revenue)
- 📈 Interactive sales trend line chart
- 🥧 Lead distribution pie chart
- 📋 Lead status table with color-coded badges
- 🔍 Date range filtering (Last 7 Days / Last 30 Days)
- 📱 Fully responsive design
- ⚡ Fast API routes with Next.js App Router

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **HTTP Client**: Axios

## Project Structure

```
sales-dashboard/
├── app/
│   ├── api/
│   │   ├── kpi/route.ts       # KPI metrics endpoint
│   │   ├── leads/route.ts     # Lead status counts endpoint
│   │   └── sales/route.ts     # Sales revenue by date endpoint
│   ├── layout.tsx
│   └── page.tsx               # Main dashboard page
├── components/
│   ├── KPICard.tsx            # Reusable KPI card component
│   ├── LeadTable.tsx          # Lead status distribution table
│   ├── SalesTrendChart.tsx    # Line chart for revenue trends
│   └── LeadDistributionChart.tsx # Pie chart for lead distribution
├── data/
│   ├── leads.json             # 50 dummy leads
│   └── sales.json             # 15 dummy sales records
└── README.md
```

## Data Structure

### Lead Object
```json
{
  "id": 1,
  "name": "John Doe",
  "status": "New",
  "contactedOn": "2026-02-10",
  "convertedOn": null,
  "revenue": 0
}
```

**Status Types**: New, Contacted, Follow Up, Appointment Booked, Converted, Lost

### Sales Object
```json
{
  "id": 101,
  "leadId": 2,
  "amount": 500,
  "date": "2026-02-15"
}
```

## API Endpoints

### GET /api/kpi
Returns overall KPI metrics.

**Response**:
```json
{
  "totalLeads": 50,
  "contactedLeads": 45,
  "salesClosed": 11,
  "totalRevenue": 11450
}
```

### GET /api/leads
Returns count of leads grouped by status.

**Response**:
```json
{
  "New": 5,
  "Contacted": 8,
  "Follow Up": 9,
  "Appointment Booked": 9,
  "Converted": 11,
  "Lost": 8
}
```

### GET /api/sales?days=7
Returns revenue per day for the specified number of days.

**Query Parameters**:
- `days` (optional): Number of days to look back (default: 7)

**Response**:
```json
[
  { "date": "2026-02-15", "revenue": 950 },
  { "date": "2026-02-16", "revenue": 300 }
]
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sales-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Architecture & Design Choices

### Frontend Architecture
- **Component-Based Design**: Modular, reusable components for maintainability
- **Client-Side Rendering**: Dashboard uses 'use client' for interactive features
- **State Management**: React hooks (useState, useEffect) for local state
- **Responsive Grid Layout**: Tailwind CSS grid system for mobile-first design

### Backend Architecture
- **Next.js API Routes**: Serverless functions for data aggregation
- **File-Based Data**: JSON files for dummy data (easily replaceable with database)
- **RESTful Design**: Clean, predictable API endpoints

### Styling Approach
- **Utility-First CSS**: Tailwind CSS for rapid development
- **Consistent Color Palette**: Status-based color coding for visual clarity
- **Hover Effects**: Subtle transitions for better UX
- **Shadow & Spacing**: Card-based layout with proper visual hierarchy

### Performance Optimizations
- **Parallel API Calls**: Promise.all() for simultaneous data fetching
- **Responsive Charts**: Recharts with ResponsiveContainer for all screen sizes
- **Loading States**: Spinner during data fetch for better UX
- **Minimal Re-renders**: Efficient state updates

## Features Implemented

✅ KPI Cards with icons and hover effects  
✅ Lead status table with color-coded badges  
✅ Sales trend line chart with tooltips  
✅ Lead distribution pie chart with percentages  
✅ Date range filter (7/30 days)  
✅ Responsive design (mobile, tablet, desktop)  
✅ Loading spinner  
✅ Empty states for charts  
✅ Currency formatting ($)  
✅ Clean, modern UI  

## Future Enhancements

- Add database integration (PostgreSQL, MongoDB)
- Implement user authentication
- Add export functionality (CSV, PDF)
- Real-time updates with WebSockets
- Advanced filtering (by status, date range picker)
- Lead detail modal/page
- Dark mode support

## License

MIT

## Author

Built with ❤️ using Next.js

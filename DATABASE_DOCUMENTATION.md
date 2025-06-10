
# Database Connectivity and Data Modeling Documentation

## Overview
This CRM application is currently using mock data but is designed to easily integrate with a backend database. Below is the complete documentation for database connectivity and data modeling.

## Recommended Database Setup

### Database Technology Stack
- **Primary Database**: PostgreSQL (recommended for production)
- **ORM**: Prisma or TypeORM
- **Backend Framework**: Node.js with Express or NestJS
- **Authentication**: JWT with bcrypt for password hashing

### Environment Variables Required
```env
DATABASE_URL="postgresql://username:password@localhost:5432/crm_database"
JWT_SECRET="your-jwt-secret-key"
API_BASE_URL="http://localhost:3001/api"
```

## Data Models

### 1. Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'agent',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Interface:**
```typescript
interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'agent';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 2. Leads Table
```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'New',
  score INTEGER DEFAULT 0,
  country VARCHAR(100),
  program VARCHAR(255),
  assigned_to INTEGER REFERENCES users(id),
  last_contact DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Interface:**
```typescript
interface Lead {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  source?: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Closed Won' | 'Closed Lost';
  score: number;
  country?: string;
  program?: string;
  assignedTo?: number;
  lastContact?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 3. Follow-ups Table
```sql
CREATE TABLE follow_ups (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  agent_id INTEGER REFERENCES users(id),
  duration VARCHAR(20),
  subject VARCHAR(255),
  notes TEXT,
  outcome TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Interface:**
```typescript
interface FollowUp {
  id: number;
  leadId: number;
  type: 'Call' | 'Email' | 'Meeting' | 'Note';
  date: Date;
  agentId: number;
  duration?: string;
  subject?: string;
  notes: string;
  outcome: string;
  createdAt: Date;
}
```

### 4. Tasks Table
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
  assignee_id INTEGER REFERENCES users(id),
  creator_id INTEGER REFERENCES users(id),
  due_date DATE,
  priority VARCHAR(20) DEFAULT 'Medium',
  status VARCHAR(50) DEFAULT 'Pending',
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  completed_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**TypeScript Interface:**
```typescript
interface Task {
  id: number;
  title: string;
  description?: string;
  leadId?: number;
  assigneeId: number;
  creatorId: number;
  dueDate: Date;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
  completed: boolean;
  completedAt?: Date;
  completedBy?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

### Authentication Endpoints
```typescript
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET /api/auth/me
```

### Leads Endpoints
```typescript
GET /api/leads                    // Get all leads with pagination
GET /api/leads/:id               // Get specific lead
POST /api/leads                  // Create new lead
PUT /api/leads/:id              // Update lead
DELETE /api/leads/:id           // Delete lead
GET /api/leads/:id/follow-ups   // Get lead's follow-up history
GET /api/leads/:id/tasks        // Get lead's tasks
```

### Follow-ups Endpoints
```typescript
GET /api/follow-ups             // Get all follow-ups
POST /api/follow-ups            // Create new follow-up
PUT /api/follow-ups/:id         // Update follow-up
DELETE /api/follow-ups/:id      // Delete follow-up
```

### Tasks Endpoints
```typescript
GET /api/tasks                  // Get all tasks
GET /api/tasks/:id             // Get specific task
POST /api/tasks                // Create new task
PUT /api/tasks/:id             // Update task
DELETE /api/tasks/:id          // Delete task
PATCH /api/tasks/:id/status    // Update task status
```

## Integration Steps

### 1. Backend Setup
```bash
# Install dependencies
npm install express prisma @prisma/client bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken

# Initialize Prisma
npx prisma init
```

### 2. Frontend API Integration
Create an API service layer:

```typescript
// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const leadService = {
  getAll: () => api.get('/leads'),
  getById: (id: number) => api.get(`/leads/${id}`),
  create: (data: Partial<Lead>) => api.post('/leads', data),
  update: (id: number, data: Partial<Lead>) => api.put(`/leads/${id}`, data),
  delete: (id: number) => api.delete(`/leads/${id}`),
};

export const taskService = {
  getAll: () => api.get('/tasks'),
  getById: (id: number) => api.get(`/tasks/${id}`),
  create: (data: Partial<Task>) => api.post('/tasks', data),
  update: (id: number, data: Partial<Task>) => api.put(`/tasks/${id}`, data),
  updateStatus: (id: number, status: string) => api.patch(`/tasks/${id}/status`, { status }),
};
```

### 3. Replace Mock Data
Update components to use real API calls:

```typescript
// Example: Update LeadList component
import { useQuery } from '@tanstack/react-query';
import { leadService } from '@/services/api';

export const LeadList = () => {
  const { data: leads, isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: leadService.getAll,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading leads</div>;

  // Rest of component logic
};
```

## Security Considerations

### 1. Authentication & Authorization
- Implement JWT-based authentication
- Use role-based access control (RBAC)
- Validate user permissions on all endpoints

### 2. Data Validation
- Use Zod or Joi for input validation
- Sanitize all user inputs
- Implement rate limiting

### 3. Database Security
- Use parameterized queries (Prisma handles this)
- Implement row-level security (RLS)
- Regular database backups

## Performance Optimization

### 1. Database Indexing
```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_tasks_assignee_id ON tasks(assignee_id);
CREATE INDEX idx_follow_ups_lead_id ON follow_ups(lead_id);
```

### 2. Caching Strategy
- Implement Redis for session management
- Cache frequently accessed data
- Use React Query for client-side caching

### 3. Pagination
- Implement cursor-based pagination for large datasets
- Add proper limit/offset handling

## Migration Strategy

### 1. Data Migration
```typescript
// Example migration script
const migrateFromMockData = async () => {
  const mockLeads = MOCK_LEADS;
  
  for (const lead of Object.values(mockLeads)) {
    await prisma.lead.create({
      data: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
        status: lead.status,
        score: lead.score,
        country: lead.country,
        program: lead.program,
        notes: lead.notes,
      },
    });
  }
};
```

### 2. Environment Setup
1. Set up development, staging, and production databases
2. Configure environment variables
3. Set up database backup procedures
4. Implement monitoring and logging

This documentation provides a complete foundation for transitioning from mock data to a full database-backed CRM system.

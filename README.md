# Software Access Management System

A full-stack application for managing software access requests within an organization. The system implements role-based access control with three user roles: Admin, Manager, and Employee.

client url: https://leucine.netlify.app/

server url: https://leucine.onrender.com

## username password to test app:
### employee: 
username : testuser

pass: testpass

### manager: 
username : testmanager12

pass: testpass123

### admin: 
username : testadmin12

pass: testpass12

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Manager, Employee)
- Secure password hashing with bcrypt
- Protected routes based on user roles

### User Management
- User registration with role assignment
- User login with JWT token generation
- Role-based navigation and access control
- Secure logout functionality

### Software Management (Admin Only)
- Create new software entries
- Define software access levels
- Add software descriptions
- View all software listings

### Access Request System
- Employees can request access to software
- Specify access level requirements
- Provide reason for access request
- View request status

### Request Management (Managers & Admins)
- View pending access requests
- Approve or reject requests
- Filter requests by status
- Real-time request status updates

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeORM
- PostgreSQL
- JWT for authentication
- bcrypt for password hashing

### Frontend
- React
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd software-access-management
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Configure environment variables:
Create a `.env` file in the server directory with the following variables:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=software_access_db
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Create the database:
```sql
CREATE DATABASE software_access_db;
```

5. Run database migrations:
```bash
npm run typeorm migration:run
```

6. Install frontend dependencies:
```bash
cd ../client
npm install
```

7. Start the development servers:

In the server directory:
```bash
npm run dev
```

In the client directory:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - User login

### Software Management
- POST `/api/software` - Create new software (Admin only)
- GET `/api/software` - List all software

### Access Requests
- POST `/api/requests` - Submit access request
- PATCH `/api/requests/:id` - Update request status
- GET `/api/requests/pendingrequests` - Get pending requests

## User Roles and Permissions

### Admin
- Create and manage software entries
- View and manage all access requests
- Approve/reject access requests

### Manager
- View and manage access requests
- Approve/reject access requests

### Employee
- View available software
- Submit access requests
- View request status

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based middleware
- Protected API endpoints
- Secure password storage
- Input validation
- Error handling

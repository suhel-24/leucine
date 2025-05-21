# Software Access Management System - Project Plan

## Tech Stack

**Backend:**
- Node.js
- Express.js
- TypeORM
- PostgreSQL
- bcrypt
- JWT
- nodemon

**Frontend:**
- React (Vite or CRA)
- Axios
- React Router DOM
- TailwindCSS (optional for styling)

**Dev Tools:**
- ESLint + Prettier
- VSCode
- Postman (for testing APIs)

---

## Recommended File Structure

```
project-root/
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── entities/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   └── index.js
│   ├── database/
│   │   ├── migrations/
│   │   └── schema.sql
│   ├── .env
│   └── tsconfig.json
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── hooks/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── vite.config.js
│
└── README.md
```

---

User Entity
@Entity()
class User {
@PrimaryGeneratedColumn()

id: number;
@Column({ unique: true })
username: string;
@Column()
password: string;
@Column()
role: 'Employee' | 'Manager' | 'Admin';
}
Software Entity
@Entity()
class Software {
@PrimaryGeneratedColumn()
id: number;
@Column()
name: string;
@Column('text')
description: string;
@Column("simple-array")
accessLevels: string[]; // e.g., ["Read", "Write", "Admin"]
}
Request Entity
@Entity()
class Request {
@PrimaryGeneratedColumn()
id: number;
@ManyToOne(() => User)
user: User;
@ManyToOne(() => Software)
software: Software;
@Column()
accessType: 'Read' | 'Write' | 'Admin';
@Column('text')
reason: string;
@Column()

status: 'Pending' | 'Approved' | 'Rejected';
}



## Task Breakdown (Small + Testable)

### 🚀 Phase 1: Auth - Backend


2. **Configure TypeORM + PostgreSQL**
   - `ormconfig.js`
   - Test DB connection

3. **Create User Entity**
   - `User.js` in `entities/`

4. **Sign-Up Endpoint**
   - `POST /api/auth/signup`
   - Hash password with bcrypt
   - Return status

5. **Login Endpoint**
   - `POST /api/auth/login`
   - Validate password
   - Return JWT + role

6. **JWT Middleware**
   - Decode + attach user to `req`

7. **Role Middleware**
   - `isAdmin`, `isManager`, etc.

---

### ⚛️ Phase 2: Auth - Frontend

1. **Setup React App**
   - Setup routing

2. **Create Sign-Up Page**
   - Form with username/password
   - POST to `/api/auth/signup`

3. **Create Login Page**
   - Form with username/password
   - POST to `/api/auth/login`
   - Store JWT in localStorage

4. **Auth Context + Private Route**
   - Create context for auth
   - Redirect based on role

---

### 🧑‍💼 Phase 3: Role Redirect + Views

1. **Implement Role-based Routing**
   - Admin ➝ `/create-software`
   - Manager ➝ `/pending-requests`
   - Employee ➝ `/request-access`

---

### 🧱 Phase 4: Software - Backend

1. **Create Software Entity**
   - `Software.js` with accessLevels

2. **Add Software Endpoint**
   - `POST /api/software`
   - Admin only

---

### 🖥️ Phase 5: Software - Frontend

1. **Create Add Software Page**
   - Form for name, description, access levels

---

### 📝 Phase 6: Access Requests - Backend

1. **Create Request Entity**
2. **POST /api/requests**
   - Submit request
3. **PATCH /api/requests/:id**
   - Manager approves/rejects

---

### 🧾 Phase 7: Access Requests - Frontend

1. **Employee Request Page**
   - Dropdown for software
   - Select access level
   - Textarea for reason

2. **Manager Pending Requests Page**
   - Fetch + list requests
   - Approve/Reject buttons

---

## Final Deliverables

- ✅ Fully functional Node.js backend (with TypeORM)
- ✅ Secure JWT-based auth
- ✅ React frontend with role-based UI
- ✅ PostgreSQL database schema + migrations

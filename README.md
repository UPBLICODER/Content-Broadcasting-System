# Content Broadcasting System (CBS)

A modern web application for managing educational content submission, approval, and live broadcasting in schools. Built with Next.js 16, this system enables teachers to submit lesson content, principals to review and approve submissions, and students to access live broadcasts.

## 🎯 Features

### For Teachers

- **Content Submission**: Upload lesson materials with detailed metadata
- **Live Broadcasting**: Schedule and broadcast approved content to students
- **Content Management**: View and manage personal submissions
- **Real-time Status**: Track approval status of submitted content

### For Principals

- **Content Review**: Comprehensive dashboard to review all teacher submissions
- **Approval Workflow**: Approve or reject content with detailed feedback
- **Content Library**: Browse all content with advanced filtering
- **Live Monitoring**: Oversee active live broadcasts

### For Students

- **Live Access**: View currently active lesson broadcasts
- **Teacher Selection**: Browse content by teacher
- **Real-time Updates**: Automatic updates for live content status

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v3
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios with interceptors
- **State Management**: React Context API
- **Data Persistence**: File-based mock storage
- **Authentication**: JWT-based session management

## 📁 Project Structure

```
cbs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── approvals/     # Approval endpoints
│   │   │   └── content/       # Content management
│   │   ├── dashboard/         # Protected dashboard pages
│   │   │   ├── principal/     # Principal-specific pages
│   │   │   └── teacher/       # Teacher-specific pages
│   │   ├── live/              # Public live content pages
│   │   ├── login/             # Authentication page
│   │   └── page.js            # Home page
│   ├── components/            # Reusable UI components
│   │   ├── common/           # Shared components
│   │   ├── layout/           # Layout components
│   │   └── features/         # Feature-specific components
│   ├── context/              # React Context providers
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities and constants
│   ├── services/             # API service layer
│   └── styles/               # Global styles
├── mockData.json             # Mock data storage
├── package.json
├── tailwind.config.js
├── next.config.mjs
└── README.md
```

## 🛠 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cbs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 User Roles & Credentials

### Default Users

| Role      | Email                | Password     | Description                      |
| --------- | -------------------- | ------------ | -------------------------------- |
| Principal | principal@school.com | principal123 | Can approve/reject content       |
| Teacher 1 | alice@school.com     | teacher123   | Can submit and broadcast content |
| Teacher 2 | david@school.com     | teacher123   | Can submit and broadcast content |
| Teacher 3 | priya@school.com     | teacher123   | Can submit and broadcast content |

## 🎨 Key Features Implementation

### Authentication System

- JWT-based authentication with localStorage persistence
- Role-based access control (RBAC)
- Protected routes with automatic redirection
- Context-based state management

### Content Management

- File upload support with metadata
- Status tracking (pending → approved/rejected)
- Time-based live broadcasting
- Persistent storage using JSON file

### Live Broadcasting

- Real-time content availability checking
- Teacher-specific live sessions
- Automatic content rotation
- Student-friendly interface

### API Architecture

- RESTful API endpoints
- Service layer abstraction
- Error handling and validation
- Mock data persistence

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Code Quality
npm run lint         # Check code quality
```

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/login` - User authentication

### Content Management

- `GET /api/content` - Get all content
- `POST /api/content` - Create new content
- `GET /api/content/teacher/[id]` - Get teacher's content

### Approvals

- `GET /api/approvals/pending` - Get pending approvals
- `POST /api/approvals/[id]/approve` - Approve content
- `POST /api/approvals/[id]/reject` - Reject content

## 🎯 Assignment Requirements Compliance

✅ **Complete Implementation Coverage:**

1. **User Authentication & Authorization**
   - Multiple user roles (Principal, Teachers)
   - Protected routes based on roles
   - Session management

2. **Content Submission System**
   - Teachers can upload content with metadata
   - File handling and validation
   - Content status tracking

3. **Approval Workflow**
   - Principals can view all submissions
   - Approve/reject functionality
   - Status updates and notifications

4. **Live Broadcasting**
   - Time-based content activation
   - Teacher-specific live sessions
   - Student access to live content

5. **UI/UX Design**
   - Responsive design for all devices
   - Consistent design language
   - Intuitive navigation

6. **Data Persistence**
   - Mock data storage system
   - CRUD operations
   - Data integrity

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ using Next.js and modern web technologies**

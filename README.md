# Instagram Login Clone

A full-stack Instagram login clone built with Next.js (frontend) and Go (backend), using MongoDB as the database. Features a pixel-perfect Instagram UI with authentication.

## Features

- Instagram-like UI with gradient branding
- User registration and login
- JWT-based authentication
- Plain text password storage (for demo purposes)
- Responsive design for mobile and desktop
- MongoDB database integration
- Production-ready deployment configuration

## Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend
- **Go (Golang)** - Backend language
- **Gin** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication tokens

## Project Structure

```
Instagram-Login/
├── src/                    # Frontend (Next.js)
│   ├── app/
│   │   ├── login/         # Login page
│   │   ├── signup/        # Signup page
│   │   ├── home/          # Home page (after login)
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Landing page
│   │   └── globals.css    # Global styles
│   └── components/
│       └── InstagramLogo.tsx
├── backend/               # Backend (Go)
│   ├── config/           # Database configuration
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth middleware
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── utils/           # Utilities (JWT, password)
│   ├── main.go          # Entry point
│   └── go.mod           # Go dependencies
└── README.md
```

## Local Development Setup

### Prerequisites

- Node.js 18+ and npm
- Go 1.21+
- MongoDB (local or Atlas)

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create [.env.local](.env.local) file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

3. Run the development server:
```bash
npm run dev
```

Frontend will run on [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install Go dependencies:
```bash
go mod download
```

3. Create [.env](backend/.env) file:
```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
DB_NAME=instagram_clone
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

4. Run the backend server:
```bash
go run main.go
```

Backend will run on [http://localhost:8080](http://localhost:8080)

## API Endpoints

### Authentication

#### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe",
    "username": "johndoe",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### POST `/api/auth/login`
Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe",
    "username": "johndoe"
  }
}
```

#### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Instagram Clone API is running"
}
```

## Deployment

### Deploy Frontend to Vercel

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and import your repository

3. Configure environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL (will be set after deploying backend)

4. Deploy! Vercel will automatically detect Next.js and configure build settings

5. After deployment, you'll get a URL like: `https://your-app.vercel.app`

### Deploy Backend to Render

1. Push your code to GitHub

2. Go to [Render](https://render.com) and create a new Web Service

3. Connect your GitHub repository

4. Configure the service:
   - **Name**: instagram-clone-api
   - **Runtime**: Go
   - **Build Command**: `cd backend && go build -o main .`
   - **Start Command**: `cd backend && ./main`
   - **Root Directory**: Leave empty or set to `/`

5. Add environment variables in Render dashboard:
   - `PORT`: 8080
   - `MONGODB_URI`: `mongodb+srv://gk4201729_db_user:VZibYm2kkheXWIuM@cluster0.lhvo99x.mongodb.net/?appName=Cluster0`
   - `DB_NAME`: instagram_clone
   - `JWT_SECRET`: (generate a random secure key)
   - `FRONTEND_URL`: Your Vercel URL (e.g., `https://your-app.vercel.app`)

6. Deploy! Render will build and start your Go application

7. After deployment, copy your Render URL (e.g., `https://your-api.onrender.com`)

8. Go back to Vercel and update the `NEXT_PUBLIC_API_URL` environment variable with your Render URL

9. Redeploy your frontend on Vercel for the changes to take effect

### CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (local development)
- `https://*.vercel.app` (all Vercel deployments)
- The specific `FRONTEND_URL` from environment variables

### Important Notes for Deployment

1. **MongoDB Atlas**: Your MongoDB connection string is already configured. Make sure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Render's IP addresses to the whitelist.

2. **JWT Secret**: Generate a strong random string for production JWT_SECRET.

3. **Environment Variables**: Make sure all environment variables are set correctly on both Vercel and Render.

4. **Build Time**: First deployment on Render might take 5-10 minutes as it downloads Go dependencies.

5. **Free Tier**: Both Vercel and Render offer free tiers that are perfect for this project.

## Security Features

- JWT token-based authentication
- CORS protection
- Email and username uniqueness validation
- Password minimum length requirement (6 characters)
- Environment variable protection for secrets

**Note**: This is a demo project. Passwords are stored in plain text for simplicity. In production, always use proper password hashing like bcrypt or argon2.

## Screenshots

### Login Page
- Instagram-style login form
- Email/username and password fields
- Facebook login button (UI only)
- "Forgot password?" link
- Sign up redirection

### Signup Page
- Email, full name, username, password fields
- Terms and conditions notice
- Facebook signup button (UI only)
- Login redirection

### Home Page
- Authenticated user dashboard
- User profile display
- Logout functionality

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] OAuth integration (Google, Facebook)
- [ ] Profile picture upload
- [ ] User profile editing
- [ ] Posts and feed functionality
- [ ] Follow/unfollow system
- [ ] Like and comment features
- [ ] Real-time notifications

## License

MIT License - feel free to use this project for learning and personal projects.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and Go
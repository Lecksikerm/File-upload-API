Markdown
Fullscreen 
Download 
Fit
Code
Preview
User Authentication: JWT-based auth with bcrypt password hashing
File Upload: Cloudinary integration for secure cloud storage
Profile Management: Upload, update, delete profile pictures
Metadata Tracking: File size, type, upload date, Cloudinary URL
Validation: File type and size restrictions (5MB max, images only)
Security: Protected routes, input validation, secure file handling
🚀 Features
Node.js (v16+)
MongoDB (Local or Atlas)
Cloudinary Account (Free tier works)
📋 Prerequisites
1. Clone the repository
git clone 
cd file-upload-app/backend
🛠️ Installation
File Upload API with Metadata - Backend
Install dependencies
bash
Copy
npm install
Environment Setup
Create .env file:
env
Copy
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fileupload_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Get Cloudinary Credentials
Sign up at Cloudinary
Go to Dashboard
Copy Cloud Name, API Key, and API Secret
Start the server
bash
Copy
# Development
npm run dev

# Production
npm start
📚 API Documentation
Authentication Endpoints
Table
Copy
Method	Endpoint	Description	Auth Required
POST	/api/auth/register	Register new user	No
POST	/api/auth/login	Login user	No
GET	/api/auth/me	Get current user	Yes
File Upload Endpoints
Table
Copy
Method	Endpoint	Description	Auth Required
POST	/api/upload/profile	Upload profile picture	Yes
PUT	/api/upload/profile	Update profile picture	Yes
DELETE	/api/upload/profile	Delete profile picture	Yes
GET	/api/upload/profile/:userId	Get profile image (public URL)	No
GET	/api/upload/metadata	Get file metadata	Yes
Request/Response Examples
Register User
bash
Copy
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:
JSON
Copy
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
Upload Profile Picture
bash
Copy
POST /api/upload/profile
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- image: [file]
Response:
JSON
Copy
{
  "success": true,
  "message": "Profile picture uploaded successfully",
  "data": {
    "profilePicture": {
      "url": "https://res.cloudinary.com/.../image/upload/...",
      "originalName": "photo.jpg",
      "size": 2048576,
      "mimeType": "image/jpeg",
      "uploadedAt": "2026-02-26T14:30:00.000Z"
    }
  }
}
🏗️ Project Structure
plain
Copy
backend/
├── src/
│   ├── config/
│   │   ├── cloudinary.js    # Cloudinary configuration
│   │   └── database.js      # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── fileController.js    # File upload logic
│   ├── middleware/
│   │   └── auth.js          # JWT verification
│   ├── models/
│   │   └── User.js          # User schema with file metadata
│   ├── routes/
│   │   ├── authRoutes.js    # Auth routes
│   │   └── uploadRoutes.js  # Upload routes
│   └── server.js            # Express app entry
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
└── README.md                # This file
🔒 Security Features
Password Hashing: bcrypt with salt rounds
JWT Authentication: Secure token-based auth
File Validation: Type and size restrictions
Input Sanitization: Mongoose schema validation
CORS: Configured for frontend communication
🧪 Testing with cURL
bash
Copy
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Upload (replace TOKEN and FILE_PATH)
curl -X POST http://localhost:5000/api/upload/profile \
  -H "Authorization: Bearer TOKEN" \
  -F "image=@/path/to/image.jpg"
🚀 Deployment
Deploy to Render/Railway/Heroku
Set Environment Variables in hosting platform:
MONGODB_URI
JWT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
Update CORS in server.js if needed:
JavaScript
Copy
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
Add start script in package.json:
JSON
Copy
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
📝 Environment Variables Reference
Table
Copy
Variable	Description	Required
PORT	Server port (default: 5000)	No
MONGODB_URI	MongoDB connection string	Yes
JWT_SECRET	Secret key for JWT signing	Yes
CLOUDINARY_CLOUD_NAME	Cloudinary cloud name	Yes
CLOUDINARY_API_KEY	Cloudinary API key	Yes
CLOUDINARY_API_SECRET	Cloudinary API secret	Yes
NODE_ENV	Environment (development/production)	No
🤝 Frontend Integration
This backend is designed to work with the React frontend in the /frontend directory.
Base URL for API calls:
JavaScript
Copy
const API_URL = 'http://localhost:5000/api'; // Development
const API_URL = 'https://your-api-domain.com/api'; // Production
📄 License
MIT License - feel free to use this project for personal or commercial purposes.
👨‍💻 Author
Kareem Idris
GitHub: @Lecksikerm
Email: idrisolalekann@gmail.com
Happy Coding! 🚀
plain
Copy

## Also Create `.gitignore` for Backend

**`backend/.gitignore`**:
Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
Logs
logs/
*.log
Runtime data
pids/
*.pid
*.seed
*.pid.lock
Coverage directory used by tools like istanbul
coverage/
Uploads (if any local storage)
uploads/
Misc
.DS_Store
.idea/
.vscode/
*.swp
*.swo

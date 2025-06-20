# Examify - Online Examination Platform 🧠📚

Examify is a secure and efficient online examination platform built using the MERN stack (MongoDB, Express, React, Node.js). It is designed to provide a seamless experience for conducting online exams while implementing robust anti-cheating mechanisms and automated certificate generation.


## Features

- Student registration and login
- Test creation and management by admin
- Full-screen enforced exam interface
- **Anti-cheating system**:
  Tab switch detection, Auto-submission after repeated violations

- **PDF Certificate generation** for passing candidates
- Responsive UI built with Tailwind CSS & React
- Authentication with JWT
- Protected routes and roles (student/admin)



## Technical Details

**Frontend:** React, Tailwind CSS, Vite, React Router DOM, Axios, Framer Motion, Lucide React

**Backend:** Node.js, Express

**Database:** MongoDB

**Authentication:** JSON Web Tokens (JWT)

**Password Hashing:** bcrypt

**CORS:** Enabled for cross-origin resource sharing

**PDF Generation:** PDFKit

**Testing:**  APIs tested using Postman


## API Endpoints 


#### 🧑‍💼 Auth

```http
  POST   /api/auth/register         # Register new user
  POST   /api/auth/login            # Login user
```

#### 📝 Exams

```http
  POST   /api/exams/                # Create new exam
  GET    /api/exams/                # Get exams for logged-in user
  GET    /api/exams/all             # Get all exams (admin)
  GET    /api/exams/:id             # Get specific exam by ID
  POST   /api/exams/submit          # Submit exam
  GET    /api/exams/results         # Get results (user-specific or admin)
  DELETE /api/exams/delete/:id      # Delete exam (admin)
```
#### 📊 Results

```http
  GET    /api/results/              # Get exam results
  GET    /api/results/certificate/:resultId   # Generate certificate by result ID
```

#### 🎓 Certificate

```http
  POST   /api/certificate/generate  # Generate certificate for passing student

```


## 🛡️ Security Features

- **Protected Window:** Exam content is only visible in full-screen mode.
- **Tab Switch Detection:** System tracks tab switches; crossing a certain count triggers **auto-submission.**
- **PDF Certificates:** Automatically generated and downloadable after passing.
- **JWT Authentication:** Secure access to user-specific routes.
- **Role-based Access:** Admin vs Student permissions.



## Run Locally

Clone the project

```bash
  git clone https://github.com/diveshsaini1991/examify.git
  cd examify
```
Go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

create **config.env file** using **```config.env.example```**


Go to the frontend directory 

```bash
  cd ../frontend
```

Install dependencies

```bash
  npm install
```

Go back to root directory 

```bash
  cd ..
```

Start the project  

```bash
  npm run start
```

Start the project in dev mode

```bash
  npm run dev
```



## Demo

Demo link - will be here soon ...



## Contributing to the Examify 🤝

We welcome and appreciate contributions from the community to enhance and improve the Examify . Whether you're a developer, designer, tester, or someone with valuable feedback, your input is valuable.
## Thank You!❤️

Thank you for considering contributing to the Examify. Your efforts help make this project better for everyone. If you have any questions or need assistance, feel free to reach out through the issue tracker or discussions. Happy coding🤩!

<div align="center">

# EXAMIFY

Empowering Digital Assessments for Every Learner  
![last commit](https://img.shields.io/badge/last_commit-september-blue)
![javascript](https://img.shields.io/badge/javascript-99%25-yellow)
![languages](https://img.shields.io/badge/languages-1-blue)

_Built with the tools and technologies:_  
![Express](https://img.shields.io/badge/Express-black?logo=express&logoColor=white&style=flat)
![JSON](https://img.shields.io/badge/JSON-black?logo=json&logoColor=white&style=flat)
![Markdown](https://img.shields.io/badge/Markdown-black?logo=markdown&logoColor=white&style=flat)
![Socket.io](https://img.shields.io/badge/Socket.io-black?logo=socketdotio&logoColor=white&style=flat)
![npm](https://img.shields.io/badge/npm-red?logo=npm&logoColor=white&style=flat)
![Mongoose](https://img.shields.io/badge/Mongoose-red?logo=mongoose&logoColor=white&style=flat)
![.ENV](https://img.shields.io/badge/.ENV-yellow?logo=dotenv&logoColor=black&style=flat)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?logo=javascript&logoColor=black&style=flat)
![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb&logoColor=white&style=flat)
![React](https://img.shields.io/badge/React-blue?logo=react&logoColor=white&style=flat)
![Vite](https://img.shields.io/badge/Vite-blueviolet?logo=vite&logoColor=white&style=flat)
![ESLint](https://img.shields.io/badge/ESLint-blueviolet?logo=eslint&logoColor=white&style=flat)
![Axios](https://img.shields.io/badge/Axios-blueviolet?logo=axios&logoColor=white&style=flat)
![PDFKit](https://img.shields.io/badge/PDFKit-blue?logo=pdf&logoColor=white&style=flat)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Features](#features)
- [Technical Details](#technical-details)
- [API Endpoints](#api-endpoints)
- [Security Features](#security-features)
- [Run Locally](#run-locally)
- [Demo](#demo)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

---

## Overview

Examify is a modern online examination platform built on the MERN stack, optimized for secure, real-time assessments. With automated anti-cheating systems, instant PDF certificate generation, and a smooth user experience, Examify aims to bring trust and efficiency to digital exams.

---

## Getting Started

Clone the repository and follow the steps in [Run Locally](#run-locally) to set up the project in minutes.

---

## Features

- **Anti-cheating system:** Tab-switch detection, auto-submission after violations
- **Student and Admin roles:** With tailored dashboards and features
- **Real-time exam management:** Live status, submissions, and results
- **Automated PDF certificate generation** for passing candidates
- **Responsive UI:** Works seamlessly on desktop and mobile
- **Secure authentication:** JWT-based login and role-based protected routes

---

## Technical Details

- **Frontend:** React, Tailwind CSS, Vite, React Router DOM, Axios, Framer Motion, Lucide React
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **Certificate generation:** PDFKit
- **Testing:** APIs verified using Postman
- **Other:** Full CORS support, strict ESLint for code quality

---

## API Endpoints

#### Auth

```http
  POST   /api/auth/register         # Register new user
  POST   /api/auth/login            # Login user
```

#### Exams

```http
  POST   /api/exams/                # Create new exam
  GET    /api/exams/                # Get exams for logged-in user
  GET    /api/exams/all             # Get all exams (admin)
  GET    /api/exams/:id             # Get specific exam by ID
  POST   /api/exams/submit          # Submit exam
  GET    /api/exams/results         # Get results (user-specific or admin)
  DELETE /api/exams/delete/:id      # Delete exam (admin)
```

#### Results

```http
  GET    /api/results/              # Get exam results
  GET    /api/results/certificate/:resultId   # Generate certificate by result ID
```

#### Certificate

```http
  POST   /api/certificate/generate  # Generate certificate for passing student

```

---

## Security Features

- **Protected Window:** Enforces full-screen, exam locks on window/tab loss
- **Tab Switch Detection:** Tracks and limits tab switches, triggers auto-submit
- **JWT Secured APIs:** Verifies user identities and roles for each request
- **Role-based Access:** Admin and Student features separated at both backend/API and frontend

---

## Run Locally

**Clone the repository:**

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

create **.env file** using **`.env.example`**

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

---

## Demo

Demo link - coming soon...

---

## Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started with contributing. Examify welcomes new features, bug fixes, and feedback from all contributors.

---

## Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md) to foster a productive and inclusive community.

---

## License

Examify is licensed under the [MIT License](LICENSE).  
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg) ![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)

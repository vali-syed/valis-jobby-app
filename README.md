# Jobby App

A modern, responsive job portal built with React.  
Users can search jobs, apply filters, view detailed job descriptions, and manage their profile.

---

##  Features

-  Authentication & protected routes  
-  Home page with navigation  
-  Job search & filtering  
-  Detailed job view  
-  Profile section  
-  Failure & retry handling  
-  Fully responsive UI  

---

##  Getting Started

### Prerequisites
- Node.js  
- npm  

### Installation

```bash
git clone https://github.com/vali-syed/valis-jobby-app.git
cd valis-jobby-app
npm install
npm start
```

Open  `http://localhost:3000`

---

##  Routes

| Route | Description |
|------|-------------|
| `/login` | Login page |
| `/` | Home page |
| `/jobs` | Jobs listing with filters |
| `/jobs/:id` | Individual job details |
| `/profile` | User profile |
| `*` | Not found |

---

##  Project Structure

```
src/
├── components/
│   ├── Header/
│   ├── Home/
│   ├── Login/
│   ├── Jobs/
│   ├── JobDetails/
│   ├── JobsCard/
│   ├── FiltersGroup/
│   ├── ProfileDetailsComp/
│   ├── ProtectedRoute/
│   └── NotFound/
│
├── App.js
├── index.js
└── App.css
```

---

##  Key Concepts Implemented

- JWT authentication  
- API integration  
- Dynamic routing  
- State management with React hooks  
- Loading / failure / success views  
- Reusable components  

---

##  Tech Stack

- React  
- React Router DOM  
- REST APIs  
- CSS  

---

##  Project Purpose

This project simulates a real-world job platform where:

- routes are protected  
- job id comes from URL  
- data is fetched from APIs  
- multiple UI states are handled  

Ideal for frontend practice and interviews.

---

##  Author

**Vali Syed**  
GitHub: https://github.com/vali-syed

---

⭐ Star this repo if you find it helpful!

# CrowdFundX

CrowdFundX is a high-fidelity crowdfunding platform designed to empower individuals and organizations to raise funds for medical, educational, and disaster relief causes.

## 📂 Project Structure

This repository is split into two main components:

### 1. [Frontend](./frontend)
- **Tech**: React, Vite, Tailwind CSS.
- **Status**: Standalone / Isolated.
- **Description**: A premium, interactive UI for browsing and creating campaigns. It currently uses `localStorage` for data persistence to remain fully portable and backend-agnostic.

### 2. [Backend](./backend)
- **Tech**: Java, Spring Boot, JPA, H2.
- **Status**: Independent API.
- **Description**: A professional Spring Boot backend providing RESTful APIs, MVC architecture, and automated data seeding. Ready for future integration.

## 🚀 Quick Start

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```

### Running the Backend
```bash
cd backend
./mvnw spring-boot:run
```

## 📐 System Architecture
The project is designed with a decoupled architecture, allowing the frontend to be tested in isolation while the backend provides a robust foundation for production-level features.

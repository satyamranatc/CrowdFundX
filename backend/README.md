# CrowdFundX Backend

A professional, production-ready Spring Boot backend for the CrowdFundX platform. This backend implements a robust MVC (Model-View-Controller) architecture to manage campaigns, users, and donations.

## 🚀 Tech Stack
- **Framework**: Spring Boot 3.3.0+
- **Language**: Java 17+
- **Database**: H2 (In-memory, zero-config)
- **ORM**: Spring Data JPA / Hibernate
- **Boilerplate Reduction**: Lombok
- **Tools**: Maven, Spring DevTools

## 🏗️ Architecture
The project follows a standard layered architecture:
- `com.crowdfundx.backend.model`: JPA Entities (User, Campaign, Donation, Update).
- `com.crowdfundx.backend.repository`: Data access interfaces.
- `com.crowdfundx.backend.service`: Business logic layer.
- `com.crowdfundx.backend.controller`: REST Controllers with Cross-Origin support.
- `com.crowdfundx.backend.component`: Data initialization and utilities.

## 📡 API Endpoints

### Campaigns
- `GET /api/campaigns`: Fetch all campaigns.
- `GET /api/campaigns?category=Medical`: Filter by category.
- `GET /api/campaigns/{id}`: Get campaign details.
- `POST /api/campaigns`: Create a new campaign.
- `POST /api/campaigns/{id}/donate`: Contribute to a campaign.

### Users
- `GET /api/users`: List all users.
- `POST /api/users`: Create/Register a user.

## 🛠️ Getting Started

### Prerequisites
- JDK 17 or higher
- Maven (or use the provided `./mvnw` wrapper)

### Running the Application
1. Clone the repository and navigate to the `backend` folder.
2. Run the following command:
   ```bash
   ./mvnw spring-boot:run
   ```
3. The server will start on `http://localhost:8080`.

### Database Console
You can inspect the in-memory database at:
- **URL**: `http://localhost:8080/h2-console`
- **JDBC URL**: `jdbc:h2:mem:crowdfunddb`
- **User**: `sa`
- **Password**: (leave empty)

## 📁 Project Structure
```text
backend/
├── src/main/java/com/crowdfundx/backend/
│   ├── component/      # Data Seeding
│   ├── controller/     # API Endpoints
│   ├── model/          # JPA Entities
│   ├── repository/     # Data Access
│   └── service/        # Business Logic
├── src/main/resources/
│   └── application.properties  # Database & App Config
└── pom.xml             # Dependencies
```

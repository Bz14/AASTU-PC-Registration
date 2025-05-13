# AASTU PC Registration System

## Overview

The PC Registration System is designed to prevent the unauthorized removal of student PCs from campus. Each PC is registered under the corresponding student's details, ensuring security and accountability. The system features two primary user roles: Super Admin and Admin (security personnel), providing tailored tools for effective management and verification.

## Technologies Used

 **Frontend:** 
  - **React**: A JavaScript library for building user interfaces.
  - **Vite**: A fast build tool and development server for modern web projects.
  - **Tailwind CSS**: A utility-first CSS framework for styling.

- **Backend:** 
  - **Javascript**: A popular server-side scripting language.
  - **ExpressJs**: A powerful Javascript framework for building web applications.

## Features

- User roles for Super Admin and Admin.
- Registration of PCs with unique serial numbers.
- Verification of PCs during campus exit checks.
- Responsive design for seamless user experience.

## Installation

### Frontend

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pc-registration-system/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Navigate to the backend directory:
   ```bash
   cd pc-registration-system/backend
   ```

2. Install Composer dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## Usage

- Access the frontend application via `http://localhost:5173` (or the port specified by Vite).
- Access the backend API via `http://localhost:8000` (or the port specified by Laravel).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to contribute to the project.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to the contributors for their valuable input and efforts in bringing this project to life.
- Special thanks to the communities of React, Vite, Tailwind CSS, PHP, and Laravel for their resources and support.


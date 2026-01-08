# GarmentFlow - Premium Apparel Management Platform (Client)

**GarmentFlow** is a state-of-the-art, full-stack apparel management web application designed to streamline the workflow between Buyers, Managers, and Administrators. Built with a focus on premium aesthetics and user experience, the client-side application utilizes a modern "Glassmorphism" design system, seamless animations, and robust role-based functionality.

| Home Page | Admin Dashboard |
| :---: | :---: |
| ![Home Page](./screenshots/home-page.png) | ![Admin Dashboard](./screenshots/admin-dash.png) |

**Live Site:**
[https://garments-flow.vercel.app/](https://garments-flow.vercel.app/)  
**Client Repo:**
[https://github.com/ashikurahman1/garments-flow-c](https://github.com/ashikurahman1/garments-flow-c)  
**Server Repo:**
[https://github.com/ashikurahman1/garments-flow](https://github.com/ashikurahman1/garments-flow)
## Key Features

---

## Key Features

### User Interface & Experience
-   **Premium Glassmorphism Design**: A custom design system featuring translucent glass cards, vibrant gradients, and sophisticated typography (Inter & Outfit).
-   **Modern Animations**: Powered by **Framer Motion** for smooth transitions, entry effects, and interactive elements.
-   **Responsive & Adaptive**: Fully optimized for Desktop, Tablet, and Mobile devices using **Tailwind CSS**.
-   **Dark/Light Mode**: (Architecture ready) Semantic color system using OKLCH tailored for dynamic theming.

### Authentication & Security
-   **Secure Login/Registration**: Email/Password and Google Sign-In support via **Firebase Authentication**.
-   **JWT Integration**: Secure API communication with interceptors for automatic token attachment.
-   **Role-Based Access Control (RBAC)**: secure routing that restricts access to specific Dashboard views (Admin/Manager/Buyer).

### Comprehensive Dashboards
-   **Admin Dashboard**:
    -   Manage all Users (Promote/Suspend)
    -   Oversee Platform-wide Products & Orders
    -   System Statistics
-   **Manager Dashboard**:
    -   Add/Edit/Delete Products
    -   Manage Incoming Orders (Approve/Reject)
    -   Update Shipping Status & Tracking
-   **Buyer Dashboard**:
    -   Browse & Filter Products
    -   Place Orders
    -   Track Order Status (Timeline view)
    -   Manage Profile & Reviews

---

## Technology Stack

-   **Framework**: [React](https://reactjs.org/) (Vite)
-   **language**: JavaScript (ES6+)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4 (alpha variables), [PostCSS](https://postcss.org/)
-   **State Management**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
-   **Routing**: [React Router v6](https://reactrouter.com/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/)
-   **UI Components**: [Headless UI](https://headlessui.com/), [Radix UI](https://www.radix-ui.com/), [Tabler Icons](https://tabler-icons.io/)
-   **Utilities**: [Axios](https://axios-http.com/), [SweetAlert2](https://sweetalert2.github.io/), [Day.js](https://day.js.org/)

---

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites
-   **Node.js** (v16 or higher)
-   **npm** or **yarn**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/garmentflow.git
    cd garmentflow/client
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root of the `client` directory and add the following keys:
    ```env
    VITE_API_URL=http://localhost:5000
    VITE_apiKey=your_firebase_api_key
    VITE_authDomain=your_firebase_auth_domain
    VITE_projectId=your_firebase_project_id
    VITE_storageBucket=your_firebase_storage_bucket
    VITE_messagingSenderId=your_sender_id
    VITE_appId=your_app_id
    VITE_IMGBB_API=your_imgbb_api_key
    VITE_PAYMENT_GATEWAY_PK=your_stripe_publishable_key
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The app will run at `http://localhost:5173`.

---

## Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components (Buttons, Modals, etc.)
│   ├── hooks/           # Custom React hooks (useAuth, useAxiosSecure, etc.)
│   ├── layouts/         # Main & Dashboard layouts
│   ├── pages/           # Application views (Home, Login, Dashboard Routes)
│   ├── providers/       # Context Providers (Auth, QueryClient)
│   ├── routes/          # Navigation & Route definitions
│   ├── shared/          # Shared layout components (Navbar, Footer)
│   ├── index.css        # Global styles & Tailwind configuration
│   └── main.jsx         # Application entry point
├── package.json
└── vite.config.js
```

---

## Scripts

-   `npm run dev`: Start the development server.
-   `npm run build`: Build the app for production.
-   `npm run lint`: Run ESLint to check for code quality issues.
-   `npm run preview`: Preview the production build locally.

---

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any feature enhancements or bug fixes.

---



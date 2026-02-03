# FoodHub - Frontend (Client)
# Discover & Order Delicious Meals

FoodHub is a modern, full-stack meal ordering platform built with Next.js 14. It features a robust role-based dashboard system, utilizing Parallel Routes and Slots to provide seamless experiences for Admins, Providers, and Customers.

# Features
Role-Based Access Control (RBAC): Dedicated interfaces for Admin, Provider, and Customer roles.

Parallel Routing & Slots: Optimized layout management using @admin, @customer, and @provider slots.

Responsive Dashboard: Fully responsive sidebar and data tables built with Shadcn/UI.

Secure Authentication: JWT-based persistent login and secure registration flow.

Modern UI/UX: Interactive toast notifications with Sonner and beautiful iconography with Lucide React.

Dynamic Data Handling: Real-time feedback using Server Actions and optimized Fetch API.

# Tech Stack
Framework: Next.js 14 (App Router)

Styling: Tailwind CSS

UI Components: Shadcn/UI

Icons: Lucide React

Data Fetching: Fetch API & Server Actions

Notifications: Sonner

# Key Routes 
#Route	      Page	                     Access
/          	Home Page	                 Public
/login	    Authentication	          Public
/register	  Registration	            Public
/admin	    Admin Dashboard	         Admin Only
/provider	  Menu Management	         Provider Only
/meals	    Browse Menu	All             Users

# Installation & Setup
Clone the repository:git clone https://github.com/your-username/foodhub-frontend.git

Configure Environment Variables: Create a .env.local file in the root directory: NEXT_PUBLIC_BACKEND_HOST_URL="http://localhost:5000"

💡 Project Structure Note
The project uses the Next.js App Router structure. Dashboards are managed within the dashboard/layout.tsx using parallel routes to ensure that different user roles see their respective content without unnecessary page reloads.


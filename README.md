# Car Service Hub

Car Service Hub is a modern, responsive platform for booking car services, inspired by professional transport and logistics systems. Built with native PHP 8.3.12 (CLI) and PDO MySQL, it features a beautiful interface, robust booking flow, and an admin dashboard for service management.

## Vision & Inspiration

Car Service Hub is designed to evoke the professionalism of taxi-pickup systems and logistics dashboards. The goal is to create a trustworthy, modern interface with clean lines, card-based layouts, and professional aesthetics.

## Features

### First Version
- **Hero Section with Booking Form:** Prominently placed for quick access.
- **Service Listings with Filtering:** Filter by pickup/dropoff locations, vehicle types, and dates.
- **Service Cards:** Showcase transport options, pricing, and details.
- **Booking Flow:** Basic booking with form validation.
- **Passenger Service Detail Pages:** Detailed view for each service.
- **Admin Dashboard:** Manage services, bookings, and view analytics.
- **Responsive Design:** Optimized for both mobile and desktop.

## Design System

- **Colors:** Deep blue primary (`#1e40af`) with orange accents (`#f97316`) for trust and energy.
- **Gradients:** Subtle blue gradients for hero and highlight sections.
- **Typography:** Clean, professional fonts with clear hierarchy.
- **Animations:** Smooth hover effects and gentle transitions.
- **Style:** Modern, clean, card-based layouts.

## Tech Stack

- **Backend:** Native PHP 8.3.12 (CLI)
- **Database:** MySQL (PDO connection)
- **Frontend:** Tailwind CSS for modern, responsive UI
- **Build Tool:** Vite

## Getting Started

### Prerequisites

- PHP 8.3.12 (CLI)
- MySQL server
- Node.js & npm (for frontend assets)
- Composer (optional, for PHP dependencies)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/sisovin/car-service-hub.git
   cd car-service-hub
   ```

2. **Install frontend dependencies:**
   ```sh
   npm install
   ```

3. **Build frontend assets:**
   ```sh
   npm run build
   ```

4. **Set up the database:**
   - Create a MySQL database and user.
   - Import the provided SQL schema (if available).
   - Configure your database credentials in a `.env` or config file.

5. **Run the PHP backend:**
   ```sh
   php -S localhost:8000 -t public
   ```

6. **Access the app:**
   - Open [http://localhost:8000](http://localhost:8000) in your browser.

## Folder Structure

```
src/
  components/         # React components (UI, forms, cards)
  lib/                # Utility functions
  stories/            # Storybook stories for UI components
  types/              # Type definitions
public/               # Static assets
index.html            # Main HTML file
package.json          # Project metadata and scripts
tailwind.config.js    # Tailwind CSS configuration
vite.config.ts        # Vite build configuration
```

## Booking Flow

1. **Customer selects pickup/dropoff locations, vehicle type, and date.**
2. **Available services are filtered and displayed as cards.**
3. **Customer fills out the booking form.**
4. **Form validation ensures all required fields are completed.**
5. **Booking is submitted and stored in the database.**
6. **Admin can view and manage bookings via the dashboard.**

## Admin Dashboard

- Manage service listings (add, edit, remove)
- View and manage bookings
- Analytics and reporting (future versions)

## Customization

- **Colors, gradients, and typography** can be adjusted in tailwind.config.js.
- **Service types, locations, and pricing** are managed via the admin dashboard or database.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and new features.

## License

MIT License

## Contact
For any questions or feedback, please contact the project maintainer at [sisovin](mailto:sisovin@outlook.com).


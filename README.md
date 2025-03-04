# SpeedX

## Overview
SpeedX is a ride-hailing web application built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It replicates core Uber-like features, enabling users to book rides, track drivers in real-time, and make secure payments.

## Features
- **User Authentication** – Signup/Login for riders and drivers.
- **Real-time Ride Booking** – Users can request rides, and nearby drivers can accept them.
- **Live Location Tracking** – Google Maps API integration for real-time driver and ride tracking.
- **Ride Fare Calculation** – Dynamic fare estimation based on distance and demand.
- **Payment Integration** – Secure online payments (Stripe/PayPal integration optional).
- **Ride History & Reviews** – Users and drivers can view past rides and leave feedback.
- **Admin Dashboard** – Manage users, drivers, and ride statistics.

## Tech Stack
### Frontend:
- **React.js** (Vite for fast build)
- **Tailwind CSS** (for styling)
- **Google Maps API** (for tracking)

### Backend:
- **Node.js** with **Express.js**
- **MongoDB** (NoSQL database)
- **Socket.io** (for real-time ride updates)

### Additional Tools:
- **JWT Authentication** (JSON Web Tokens for secure login)
- **Stripe/PayPal API** (for payments)

## Setup Instructions
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/SpeedX.git
   ```
2. **Install dependencies:**
   ```sh
   cd SpeedX
   npm install
   ```
3. **Start the backend:**
   ```sh
   cd backend
   npm start
   ```
4. **Start the frontend:**
   ```sh
   cd frontend
   npm run dev
   ```

## Future Enhancements
- Add **ride-sharing** (pooling feature)
- Implement **AI-based fare estimation**
- Support for **multiple cities**

## Contributing
Feel free to fork the repository and submit pull requests to improve the project.

## License
This project is licensed under the **MIT License**.




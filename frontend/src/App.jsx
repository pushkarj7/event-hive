import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "./store/EventContext";

import MainLayout from "./member1/layouts/MainLayout";
import Home from "./member1/pages/Home";
import Events from "./member1/pages/Events";
import EventDetails from "./member1/pages/EventDetails";
import CreateEvent from "./member2/pages/CreateEvent";
import Booking from "./member1/pages/Booking";

import Login from "./member2/pages/Login";
import Register from "./member2/pages/Register";
import Dashboard from "./member2/pages/Dashboard";
import MyBookings from "./member2/pages/MyBookings";
import Profile from "./member2/pages/Profile";
import NotFound from "./member2/pages/NotFound";
import BookingCancelled from "./member2/pages/BookingCancelled";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAppStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/events" element={<MainLayout><Events /></MainLayout>} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected — only after login */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
        <Route path="/booking/:id" element={<ProtectedRoute><Booking /></ProtectedRoute>} />

        <Route path="/BookingOverview" element={<Navigate to="/dashboard" replace />} />
        <Route path="/booking-cancelled" element={<BookingCancelled />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

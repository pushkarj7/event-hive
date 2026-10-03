import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "./store/EventContext";

import MainLayout from "./member1/layouts/MainLayout";
import Home from "./member1/pages/Home";
import Events from "./member1/pages/Events";
import EventDetails from "./member1/pages/EventDetails";
import Artists from "./member1/pages/Artists";
import Experiences from "./member1/pages/Experiences";
import Booking from "./member1/pages/Booking";
import AboutUs from "./member1/pages/AboutUs";
import ContactUs from "./member1/pages/ContactUs";
import Faqs from "./member1/pages/Faqs";
import HelpCenter from "./member1/pages/HelpCenter";
import TermsConditions from "./member1/pages/TermsConditions";
import LegalPrivacy from "./member1/pages/LegalPrivacy";
import RefundPolicy from "./member1/pages/RefundPolicy";

import Login from "./member2/pages/Login";
import Register from "./member2/pages/Register";
import Dashboard from "./member2/pages/Dashboard";
import MyBookings from "./member2/pages/MyBookings";
import Profile from "./member2/pages/Profile";
import Wishlist from "./member2/pages/Wishlist";
import CreateEvent from "./member2/pages/CreateEvent";
import NotFound from "./member2/pages/NotFound";
import BookingCancelled from "./member2/pages/BookingCancelled";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAppStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main pages with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/privacy" element={<LegalPrivacy />} />
          <Route path="/refund" element={<RefundPolicy />} />
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard & Member2 pages */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route path="/BookingOverview" element={<Navigate to="/dashboard" replace />} />
        <Route path="/booking-cancelled" element={<BookingCancelled />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./member1/layouts/MainLayout";

import Home from "./member1/pages/Home";
import EventDetails from "./member1/pages/EventDetails";

import LoginForm from "./member1/components/LoginForm";
import Register from "./member2/pages/Register";
import Dashboard from "./member2/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/event/:id"
          element={<EventDetails />}
        />

        <Route
          path="/login"
          element={<LoginForm />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
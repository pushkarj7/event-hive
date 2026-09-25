// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./member1/layouts/MainLayout";
import Home from './member1/pages/Home';
import EventDetails from "./member1/pages/EventDetails";
import LoginForm from './member1/components/LoginForm';

function App() {
return(
  <BrowserRouter>
  <MainLayout>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/event/:id" element={<EventDetails />} />
    <Route path="/login" element={<LoginForm />} />
  </Routes>
  </MainLayout>
  </BrowserRouter>
);
}
export default App;

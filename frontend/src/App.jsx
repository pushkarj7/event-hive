// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./member1/layouts/MainLayout";
import Home from './member1/pages/Home';
import LoginForm from './member1/components/LoginForm';
import Register from "./member2/pages/Register";
function App() {
return(
  <BrowserRouter>
  <MainLayout>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<Register />} />
  </Routes>
  </MainLayout>
  </BrowserRouter>
);
}
export default App

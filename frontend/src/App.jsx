// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./member1/layouts/MainLayout";
import Home from './member1/pages/Home';
function App() {
return(
  <BrowserRouter>
  <MainLayout>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
  </MainLayout>
  </BrowserRouter>
);
}
export default App

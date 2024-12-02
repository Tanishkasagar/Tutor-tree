import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tutors from './pages/Tutors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyEnrollments from './pages/MyEnrollments';
import Enrollment from './pages/Enrollment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/alltutors" element={<Tutors />} />
        <Route path="/tutors/:speciality" element={<Tutors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/enrollment/:tutId" element={<Enrollment />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App; 
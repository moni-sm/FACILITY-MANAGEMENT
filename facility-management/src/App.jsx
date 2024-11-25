import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';  
import Signup from './pages/Signup';  
import Profile from './pages/Profile'; 
import PrivateRoute from './components/PrivateRoute';  
import Admin from './pages/Admin';
import ServiceDetails from './components/ServiceDetails';
import ServiceList from './components/ServiceList';

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="services/:id" element={<ServiceDetails />} />

          {/* Protect Admin Route with PrivateRoute */}
          <Route
            path="/admin"
            element={
              <PrivateRoute isAdmin={true}>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

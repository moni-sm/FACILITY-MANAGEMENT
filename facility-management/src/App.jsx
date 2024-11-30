import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';  
import ClientProfile from './pages/ClientProfile';
import ProviderProfile from './pages/ProviderProfile';
import SignupForm from './components/SignupForm';   
import PrivateRoute from './components/PrivateRoute';  
import Admin from './pages/Admin';
import ServiceDetails from './components/ServiceDetails';
import ServiceList from './components/ServiceList';
import ForgotPassword from './components/ForgetPassword';

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
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/client-profile" element={<ClientProfile />} />
          <Route path="/provider-profile" element={<ProviderProfile />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
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

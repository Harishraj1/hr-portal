import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import './styles/custom.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute';
import CandidateVisualisation from './pages/CandidateVisualisation';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Jobs from './pages/Jobs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/visualisation" element={<CandidateVisualisation />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

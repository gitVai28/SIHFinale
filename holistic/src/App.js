import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Predictions from './pages/Predictions';
import TimeSeriesAnalysis from './pages/TimeSeriesAnalysis';
import Admin from './pages/Admin';
import Keywords from './pages/DisasterKeywordsManagement';
import Alerts from './pages/DisasterAlert';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="relative w-full h-screen">
        {/* Global Header */}
        <div className="absolute top-0 left-0 w-full z-20">
          <Header />
        </div>

        {/* Routes Container */}
        <div className="absolute top-[64px] left-0 w-full h-[calc(100%-64px)] overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/time-series-analysis" element={<TimeSeriesAnalysis />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route
              path="/admin"
              element={<Admin setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/admin/alerts"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
      
                  <Alerts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/keywords"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
      
                  <Keywords />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
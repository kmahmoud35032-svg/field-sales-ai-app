import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import MapPage from './pages/MapPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        // For demo purposes, allow access even without token if needed, or redirect
        // return <Navigate to="/login" replace />;
        return children; // Allow for now since backend isn't running to give token
    }
    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/" element={
                    <ProtectedRoute>
                        <Layout>
                            <Outlet />
                        </Layout>
                    </ProtectedRoute>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="map" element={<MapPage />} />
                    <Route path="visits" element={<div className="p-4">Visits Page (Coming Soon)</div>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

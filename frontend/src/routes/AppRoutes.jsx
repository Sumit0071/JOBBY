import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/protectedRoute';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { Home } from '../pages/Home';

import JobsPage from '../pages/JobsPage';
import CreateJobPage from '../pages/CreateJobPage';


const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={<Home />} />

        <Route
            path="/jobs"
            element={
                <ProtectedRoute roles={['Admin', 'Viewer']}>
                    <JobsPage />
                </ProtectedRoute>
            }
        />
        <Route
            path="/home"
            element={
                <ProtectedRoute roles={['Admin']}>
                    <CreateJobPage />
                </ProtectedRoute>
            }
        />
        {/* <Route path="/jobs" element={<JobsPage />} /> */}

    </Routes>
);

export default AppRoutes;

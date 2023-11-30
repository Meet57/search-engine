// AppRouter.js
import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import App from './App';  // Check the path
import AboutUsPage from './components/AboutUsPage';  // Check the path

const AppRouter=() => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/about" element={<AboutUsPage />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;

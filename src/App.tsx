import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import PostDetail from './components/PostDetail';
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            © 2023 Suara Hati - All rights reserved
          </div>
        </footer>
      </div>
    </Router>
  );
};
export default App;
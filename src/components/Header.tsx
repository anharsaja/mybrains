import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-lg">SH</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Suara Hati</h1>
                </Link>

                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                                Home
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

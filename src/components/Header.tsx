import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/type.png';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center mr-3">
                        <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Nyinyir</h1>
                </Link>

                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                                Home
                            </Link>
                        </li>
                        <li>
                            <a href="/About" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                                About
                            </a>
                        </li>
                        {/* <li>
                            <a href="/Contact" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                                Contact
                            </a>
                        </li> */}
                        <li>
                            <Link
                                to="/WritePost"
                                className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-indigo-700 transition-colors duration-300"
                            >
                                Tulis
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;

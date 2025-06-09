import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import axios from 'axios';

const Navbar = () => {
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('username');
    const username = email ? email.split('@')[0] : '';
    
    const navigate = useNavigate();
    
    const handleLogout = async() => {
        const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        await axios.post(VITE_BACKEND_URL + "/api/auth/logout" , {}, {
            withCredentials: true
          });
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        navigate('/');
    };
    
    if (!Cookies.get('token')) {
        return null;
    }

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">Examify</Link>
                
                <div className="flex items-center">
                    <Link to="/dashboard" className="text-white mx-2">Dashboard</Link>
                    
                    {role === 'examiner' && (
                        <Link to="/create-exam" className="text-white mx-2">Create Exam</Link>
                    )}
                    
                    {role ==='examiner'?"":
                        <Link to="/results" className="text-white mx-2">Results</Link>
                    }
                    
                    <div className="ml-4 flex items-center">
                        <span className="text-white mr-3">Hi, {username}</span>
                        <button 
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
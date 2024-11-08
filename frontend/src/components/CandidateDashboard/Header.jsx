import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        console.log("Logging out...");
        navigate('/login')
    };

    return (
        <header className="w-full h-16 flex justify-between items-center bg-gray-800 p-4 text-white">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            
            {/* Profile Icon with Dropdown */}
            <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                    {/* <img 
                        src="https://via.placeholder.com/32" // Placeholder profile icon
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-gray-300"
                    /> */}
                    <i className='fa-solid fa-user'></i>
                </button>
                
                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <ul className="py-1 text-gray-700">
                            <li>
                                <Link 
                                    to="/profile" 
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

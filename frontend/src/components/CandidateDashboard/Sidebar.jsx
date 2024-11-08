// src/components/Sidebar.js
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-black text-white p-5">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <ul className='p-0'>
        <li className="mb-4"><a href="#" className="hover:text-blue-300 text-decoration-none">Overview</a></li>
        <li className="mb-4"><a href="#" className="hover:text-blue-300 text-decoration-none">Analytics</a></li>
        <li className="mb-4"><a href="#" className="hover:text-blue-300 text-decoration-none">Settings</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;

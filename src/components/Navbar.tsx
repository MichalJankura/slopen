import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">SLOPEN</h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
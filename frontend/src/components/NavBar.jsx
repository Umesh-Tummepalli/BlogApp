import React from 'react';
import { PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="border-b border-gray-800 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <PenTool className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">BlogSpace</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/home" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>
          <Link to="/blog/new" className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md flex items-center">
            <PenTool className="h-4 w-4 mr-2" />
            Write
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
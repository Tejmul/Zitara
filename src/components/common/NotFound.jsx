import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-serif text-6xl text-burgundy mb-4">404</h1>
        <h2 className="text-2xl text-charcoal mb-4">Page Not Found</h2>
        <p className="text-charcoal/60 mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-burgundy hover:bg-burgundy/90"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 
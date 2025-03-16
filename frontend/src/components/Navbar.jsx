import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut, LogIn, UserPlus, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isLoaded, setIsLoaded] = useState(false);

  // This effect will run whenever the location changes (e.g., after login redirects to home)
  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem('user'); // Clear invalid data
      }
    } else {
      setUser(null); // Ensure user is null if no localStorage entry exists
    }
    
    // Mark component as loaded
    setIsLoaded(true);
  }, [location]); // Re-run when location changes

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Listen for storage events (in case user logs in from another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        if (e.newValue) {
          try {
            setUser(JSON.parse(e.newValue));
          } catch (error) {
            console.error("Error parsing user from storage event:", error);
          }
        } else {
          setUser(null);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsDropdownOpen(false);
    // You might want to redirect to home page or login page here
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Check if the user is an admin
  const isAdmin = user && user.email === 'admin@gmail.com';

  // Only render the component once we've checked localStorage
  if (!isLoaded) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">Contest Tracker</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/')
                    ? 'border-blue-500 text-gray-900 dark:text-gray-100'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Home
              </Link>
              <Link
                to="/reminders"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/reminders')
                    ? 'border-blue-500 text-gray-900 dark:text-gray-100'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Reminders
              </Link>
              {/* Only render the Admin link if the user is an admin */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/admin')
                      ? 'border-blue-500 text-gray-900 dark:text-gray-100'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* Theme Toggle and User Authentication Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            {theme === "dark" ? (
              <Button
                variant="ghost"
                size="sm"
                className="w-9 px-0"
                onClick={toggleTheme}
                aria-label="Switch to light theme"
              >
                <Sun className="h-5 w-5 text-yellow-400" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="w-9 px-0"
                onClick={toggleTheme}
                aria-label="Switch to dark theme"
              >
                <Moon className="h-5 w-5 text-blue-600" />
              </Button>
            )}

            {user ? (
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="p-1 bg-blue-100 dark:bg-blue-800 rounded-full">
                      <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </button>
                </div>
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
                      {user.name || user.email || 'User'}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
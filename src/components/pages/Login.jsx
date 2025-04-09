import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Announcement Bar */}
      <div className="bg-burgundy text-white py-2 text-center text-sm">
        <p>Free shipping on orders over $500 | 30-day returns</p>
      </div>

      <div className="flex min-h-[calc(100vh-32px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl text-charcoal">Welcome back</h2>
            <p className="mt-2 text-sm text-charcoal/60">
              Don't have an account?{' '}
              <Link to="/register" className="text-burgundy hover:text-burgundy/80">
                Sign up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-500">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-charcoal/20 px-4 py-2 text-charcoal placeholder-charcoal/60 focus:border-burgundy focus:ring-burgundy"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-charcoal">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-charcoal/20 px-4 py-2 text-charcoal placeholder-charcoal/60 focus:border-burgundy focus:ring-burgundy pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-charcoal/60 hover:text-burgundy"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-charcoal/20 text-burgundy focus:ring-burgundy"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-charcoal">
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-burgundy hover:text-burgundy/80"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-charcoal/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-ivory px-2 text-charcoal/60">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-charcoal/20 bg-white px-4 py-2 text-sm font-medium text-charcoal hover:bg-charcoal/5"
            >
              <img
                className="mr-2 h-5 w-5"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
              />
              Google
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-charcoal/20 bg-white px-4 py-2 text-sm font-medium text-charcoal hover:bg-charcoal/5"
            >
              <img
                className="mr-2 h-5 w-5"
                src="https://www.svgrepo.com/show/448234/facebook.svg"
                alt="Facebook logo"
              />
              Facebook
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="loading-spinner" />
        </div>
      )}
    </div>
  );
};

export default Login; 
import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import Cookies from 'js-cookie';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const CORRECT_PASSWORD = '12345';
  const AUTH_COOKIE_NAME = 'kids-tracker-auth';
  const COOKIE_EXPIRY_DAYS = 7;

  useEffect(() => {
    // Controlla se l'utente è già autenticato tramite cookie
    const authCookie = Cookies.get(AUTH_COOKIE_NAME);
    if (authCookie === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      // Salva l'autenticazione in un cookie per 7 giorni
      Cookies.set(AUTH_COOKIE_NAME, 'true', { expires: COOKIE_EXPIRY_DAYS });
    } else {
      setError('Password non corretta');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove(AUTH_COOKIE_NAME);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Caricamento...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              🌟 Kids Points Tracker 🌟
            </h1>
            <p className="text-gray-600">
              Inserisci la password per accedere
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                🔒 Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pr-12 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Inserisci la password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-700 text-sm font-medium">❌ {error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!password.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-xl transition-colors text-lg"
            >
              🚀 Accedi
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-blue-800 text-center">
              💡 <strong>Suggerimento:</strong> La password è composta da 5 cifre consecutive
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {children}
      
      {/* Pulsante logout mobile */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg z-50 transition-colors"
        title="Esci"
      >
        <Lock className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AuthWrapper; 
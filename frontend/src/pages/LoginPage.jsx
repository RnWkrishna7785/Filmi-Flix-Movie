import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Both email and password fields are required.');
    }

    const res = await login(email, password);
    if (res.success) {
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  const handleFillAdmin = () => {
    setEmail('admin56@gmail.com');
    setPassword('90905720');
    toast.success('Director credentials prefilled. Ready to Sign In! 🔑');
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center relative bg-cover bg-center select-none"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1425&auto=format&fit=crop')`,
      }}
    >
      
      {/* Return button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-gray-400 hover:text-white flex items-center space-x-2 font-outfit text-sm bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Stream</span>
      </Link>

      {/* Login Box */}
      <div
        className="w-full max-w-md mx-4 glassmorphism rounded-2xl p-8 border border-white/10 shadow-glass-inset"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-3xl font-black font-outfit tracking-tighter text-primary">
            F<span className="text-white font-normal font-sans text-2xl">ILMIFLIX</span>
          </span>
          <h2 className="text-xl font-bold font-outfit text-white mt-4">
            Sign In to Your Account
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Start browsing and watching premium cinema
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 h-4 w-4 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-brandDark-card text-white pl-12 pr-4 py-3 rounded-lg border border-white/5 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-outfit text-sm"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 h-4 w-4 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-brandDark-card text-white pl-12 pr-4 py-3 rounded-lg border border-white/5 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-outfit text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-outfit font-bold shadow-neon-red hover:shadow-lg transition-all focus:outline-none disabled:opacity-50 mt-2"
          >
            {loading ? 'Validating Session...' : 'SIGN IN'}
          </button>
        </form>

        {/* Quick Helper Badge */}
        <div className="mt-6 pt-5 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-3">
            Developer Testing Shortcut
          </p>
          <button
            onClick={handleFillAdmin}
            className="text-[11px] text-yellow-500 hover:text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 px-4 py-2 rounded-full font-bold font-outfit transition-all focus:outline-none"
          >
            🔑 Prefill Director (Admin) Account
          </button>
        </div>

        {/* Redirect toggle */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <span>New to Filmiflix? </span>
          <Link
            to="/register"
            className="text-primary hover:underline font-semibold font-outfit ml-1"
          >
            Sign up now
          </Link>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;

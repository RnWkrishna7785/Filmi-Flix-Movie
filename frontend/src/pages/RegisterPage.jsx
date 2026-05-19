import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error('All fields are required.');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match.');
    }

    if (password.length < 6) {
      return toast.error('Password length must be at least 6 characters.');
    }

    const res = await register(name, email, password);
    if (res.success) {
      navigate('/');
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center relative bg-cover bg-center select-none"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1425&auto=format&fit=crop')`,
      }}
    >
      
      {/* Floating Return Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-gray-400 hover:text-white flex items-center space-x-2 font-outfit text-sm bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Stream</span>
      </Link>

      {/* Registration Card */}
      <div
        className="w-full max-w-md mx-4 glassmorphism rounded-2xl p-8 border border-white/10 shadow-glass-inset animate-float"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-3xl font-black font-outfit tracking-tighter text-primary">
            F<span className="text-white font-normal font-sans text-2xl">ILMIFLIX</span>
          </span>
          <h2 className="text-xl font-bold font-outfit text-white mt-4">
            Create Your Account
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Get registered to create and bookmark favorites
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-3.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full bg-brandDark-card text-white pl-12 pr-4 py-3 rounded-lg border border-white/5 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-outfit text-sm"
              required
            />
          </div>

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

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 h-4 w-4 text-gray-500" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full bg-brandDark-card text-white pl-12 pr-4 py-3 rounded-lg border border-white/5 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-outfit text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-outfit font-bold shadow-neon-red hover:shadow-lg transition-all focus:outline-none disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating Credentials...' : 'REGISTER'}
          </button>
        </form>

        {/* Redirect toggle */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="text-primary hover:underline font-semibold font-outfit ml-1"
          >
            Sign in now
          </Link>
        </div>
      </div>

    </div>
  );
};

export default RegisterPage;

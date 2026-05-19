import React, { useContext } from 'react';
import useAuth from '../hooks/useAuth';
import { FavoriteContext } from '../context/FavoriteContext';
import { User, Mail, Calendar, ShieldCheck, Heart } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

export const ProfilePage = () => {
  const { user } = useAuth();
  const { favoritesList } = useContext(FavoriteContext);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20 select-none">
      
      {/* Title */}
      <div className="space-y-4 pt-6 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-black font-outfit text-white tracking-tight">
          MY PROFILE SESSION
        </h1>
        <p className="text-sm text-gray-500 font-light font-outfit">
          Manage your account credentials and review active list metrics.
        </p>
      </div>

      <hr className="border-white/5 my-8" />

      {/* Profile Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Avatar */}
        <div
          className="md:col-span-4 bg-brandDark-card border border-white/5 rounded-2xl p-6 text-center space-y-4 shadow-md"
        >
          <div className="relative inline-block">
            <img
              src={user.avatar || 'https://api.dicebear.com/7.x/pixel-art/svg?seed=DirectorAdmin'}
              alt="User Avatar"
              className="h-28 w-28 rounded-full border-2 border-primary object-cover mx-auto shadow-neon-red"
            />
            {user.role === 'admin' && (
              <span
                className="absolute bottom-0 right-0 bg-yellow-500 text-black text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-md font-outfit uppercase"
              >
                Director
              </span>
            )}
          </div>
          
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-outfit text-white leading-tight">
              {user.name}
            </h3>
            <p className="text-xs text-primary font-bold uppercase tracking-wider font-outfit">
              {user.role} Member
            </p>
          </div>
        </div>

        {/* Right Side Info Grid */}
        <div
          className="md:col-span-8 bg-brandDark-card border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 shadow-md"
        >
          <h3 className="text-xl font-bold font-outfit text-white border-b border-white/5 pb-4">
            Account Information
          </h3>
          
          <div className="space-y-4 font-outfit text-sm">
            
            <div className="flex items-center justify-between py-2.5 border-b border-white/5">
              <div className="flex items-center space-x-3 text-gray-400">
                <User className="h-4.5 w-4.5 text-primary" />
                <span>Full Name</span>
              </div>
              <span className="text-white font-semibold">{user.name}</span>
            </div>

            <div className="flex items-center justify-between py-2.5 border-b border-white/5">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4.5 w-4.5 text-primary" />
                <span>Email Address</span>
              </div>
              <span className="text-white font-semibold truncate max-w-[200px] md:max-w-none">
                {user.email}
              </span>
            </div>

            <div className="flex items-center justify-between py-2.5 border-b border-white/5">
              <div className="flex items-center space-x-3 text-gray-400">
                <ShieldCheck className="h-4.5 w-4.5 text-primary" />
                <span>Membership Role</span>
              </div>
              <span
                className={`font-bold uppercase text-xs ${
                  user.role === 'admin' ? 'text-yellow-500' : 'text-green-500'
                }`}
              >
                {user.role === 'admin' ? 'Administrator (Director)' : 'Standard Streamer'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2.5 border-b border-white/5">
              <div className="flex items-center space-x-3 text-gray-400">
                <Heart className="h-4.5 w-4.5 text-primary" />
                <span>My Saved Items</span>
              </div>
              <span
                className="text-white font-semibold bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full text-xs"
              >
                {favoritesList.length} Movies
              </span>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <div className="flex items-center space-x-3 text-gray-400">
                <Calendar className="h-4.5 w-4.5 text-primary" />
                <span>Member Since</span>
              </div>
              <span className="text-white font-semibold">{formatDate(user.createdAt)}</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default ProfilePage;

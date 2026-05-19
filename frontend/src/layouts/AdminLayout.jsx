import React from 'react';
import { Navigate, Outlet, NavLink, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LayoutDashboard, Film, Users, ArrowLeft, ShieldAlert } from 'lucide-react';
import Loader from '../components/common/Loader';

export const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-brandDark text-primary">
        <Loader size="large" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-brandDark flex flex-col md:flex-row relative">
      
      {/* Administrative Sidebar Sidenav */}
      <aside
        className="w-full md:w-64 bg-brandDark-card border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between py-8 px-6 md:sticky md:top-0 md:h-screen z-20 select-none"
      >
        <div>
          {/* Header */}
          <div className="flex items-center space-x-3 pb-6 border-b border-white/5 mb-8">
            <ShieldAlert className="h-6 w-6 text-yellow-500 animate-float" />
            <div className="flex flex-col">
              <span className="text-lg font-black font-outfit text-white leading-none">
                DIRECTOR
              </span>
              <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider mt-1">
                Control Panel
              </span>
            </div>
          </div>

          {/* Navigation Links list */}
          <nav className="flex flex-col space-y-2 font-outfit text-sm">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary hover:text-primary font-semibold border-l-4 border-primary'
                    : ''
                }`
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Overview Stats</span>
            </NavLink>

            <NavLink
              to="/admin/movies"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary hover:text-primary font-semibold border-l-4 border-primary'
                    : ''
                }`
              }
            >
              <Film className="h-4 w-4" />
              <span>Movies Directory</span>
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary hover:text-primary font-semibold border-l-4 border-primary'
                    : ''
                }`
              }
            >
              <Users className="h-4 w-4" />
              <span>Registered Users</span>
            </NavLink>
          </nav>
        </div>

        {/* Back Link to Front Desk */}
        <div className="mt-8 md:mt-0">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-400 hover:text-primary transition-colors font-outfit border-t border-white/5 pt-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Filmiflix</span>
          </Link>
        </div>
      </aside>

      {/* Primary Display Portal */}
      <main
        className="flex-grow p-6 md:p-10 z-10 relative overflow-y-auto max-h-screen"
      >
        <div
          className="absolute top-0 left-0 right-0 h-[400px] bg-glass-radial pointer-events-none z-0"
        ></div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;

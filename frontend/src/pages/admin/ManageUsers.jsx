import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import Loader from '../../components/common/Loader';
import { Users, Calendar, Mail } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const ManageUsers = () => {
  const { adminUsers, fetchUsers, loading } = useContext(AdminContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-8 select-none">
      
      {/* Title Header */}
      <div className="space-y-2 border-b border-white/5 pb-6">
        <h1 className="text-2xl font-black font-outfit text-white tracking-tight flex items-center space-x-3">
          <Users className="h-6 w-6 text-primary animate-pulse" />
          <span>REGISTERED MEMBERS</span>
        </h1>
        <p className="text-xs text-gray-500 font-light font-outfit">
          Review registered streamer accounts, credentials, and active system permissions.
        </p>
      </div>

      {/* Loading state table */}
      {loading && adminUsers.length === 0 ? (
        <div className="h-[40vh] flex items-center justify-center text-primary">
          <Loader size="large" />
        </div>
      ) : adminUsers.length > 0 ? (
        <div className="bg-brandDark-card border border-white/5 rounded-2xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-outfit text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/5 text-xs text-gray-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">User Member</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6">Permission Role</th>
                  <th className="py-4 px-6">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {adminUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-white/5 transition-colors">
                    
                    {/* Member cover */}
                    <td className="py-4 px-6 flex items-center space-x-4">
                      <img
                        src={
                          u.avatar ||
                          'https://api.dicebear.com/7.x/pixel-art/svg?seed=' +
                            encodeURIComponent(u.name)
                        }
                        alt={u.name}
                        className="h-10 w-10 rounded-full border border-white/10 object-cover"
                      />
                      <div>
                        <p className="font-bold text-white leading-tight">{u.name}</p>
                        <p className="text-[10px] text-gray-500 font-light uppercase tracking-wider mt-0.5">
                          {u.role} Account
                        </p>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-6 text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{u.email}</span>
                      </div>
                    </td>

                    {/* Permissions level tag */}
                    <td className="py-4 px-6">
                      <span
                        className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                          u.role === 'admin'
                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                            : 'bg-green-500/10 text-green-500 border-green-500/20'
                        }`}
                      >
                        {u.role === 'admin' ? 'Director' : 'Streamer'}
                      </span>
                    </td>

                    {/* Join Date */}
                    <td className="py-4 px-6 text-gray-400">
                      <div className="flex items-center space-x-2 font-sans">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{formatDate(u.createdAt)}</span>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-brandDark-card border border-white/5 rounded-2xl font-outfit text-gray-400">
          No registered streamers resolved.
        </div>
      )}

    </div>
  );
};

export default ManageUsers;

import React from 'react';

export const Loader = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-12 w-12 border-4',
    large: 'h-16 w-16 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-t-primary border-r-transparent border-b-transparent border-l-transparent`}
        style={{ borderColor: 'rgba(229, 9, 20, 0.15)', borderTopColor: '#E50914' }}
      ></div>
    </div>
  );
};

export default Loader;

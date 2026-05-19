import React from 'react';

export const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const renderSkeletons = () => {
    return Array.from({ length: count }).map((_, index) => {
      if (type === 'card') {
        return (
          <div
            key={index}
            className="aspect-[2/3] rounded-xl skeleton-shimmer border border-white/5"
          ></div>
        );
      }

      if (type === 'row') {
        return (
          <div key={index} className="space-y-4 py-4 select-none">
            <div className="h-6 w-48 rounded-md skeleton-shimmer"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[2/3] rounded-xl border border-white/5 skeleton-shimmer"
                ></div>
              ))}
            </div>
          </div>
        );
      }

      if (type === 'hero') {
        return (
          <div
            key={index}
            className="w-full h-[65vh] md:h-[80vh] relative flex items-end pb-20 px-8 md:px-16 skeleton-shimmer select-none"
          >
            <div className="max-w-2xl space-y-4">
              <div className="h-10 w-96 rounded-md skeleton-shimmer bg-brandDark-card"></div>
              <div className="h-4 w-40 rounded-md skeleton-shimmer bg-brandDark-card"></div>
              <div className="h-16 w-full rounded-md skeleton-shimmer bg-brandDark-card"></div>
              <div className="flex space-x-3">
                <div className="h-10 w-32 rounded-md skeleton-shimmer bg-brandDark-card"></div>
                <div className="h-10 w-32 rounded-md skeleton-shimmer bg-brandDark-card"></div>
              </div>
            </div>
          </div>
        );
      }

      return null;
    });
  };

  return <>{renderSkeletons()}</>;
};

export default SkeletonLoader;

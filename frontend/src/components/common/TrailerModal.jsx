import React from 'react';
import { X } from 'lucide-react';

export const TrailerModal = ({ isOpen, onClose, url }) => {
  if (!isOpen) return null;

  const getAutoplayUrl = (baseUrl) => {
    if (!baseUrl) return '';
    const connector = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${connector}autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      
      {/* Clickable dark backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Video Content Iframe aspect frame */}
      <div
        className="relative w-full max-w-4xl bg-brandDark-card border border-white/10 rounded-2xl overflow-hidden aspect-video shadow-2xl z-50 animate-float"
      >
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/60 hover:bg-primary text-white p-2 rounded-full border border-white/15 hover:border-transparent transition-all z-50 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Iframe */}
        {url ? (
          <iframe
            src={getAutoplayUrl(url)}
            title="FILMIFLIX Movie Trailer Embed Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brandDark text-gray-500 font-outfit">
            Sorry, a trailer link is not available for this movie!
          </div>
        )}

      </div>
    </div>
  );
};

export default TrailerModal;

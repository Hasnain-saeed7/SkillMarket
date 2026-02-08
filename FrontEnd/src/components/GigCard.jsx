import React from 'react';
import { Link } from 'react-router-dom';

// Image mapping for different categories (fallback)
const categoryImages = {
  "Web Development": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&q=80",
  "AI & ML": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop&q=80",
  "Graphic Design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&q=80",
  "Content Writing": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop&q=80",
  "Video Editing": "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=300&fit=crop&q=80",
};

const categoryGradients = {
  "Web Development": "from-blue-500 to-cyan-500",
  "AI & ML": "from-purple-500 to-pink-500",
  "Graphic Design": "from-orange-500 to-red-500",
  "Content Writing": "from-green-500 to-emerald-500",
  "Video Editing": "from-indigo-500 to-purple-500",
};

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const GigCard = ({ gig }) => {
  // Use image_url from backend if available (resolve relative paths), otherwise fallback to category mapping
  const rawUrl = gig.image_url || categoryImages[gig.category] || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80";
  const imageUrl = rawUrl.startsWith('/') ? `${API_BASE}${rawUrl}` : rawUrl;
  const gradient = categoryGradients[gig.category] || "from-gray-500 to-gray-600";

  return (
    <div className="group glass-card overflow-hidden hover:shadow-xl hover:shadow-indigo-200/50 hover:-translate-y-2 transition-all duration-500 cursor-pointer">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={gig.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80`;
          }}
        />
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-800 shadow-lg border border-white/50">
            {gig.category}
          </span>
        </div>
        
        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-800 shadow-lg border border-white/50">
          <svg className="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
          <span className="font-extrabold">4.9</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Seller Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 uppercase flex items-center justify-center text-sm font-bold text-white shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              {gig.seller[0]}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg"></div>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {gig.seller}
            </div>
            <div className="text-xs font-semibold text-slate-500">Level 2 Seller</div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 line-clamp-2 min-h-[3.5rem] group-hover:text-indigo-600 transition-colors mb-4 leading-snug">
          {gig.title}
        </h3>

        {/* Features */}
        <div className="flex items-center gap-4 mb-5 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>3 Days Delivery</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Verified</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-5 border-t border-slate-100 flex justify-between items-center">
          <Link
            to={`/gig/${gig.id}`}
            className="text-sm font-bold text-indigo-600 hover:text-purple-600 transition-colors flex items-center gap-1.5 group"
          >
            View Details
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider mb-1">Starting at</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">${gig.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigCard;

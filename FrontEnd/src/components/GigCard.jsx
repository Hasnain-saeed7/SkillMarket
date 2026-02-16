import React from 'react';
import { Link } from 'react-router-dom';

const categoryImages = {
  "Web Development": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&q=80",
  "AI & ML": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop&q=80",
  "Graphic Design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&q=80",
  "Content Writing": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop&q=80",
  "Video Editing": "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=300&fit=crop&q=80",
};

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const GigCard = ({ gig }) => {
  const rawUrl = gig.image_url || categoryImages[gig.category] || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80";
  const imageUrl = (rawUrl && rawUrl.startsWith('/')) ? `${API_BASE}${rawUrl}` : rawUrl;

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-medium transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={gig.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80";
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white rounded-lg text-xs font-medium text-gray-700 border border-gray-200">
            {gig.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white rounded-lg text-xs font-medium text-gray-700 border border-gray-200">
          <svg className="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
          <span>4.9</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Seller */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold">
            {gig.seller ? gig.seller[0] : '?'}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{gig.seller || "Anonymous"}</div>
          </div>
        </div>

        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 min-h-[3rem] mb-3 group-hover:text-blue-600 transition-colors">
          {gig.title}
        </h3>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <Link
            to={`/gig/${gig.id}`}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            View Details →
          </Link>
          <div className="text-right">
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-gray-500">From</span>
              <span className="text-xl font-bold text-gray-900">${gig.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
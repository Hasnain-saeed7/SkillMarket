import React from 'react';

const categories = [
  { name: "All", icon: "🌟" },
  { name: "Web Development", icon: "💻" },
  { name: "AI & ML", icon: "🤖" },
  { name: "Graphic Design", icon: "🎨" },
  { name: "Content Writing", icon: "✍️" },
  { name: "Video Editing", icon: "🎬" }
];

const CategoryBar = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto py-6 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => setActiveCategory(cat.name)}
          className={`whitespace-nowrap rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300 flex items-center gap-2 relative overflow-hidden group ${
            activeCategory === cat.name 
            ? "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-500/40 scale-105 hover:shadow-2xl hover:shadow-purple-500/60" 
            : "bg-white/90 backdrop-blur-sm text-gray-700 hover:text-blue-600 border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
          }`}
        >
          <span className={`text-lg transition-transform duration-300 ${activeCategory === cat.name ? 'group-hover:scale-125 group-hover:rotate-12' : ''}`}>{cat.icon}</span>
          <span className="relative z-10">{cat.name}</span>
          {activeCategory === cat.name && (
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
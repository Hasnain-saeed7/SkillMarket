import React, { useState } from 'react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // This will eventually trigger a filter in your GigList
  };

  return (
    <div className="relative bg-[#f8fafc] pb-20 pt-32 lg:pt-40 overflow-hidden">
      {/* Fensea-style ambient background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/30 to-purple-200/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-200/30 to-blue-200/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full px-4 lg:w-5/12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50/80 backdrop-blur-sm rounded-full border border-emerald-200/50 mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-700">Trusted by 500+ Students</span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Find the perfect <span className="gradient-text">Student Talent</span> for your business.
            </h1>
            
            <p className="mb-10 max-w-[520px] text-lg text-slate-600 leading-relaxed">
              SkillMarket is the leading marketplace for COMSATS students to provide professional 
              services in <span className="font-semibold text-slate-800">Web Development</span>, <span className="font-semibold text-slate-800">AI & ML</span>, and <span className="font-semibold text-slate-800">Design</span>.
            </p>
              
            {/* Fensea-style search bar */}
            <div className="flex w-full max-w-xl items-center rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-xl p-1.5 shadow-lg shadow-slate-200/50 focus-within:shadow-xl focus-within:shadow-indigo-200/50 focus-within:border-indigo-300 transition-all duration-300">
              <div className="flex items-center pl-4 pr-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service are you looking for today?" 
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none py-2 font-medium"
              />
              <button 
                onClick={handleSearch}
                className="rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/50 hover:scale-105 active:scale-95"
              >
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-10">
              {[
                { number: "500+", label: "Active Students", gradient: "from-blue-500 to-cyan-500" },
                { number: "1000+", label: "Projects Completed", gradient: "from-purple-500 to-pink-500" },
                { number: "4.9★", label: "Average Rating", gradient: "from-orange-500 to-yellow-500" }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden px-4 lg:block lg:w-1/12"></div>

          {/* Hero Image */}
          <div className="w-full px-4 lg:w-6/12 mt-12 lg:mt-0">
            <div className="lg:ml-auto lg:text-right">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-3xl transform rotate-6 blur-3xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/20 border-8 border-white/80">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80"
                    alt="Students working on projects"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80";
                    }}
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 glass-card p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Verified Talent</div>
                      <div className="text-xs text-slate-600 font-medium">COMSATS Students</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

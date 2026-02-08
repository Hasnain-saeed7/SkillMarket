import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-gradient-to-b from-white via-blue-50/30 to-indigo-50/40 border-t border-gray-200/50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 relative z-10">
        
        {/* Top Section: Branding & Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Enhanced Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/50 hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold tracking-tight gradient-text">SkillMarket</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              The premier marketplace for COMSATS students to showcase their expertise and connect with clients globally.
            </p>





           <div className="flex space-x-3">
  {[
    { 
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/hasnainsykh",
        // REPLACE THIS
      icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", 
      color: "from-blue-500 to-blue-600" 
    },
    { 
      name: "Twitter",
      url: "https://twitter.com/your-username", // REPLACE THIS
      icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z", 
      color: "from-cyan-500 to-blue-500" 
    },
    { 
      name: "GitHub",
      url: "https://github.com/Hasnain-saeed7", // REPLACE THIS
      icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z", 
      color: "from-gray-700 to-gray-900" 
    }   
  ].map((social, index) => (
    <a 
      key={index}
      href={social.url}
      target="_blank" 
      rel="noopener noreferrer"
      className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-white cursor-pointer transition-all shadow-lg hover:shadow-xl hover:shadow-${social.color.split('-')[1]}-500/50 hover:scale-110 hover:-translate-y-1`}
      aria-label={social.name}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d={social.icon}/>
      </svg>
    </a>
  ))}
</div>





          </div>

          {/* Enhanced Categories Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-base">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                  Graphics & Design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                  Writing & Translation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                  AI Services
                </a>
              </li>
            </ul>
          </div>

          {/* Enhanced About Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-base">About</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-blue-600 transition-colors"></span>
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Enhanced Newsletter Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-base">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">Get the latest updates on new student talent and exclusive offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="flex-1 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/20 outline-none transition-all placeholder:text-slate-400" 
              />
              <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-center ">
            © 2026  <span className="font-semibold text-gray-700">Hasnain Saeed</span> .All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span>English (US)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">$</span>
              <span>USD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 


import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import CategoryBar from '../components/CategoryBar';
import GigCard from '../components/GigCard';
import Features from '../components/Features';
import { getGigs } from '../api/client';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await getGigs();
        setGigs(data);
      } catch (err) {
        const msg = err.response?.data?.detail || err.message || 'Failed to load services.';
        setError(Array.isArray(msg) ? msg.join(', ') : msg);
      } finally {
        setLoading(false);
      }
    };
    fetchGigs();
  }, []);

  // Filter the real gigs from database
  const filteredGigs = activeCategory === "All" 
    ? gigs 
    : gigs.filter(g => g.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Hero />
      <Features /> 
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full mb-4">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-blue-600">Browse Services</span>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Featured <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover talented COMSATS students ready to bring your projects to life
          </p>
        </div>

        <CategoryBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 font-medium text-sm">
            {error}
          </div>
        )}

        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {loading ? 'Loading...' : (
              <>
                Showing <span className="font-semibold text-gray-900">{filteredGigs.length}</span> {filteredGigs.length === 1 ? 'service' : 'services'}
                {activeCategory !== 'All' && (
                  <span> in <span className="font-semibold text-gray-900">{activeCategory}</span></span>
                )}
              </>
            )}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">Loading services...</div>
        ) : filteredGigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGigs.map(gig => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
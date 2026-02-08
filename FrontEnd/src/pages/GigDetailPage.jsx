import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getGigById } from '../api/client';

const categoryImages = {
  'Web Development': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&q=80',
  'AI & ML': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&q=80',
  'Graphic Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop&q=80',
  'Content Writing': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop&q=80',
  'Video Editing': 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=400&fit=crop&q=80',
};

const GigDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const { data } = await getGigById(id);
        setGig(data);
      } catch (err) {
        setError(err.response?.status === 404 ? 'Service not found.' : err.response?.data?.detail || 'Failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetchGig();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (error || !gig) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-red-600 font-medium mb-4">{error || 'Not found'}</p>
        <Link to="/" className="text-indigo-600 font-bold hover:underline">Back to Home</Link>
      </div>
    );
  }

  const imageUrl = categoryImages[gig.category] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&q=80';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-indigo-600 font-bold hover:underline mb-8 inline-flex items-center gap-2"
        >
          ← Back
        </button>
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="h-64 sm:h-80 relative">
            <img src={imageUrl} alt={gig.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-gray-800">
              {gig.category}
            </div>
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{gig.title}</h1>
            <div className="flex items-center gap-4 text-slate-600 mb-6">
              <span className="font-semibold">{gig.seller}</span>
              <span>•</span>
              <span>{gig.category}</span>
            </div>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-sm text-gray-500">Starting at</span>
              <span className="text-4xl font-extrabold text-indigo-600">${gig.price}</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-8">
              Professional service by {gig.seller}. Contact the seller to discuss your project and get started.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all"
            >
              Contact Seller
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetailPage;

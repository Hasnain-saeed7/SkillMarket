import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getGigById, deleteGig } from '../api/client'; // Import deleteGig

// Fallback images
const categoryImages = {
  'Web Development': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&q=80',
  'AI & ML': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&q=80',
  'Graphic Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop&q=80',
  'Content Writing': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop&q=80',
  'Video Editing': 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=400&fit=crop&q=80',
};

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

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
        console.error("Fetch Error:", err);
        setError(err.response?.status === 404 ? 'Service not found.' : 'Failed to load details.');
      } finally {
        setLoading(false);
      }
    };
    fetchGig();
  }, [id]);

  // Handle Delete Functionality
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this gig? This action cannot be undone.")) {
      try {
        await deleteGig(id);
        alert("Gig deleted successfully!");
        navigate('/'); // Redirect to home after deletion
      } catch (err) {
        console.error("Delete Error:", err);
        alert(err.response?.data?.detail || "Failed to delete the gig. Ensure you are the owner.");
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error || !gig) return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <p className="text-red-600 font-medium mb-4">{error || 'Gig not found'}</p>
      <Link to="/" className="text-indigo-600 font-bold hover:underline">Back to Home</Link>
    </div>
  );

  const rawUrl = gig.image_url || categoryImages[gig.category];
  const finalImageUrl = (rawUrl && rawUrl.startsWith('/')) 
    ? `${API_BASE}${rawUrl}` 
    : rawUrl;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 font-bold hover:text-indigo-800 mb-8 inline-flex items-center gap-2 transition-colors"
        >
          ← Back to Marketplace
        </button>
        
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="h-64 sm:h-96 relative">
            <img 
              src={finalImageUrl} 
              alt={gig.title} 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = categoryImages[gig.category]; }} 
            />
            <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/95 backdrop-blur-md rounded-full text-sm font-bold text-indigo-600 shadow-lg">
              {gig.category}
            </div>
          </div>
          
          <div className="p-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-4">{gig.title}</h1>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                    {gig.seller ? gig.seller[0].toUpperCase() : 'U'}
                  </div>
                  <span className="font-bold text-slate-700">{gig.seller}</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500 font-medium">{gig.category}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Price</p>
                <p className="text-5xl font-black text-indigo-600">${gig.price}</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-3">About this Service</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                This is a premium {gig.category} service provided by {gig.seller}. 
                Everything is tailored to your specific project needs with high-quality results 
                and professional communication.
              </p>
            </div>

            {/* BUTTON SECTION */}
            <div className="flex flex-wrap gap-4">
              {/* CONTACT BUTTON - Using mailto link */}
              <a
                href={`mailto:support@skillmarket.com?subject=Inquiry about: ${gig.title}`}
                className="flex-1 min-w-[200px] text-center bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                Contact Seller
              </a>

              {/* DELETE BUTTON */}
              <button 
                onClick={handleDelete}
                className="flex-1 min-w-[200px] px-8 py-4 border-2 border-red-100 text-red-600 rounded-2xl font-bold hover:bg-red-50 hover:border-red-200 transition-all"
              >
                Delete Gig
              </button>
            </div>
            
            <p className="mt-6 text-center text-xs text-slate-400 font-medium">
              ID: {id} • Secured via SkillMarket API
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigDetailPage; 
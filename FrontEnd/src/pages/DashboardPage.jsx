import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionModal from '../components/ActionModal';
import CreateGigForm from '../components/CreateGigForm';
import GigCard from '../components/GigCard';
import { useAuth } from '../context/AuthContext';
import { getGigs, createGig, deleteGig } from '../api/client';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myGigs, setMyGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Only logged-in users can access dashboard (and post new gig)
  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const fetchGigs = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await getGigs();
      setMyGigs(data.filter((g) => g.seller_id === user.id));
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to load gigs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, [user?.id]);

  const handleAddGig = async (newGig) => {
    setActionLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const { data } = await createGig({
        title: newGig.title,
        price: Number(newGig.price),
        seller: newGig.seller,
        category: newGig.category,
        image_url: newGig.image_url || null, // Include image_url from form
      });
      setMyGigs((prev) => [data, ...prev]);
      setSuccessMessage('Service created successfully.');
      setIsModalOpen(false);
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Failed to create service.';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteGig = async (gigId) => {
    if (!window.confirm('Delete this service?')) return;
    setActionLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      await deleteGig(gigId);
      setMyGigs((prev) => prev.filter((g) => g.id !== gigId));
      setSuccessMessage('Service deleted.');
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to delete.');
    } finally {
      setActionLoading(false);
    }
  };

  if (!user) {
    return null; // redirect in progress
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pt-28">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          disabled={actionLoading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          + Post New Gig
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 font-medium">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-700 font-medium">
          {successMessage}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading services...</p>
      ) : myGigs.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p className="font-medium mb-2">No services yet.</p>
          <p className="text-sm">Click &quot;Post New Gig&quot; to add your first service.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myGigs.map((gig) => (
            <div key={gig.id} className="relative group">
              <GigCard gig={gig} />
              {gig.seller_id === user.id && (
                <button
                  type="button"
                  onClick={() => handleDeleteGig(gig.id)}
                  disabled={actionLoading}
                  className="absolute top-4 right-4 z-20 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
                  aria-label="Delete"
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create a New Service"
      >
        <CreateGigForm
          onAddGig={handleAddGig}
          onClose={() => setIsModalOpen(false)}
          loading={actionLoading}
        />
      </ActionModal>
    </div>
  );
};

export default DashboardPage;

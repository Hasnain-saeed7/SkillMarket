import React, { useState } from 'react';
import InputGroup from './InputGroup';
import { useAuth } from '../context/AuthContext';
import { uploadGigImage } from '../api/client';

const CATEGORIES = ['Web Development', 'AI & ML', 'Graphic Design', 'Content Writing', 'Video Editing'];

// Category to image URL mapping (fallback when no image uploaded)
const categoryImageMap = {
  'Web Development': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvVUoijSmlttU-JVIzz8B1RZqyBi6k8Ee4rQ&s',
  'AI & ML': 'https://media.istockphoto.com/id/1419913245/photo/robot-and-human-hands-pointing-to-each-other-the-idea-of-creating-futuristic-ai-intelligent.jpg?s=612x612&w=0&k=20&c=vVkOGiSztkmhPBpCMIigjnwnUUrApJdQK-LslZBj_D0=',
  'Graphic Design': 'https://media.istockphoto.com/id/1400081953/video/black-teen-woman-creating-and-rendering-3d-model-of-unique-sneaker-at-personal-computer.avif?s=640x640&k=20&c=s-21AML974VRQZJXLcwNxEtOJb0SmuqmoggemrLoTx0=',
  'Content Writing': 'https://media.istockphoto.com/id/950739144/vector/content-strategy-marketing-vector-illustration-social-media-advertising-concept-small-people.jpg?s=1024x1024&w=is&k=20&c=zH7Q-BXzhYOcarIUE3fIrOJlWZCUWVuLlj118NdkMo0=',
  'Video Editing': 'https://media.istockphoto.com/id/1665473397/photo/paper-coffee-cup-in-personal-creative-office-studio-for-movie-editing-and-color-grading.jpg?s=612x612&w=0&k=20&c=xvuLPcfnTtcw77TJPTAQ6tchh21NoHu2z8_wO7uu9zg=',
};

const CreateGigForm = ({ onAddGig, onClose, loading = false }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Web Development',
    seller: user?.name || 'Seller',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a JPEG, PNG or WebP image.');
      return;
    }
    setUploadError('');
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = parseFloat(formData.price);
    if (!formData.title || !formData.price || Number.isNaN(price)) {
      alert('Please fill title and a valid price.');
      return;
    }
    let imageUrl = categoryImageMap[formData.category] || null;
    if (imageFile) {
      setUploadError('');
      try {
        const { data } = await uploadGigImage(imageFile);
        const base = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
        imageUrl = data.url.startsWith('http') ? data.url : `${base}${data.url}`;
      } catch (err) {
        const msg = err.response?.data?.detail || err.message || 'Image upload failed.';
        setUploadError(typeof msg === 'string' ? msg : JSON.stringify(msg));
        return;
      }
    }
    onAddGig({
      title: formData.title.trim(),
      price,
      seller: formData.seller.trim(),
      category: formData.category,
      image_url: imageUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputGroup
        label="Service Title"
        placeholder="I will build a..."
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <div>
        <label className="text-sm font-bold text-gray-700 mb-1 block">Image (optional – upload from gallery)</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:text-indigo-700 file:font-bold hover:file:bg-indigo-100"
        />
        {uploadError && <p className="mt-1 text-sm text-red-600">{uploadError}</p>}
        {imagePreview && (
          <div className="mt-2 rounded-xl overflow-hidden border border-gray-200 max-h-40">
            <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputGroup
          label="Price ($)"
          type="number"
          placeholder="50"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700 mb-1">Category</label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-bold text-gray-700 mb-1">Seller name</label>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          value={formData.seller}
          onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
          placeholder="Your display name"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg"
      >
        {loading ? 'Creating...' : 'Launch Service'}
      </button>
    </form>
  );
};

export default CreateGigForm;

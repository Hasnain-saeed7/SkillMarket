import React from 'react';

const InputGroup = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand focus:ring-2 focus:ring-blue-100 outline-none transition-all"
      />
    </div>
  );
};

export default InputGroup; 

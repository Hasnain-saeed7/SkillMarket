import React from 'react';

const StatCard = ({ label, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
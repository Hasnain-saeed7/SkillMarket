import React from 'react';

const OrderRow = ({ order }) => {
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">📦</div>
        <div>
          <h4 className="font-semibold text-gray-800">{order.title}</h4>
          <p className="text-xs text-gray-400">Order ID: #{order.id}</p>
        </div>
      </div>
      <div className="flex items-center space-x-8">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status]}`}>
          {order.status}
        </span>
        <span className="font-bold text-gray-900">${order.price}</span>
        <button className="text-gray-400 hover:text-brand">•••</button>
      </div>
    </div>
  );
};

export default OrderRow;
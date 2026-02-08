const EmptyState = ({ message, actionText, onAction }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="text-6xl mb-4">🔍</div>
    <h3 className="text-xl font-bold text-gray-800">{message}</h3>
    {actionText && (
      <button 
        onClick={onAction}
        className="mt-4 text-brand font-semibold hover:underline"
      >
        {actionText}
      </button>
    )}
  </div>
); 

export default EmptyState;
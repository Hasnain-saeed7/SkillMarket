const TabSwitcher = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-200 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${
            activeTab === tab 
            ? "border-brand text-brand" 
            : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}; 

export default TabSwitcher;
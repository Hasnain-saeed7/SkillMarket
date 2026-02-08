import React from 'react';

const featureData = [
  { 
    id: 1, 
    label: "SAFE PAY", 
    borderColor: "border-pink-400/50", 
    shadowColor: "shadow-pink-100", 
    textColor: "text-pink-500", 
    bgColor: "bg-pink-50/50",
    icon: "💳" 
  },
  { 
    id: 2, 
    label: "QUICK TURNAROUND", 
    borderColor: "border-green-400/50", 
    shadowColor: "shadow-green-100", 
    textColor: "text-green-600", 
    bgColor: "bg-green-50/50",
    icon: "⏱️" 
  },
  { 
    id: 3, 
    label: "SAVE MONEY", 
    borderColor: "border-blue-400/50", 
    shadowColor: "shadow-blue-100", 
    textColor: "text-blue-600", 
    bgColor: "bg-blue-50/50",
    icon: "🎓" 
  },
  { 
    id: 4, 
    label: "24/7 SUPPORT", 
    borderColor: "border-purple-400/50", 
    shadowColor: "shadow-purple-100", 
    textColor: "text-purple-600", 
    bgColor: "bg-purple-50/50",
    icon: "🎧" 
  },
  { 
    id: 5, 
    label: "HAPPY SELL", 
    borderColor: "border-gray-300/50", 
    shadowColor: "shadow-gray-100", 
    textColor: "text-purple-500", 
    bgColor: "bg-purple-50/50",
    icon: "🤝" 
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-[#F8F9FD]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {featureData.map((item) => (
            <div 
              key={item.id} 
              className={`relative flex flex-col items-center justify-between p-10 rounded-[32px] border-2 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${item.borderColor} ${item.shadowColor}`}
            >
              {/* Central Icon - Removing grayscale for the vibrant look */}
              <div className="flex-grow flex items-center justify-center text-6xl drop-shadow-md">
                {item.icon}
              </div>
              
              {/* Modern Centered Badge */}
              <div className={`mt-8 px-6 py-2 rounded-xl text-[10px] font-black tracking-widest text-center whitespace-nowrap ${item.bgColor} ${item.textColor}`}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
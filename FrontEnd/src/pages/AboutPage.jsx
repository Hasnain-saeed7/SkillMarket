import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              About SkillMarket
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Empowering COMSATS students to showcase their talents and connect with clients worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Mission Section */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-sm font-semibold text-blue-600">Our Mission</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Connecting Talent with Opportunity
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                SkillMarket was founded with a simple yet powerful vision: to create a platform where COMSATS students can monetize their skills while building real-world experience. We believe that every student has unique talents that deserve recognition and fair compensation.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to bridge the gap between student talent and business needs, creating a win-win ecosystem that benefits both students and clients.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl transform rotate-6 opacity-20 blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80"
                alt="Team collaboration"
                className="relative rounded-3xl shadow-2xl"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80";
                }}
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Excellence",
                description: "We strive for excellence in every project, ensuring quality work that exceeds expectations.",
                img: "https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg"
              },
              {
                icon: "🤝",
                title: "Trust",
                description: "Building trust through transparency, verified profiles, and secure transactions.",
                img: "https://images.pexels.com/photos/19451448/pexels-photo-19451448.jpeg"
              },
              {
                icon: "🚀",
                title: "Innovation",
                description: "Embracing new technologies and creative solutions to solve complex problems.",
                img: "https://images.pexels.com/photos/8566469/pexels-photo-8566469.jpeg"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                {value.img && (
                  <img src={value.img} alt={value.title} className="mt-4 rounded-lg shadow-md w-full h-48 object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 mb-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Active Students" },
              { number: "1000+", label: "Projects Completed" },
              { number: "4.9★", label: "Average Rating" },
              { number: "50+", label: "Categories" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-extrabold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built by Students, for Students</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              SkillMarket is developed and maintained by COMSATS students as part of WebTech Project.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                H
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Developed by Hasnain</h3>
                <p className="text-gray-600">
                  A passionate student developer creating solutions that make a difference. This platform represents months of dedication to building a marketplace that truly serves the COMSATS community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

import React from 'react';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Succeed as a Student Freelancer",
      excerpt: "Learn the essential tips and strategies to build a successful freelancing career while studying.",
      author: "Hasnain",
      date: "March 15, 2026",
      category: "Tips",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Top 5 Skills in Demand for 2026",
      excerpt: "Discover which skills are most sought after by clients and how to develop them.",
      author: "Saeed",
      date: "March 10, 2026",
      category: "Trends",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Building Your Portfolio: A Complete Guide",
      excerpt: "Step-by-step guide to creating a portfolio that attracts clients and showcases your best work.",
      author: "Ali",
      date: "March 5, 2026",
      category: "Guide",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&q=80"
    },
    {
      id: 4,
      title: "Client Communication Best Practices",
      excerpt: "Master the art of professional communication to build lasting client relationships.",
      author: "Sarah",
      date: "February 28, 2026",
      category: "Tips",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&q=80"
    },
    {
      id: 5,
      title: "Pricing Your Services: A Student's Guide",
      excerpt: "Learn how to set fair prices that reflect your skills and attract quality clients.",
      author: "Ahmed",
      date: "February 20, 2026",
      category: "Business",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop&q=80"
    },
    {
      id: 6,
      title: "The Future of Remote Work for Students",
      excerpt: "Exploring how remote work opportunities are transforming student careers.",
      author: "Fatima",
      date: "February 15, 2026",
      category: "Trends",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop&q=80"
    }
  ];

  const categories = ["All", "Tips", "Trends", "Guide", "Business"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold">Latest Insights</span>
            </div>
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              SkillMarket Blog
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Tips, guides, and insights to help you succeed as a student freelancer.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-12 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              className="whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200 hover:shadow-md"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop&q=80";
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss a new blog post or important update.
          </p>
          <div className="flex max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-5 py-3 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

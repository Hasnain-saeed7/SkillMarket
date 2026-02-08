import React, { useState } from 'react';
import { sendMessage } from '../api/client';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      await sendMessage(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Failed to send message. Please try again.';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      content: "hasnainquresh@gmail.com",
      link: "mailto:hasnainquresh@gmail.com"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      content: "+92 312 6325881",
      link: "tel:+923126325881"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Location",
      content: "COMSATS University, Islamabad",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Have a question or need help? We're here to assist you. Reach out to us and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-sm font-semibold text-blue-600">Contact Information</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Whether you're a student looking to join our platform, a client seeking services, or have general inquiries, we'd love to hear from you.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                    <p className="text-gray-600">{info.content}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Media */}
        
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              {success && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-700 font-medium">
                  ✓ Thank you for your message! We've received it and will get back to you soon.
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 font-medium">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Hasnain Quresh"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Hasnain@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
    <p className="text-lg text-gray-600">Quick answers to common questions</p>
  </div>
  <div className="grid md:grid-cols-2 gap-6">
    {[
      { 
        question: "How do I join as a student seller?",
        answer: "Simply click the 'Join Now' button, create your profile, and start listing your services. It's free to join!",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200"
      },
      {
        question: "How do I hire a student?",
        answer: "Browse our services, select a student that matches your needs, and send them a message to discuss your project.",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200"
      },
      {
        question: "What payment methods are accepted?",
        answer: "We support various payment methods including credit cards, bank transfers, and digital wallets for secure transactions.",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200"
      },
      {
        question: "Is there a guarantee on work quality?",
        answer: "Yes! All students are verified, and we have a review system to ensure quality. We also offer dispute resolution if needed.",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200"
      }
    ].map((faq, index) => (
      <div 
        key={index} 
        className={`${faq.bgColor} ${faq.borderColor} rounded-xl p-6 shadow-lg border-2 transition-transform hover:scale-[1.02]`}
      >
        <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    ))}
  </div>
</div>
      </div>
    </div>
  );
};

export default ContactPage;

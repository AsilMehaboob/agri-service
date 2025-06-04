'use client';

import { useState } from 'react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState<'Farmer' | 'Buyer' | ''>('');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: role
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-white py-20 px-4 text-center border-b">
        <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
          Connecting Farmers & Buyers
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Direct agricultural marketplace
        </p>
        
        {!showForm && !submitted && (
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
            <button 
              onClick={() => { setShowForm(true); setRole('Farmer'); }}
              className="bg-gray-900 text-white py-2 px-5 text-sm tracking-wide"
            >
              Farmer Registration
            </button>
            <button 
              onClick={() => { setShowForm(true); setRole('Buyer'); }}
              className="border border-gray-900 text-gray-900 py-2 px-5 text-sm tracking-wide"
            >
              Buyer Registration
            </button>
          </div>
        )}
      </header>

      {/* Form Section */}
      {showForm && !submitted && (
        <section className="max-w-md mx-auto my-16 p-6 bg-white">
          <h2 className="text-xl font-light text-center mb-6 tracking-wide">
            {role} Registration
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                required
                className="w-full px-3 py-2 border-b focus:outline-none placeholder-gray-500 text-sm"
                onChange={handleInputChange}
              />
            </div>
            
            <div className="mb-4">
              <input
                type="tel"
                placeholder="Phone Number"
                name="phone"
                required
                className="w-full px-3 py-2 border-b focus:outline-none placeholder-gray-500 text-sm"
                onChange={handleInputChange}
              />
            </div>
            
            <div className="mb-6">
              <input
                type="text"
                placeholder="District/State"
                name="district"
                required
                className="w-full px-3 py-2 border-b focus:outline-none placeholder-gray-500 text-sm"
                onChange={handleInputChange}
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2.5 text-sm tracking-wide"
            >
              Submit
            </button>
          </form>
        </section>
      )}

      {/* Thank You Message */}
      {submitted && (
        <section className="max-w-md mx-auto my-16 p-8 bg-white text-center">
          <h2 className="text-xl font-light mb-4 tracking-wide">
            Registration Received
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            We'll contact you shortly
          </p>
          <button 
            onClick={() => {
              setSubmitted(false);
              setShowForm(false);
              setFormData({ name: '', phone: '', district: '' });
            }}
            className="text-xs underline tracking-wide"
          >
            RETURN HOME
          </button>
        </section>
      )}
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Orbit } from 'ldrs/react';
import 'ldrs/react/Orbit.css';

export default function RegistrationForm() {
  const router = useRouter();
  const params = useParams();
  const role = (params.role as string)?.toLowerCase();

  const [formData, setFormData] = useState({ name: '', phone: '', district: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidRole = role === 'farmer' || role === 'buyer';

  useEffect(() => {
    if (!isValidRole) {
      router.push('/');
    }
  }, [isValidRole, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role }),
      });
      router.push('/thank-you');
    } catch (err) {
      console.error('Submission failed:', err);
      setIsSubmitting(false);
    }
  };

  if (!isValidRole) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto my-16 p-6 bg-white">
        <h2 className="text-2xl font-bold text-center tracking-wide capitalize">
          {role} Registration
        </h2>
        <p className='text-center text-sm mt-2 mb-6 tracking-wide'>Enter the Details</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full mb-4 px-3 py-2 border-b focus:outline-none placeholder-gray-500 text-sm"
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full mb-4 px-3 py-2 border-b focus:outline-none placeholder-gray-500 text-sm"
            onChange={handleChange}
          />
          <input
            type="text"
            name="district"
            placeholder="District/State"
            required
            className="w-full mb-6 px-3 py-2 border-b focus:outline-none placeholder-gray-500 text-sm"
            onChange={handleChange}
          />
          {isSubmitting ? (
            <div className="w-full flex justify-center py-2.5">
                <Orbit
                    size="35"
                    speed="1.5"
                    color="black" 
                />
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2.5 text-sm tracking-wide"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

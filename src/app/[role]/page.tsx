'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Orbit } from 'ldrs/react';
import 'ldrs/react/Orbit.css';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center capitalize text-primary">
            {role} Registration
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Enter your details to proceed
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="focus-visible:ring-primary"
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              onChange={handleChange}
              className="focus-visible:ring-primary"
            />
            <Input
              type="text"
              name="district"
              placeholder="District / State"
              required
              onChange={handleChange}
              className="focus-visible:ring-primary"
            />
            {isSubmitting ? (
              <div className="flex justify-center py-2.5">
                <Orbit size="35" speed="1.5" color="#1F514C" />
              </div>
            ) : (
<Button
  type="submit"
  className="w-full bg-[#1F514C] hover:bg-[#18433F] text-white"
>
  Submit
</Button>

            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

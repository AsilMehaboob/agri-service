'use client';

import { useRouter } from 'next/navigation';
import { Sprout } from "lucide-react"
import { Button } from '@/components/ui/button'

export default function Home() { 
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white py-20 px-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <Sprout className="h-8 w-8 text-green-600 mr-2" />
          <h2 className="text-2xl font-bold text-green-600">KrishiSetu</h2>
        </div>
        <h1 className="text-4xl font-sans font-bold md:text-5xl mb-4 tracking-tight text-gray-800">
          Connecting Farmers & Buyers
        </h1>
        <p className="text-gray-600 max-w-2xl text-xl mx-auto">
          Connect. Grow. Thrive.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <Button
            onClick={() => router.push('/farmer')}
            className="bg-[#1F514C]  text-white py-2 px-5 text-sm tracking-wide"
          >
            Join as Farmer
          </Button>
          <Button
            onClick={() => router.push('/buyer')}
            className="border border-gray-900 bg-white text-[#1F514C] hover:bg-gray-100 py-2 px-5 text-sm tracking-wide"
          >
            Join as Buyer
          </Button>
        </div>
      </div>
    </div>
  );
}

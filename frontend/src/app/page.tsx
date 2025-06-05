"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sprout } from "lucide-react"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] overflow-hidden relative">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#E8F1E4] opacity-30 blur-3xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#E4EDF1] opacity-30 blur-3xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      <div className="relative z-10 max-w-md w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="bg-[#F4F8F2] p-3 rounded-full">
            <Sprout className="h-7 w-7 text-[#1F514C]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1F514C]">KrishiSetu</h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl mb-6 font-light text-[#333] tracking-tight text-center"
        >
          Connecting <span className="font-normal">Farmers</span> & <span className="font-normal">Buyers</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#666] text-center mb-12 text-lg"
        >
          Connect. Grow. Thrive.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/farmer")}
            className="bg-[#1F514C] text-white py-4 px-6 rounded-md w-full text-sm tracking-wide font-medium transition-all"
          >
            Join as Farmer
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#F4F8F2" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/buyer")}
            className="bg-white border border-[#1F514C] text-[#1F514C] py-4 px-6 rounded-md w-full text-sm tracking-wide font-medium transition-all"
          >
            Join as Buyer
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

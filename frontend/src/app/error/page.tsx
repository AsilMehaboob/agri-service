"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-10 shadow-sm text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="flex justify-center mb-6"
          >
            <div className="bg-[#F4F8F2] p-4 rounded-full">
              <Search className="h-8 w-8 text-[#1F514C]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-2"
          >
            <span className="text-sm text-[#666] font-mono">Error 404</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-2xl mb-3 font-light text-[#333]"
          >
            An Error Occurred
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-[#666] text-sm mb-8"
          >
            Please try again later or return to the home page.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ gap: "12px" }}
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-[#1F514C] text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Return Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

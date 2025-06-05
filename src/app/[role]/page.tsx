"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sprout, ArrowLeft } from "lucide-react"

export default function RegistrationForm() {
  const router = useRouter()
  const params = useParams()
  const role = (params.role as string)?.toLowerCase()

  const [formData, setFormData] = useState({ name: "", phone: "", district: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const isValidRole = role === "farmer" || role === "buyer"

  useEffect(() => {
    if (!isValidRole) {
      router.push("/")
    }
  }, [isValidRole, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      })
      router.push("/thank-you")
    } catch (err) {
      console.error("Submission failed:", err)
      setIsSubmitting(false)
    }
  }

  if (!isValidRole) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#E8F1E4] opacity-30 blur-3xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-[#E4EDF1] opacity-30 blur-3xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      <div className="relative z-10 w-full max-w-md">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => router.push("/")}
          className="absolute top-0 left-0 flex items-center text-[#1F514C] mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className="text-sm">Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-8 mt-12"
        >
          <div className="bg-[#F4F8F2] p-2 rounded-full">
            <Sprout className="h-5 w-5 text-[#1F514C]" />
          </div>
          <h2 className="text-xl font-bold text-[#1F514C]">KrishiSetu</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-8 shadow-sm"
        >
          <h3 className="text-2xl font-light text-center capitalize text-[#333] mb-2">{role} Registration</h3>
          <p className="text-sm text-[#666] text-center mb-8">Enter your details to proceed</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              className={`relative border rounded-md transition-all ${
                focusedField === "name" ? "border-[#1F514C]" : "border-gray-200"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 rounded-md focus:outline-none text-[#333]"
              />
            </motion.div>

            <motion.div
              className={`relative border rounded-md transition-all ${
                focusedField === "phone" ? "border-[#1F514C]" : "border-gray-200"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 rounded-md focus:outline-none text-[#333]"
              />
            </motion.div>

            <motion.div
              className={`relative border rounded-md transition-all ${
                focusedField === "district" ? "border-[#1F514C]" : "border-gray-200"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <input
                type="text"
                name="district"
                placeholder="District / State"
                required
                onChange={handleChange}
                onFocus={() => setFocusedField("district")}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 rounded-md focus:outline-none text-[#333]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="pt-2"
            >
              {isSubmitting ? (
                <div className="flex justify-center py-3">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded-full border-2 border-t-[#1F514C] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                    <div
                      className="absolute inset-1 rounded-full border-2 border-t-transparent border-r-[#1F514C] border-b-transparent border-l-transparent animate-spin"
                      style={{ animationDuration: "0.8s" }}
                    ></div>
                  </div>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#1F514C] hover:bg-[#18433F] text-white py-3 rounded-md transition-all"
                >
                  Submit
                </motion.button>
              )}
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

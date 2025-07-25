import React, { useState } from "react"
import {
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Lock,
  Loader2,
  BookOpen,
} from "lucide-react"

export default function BookPage() {
  const [form, setForm] = useState({
    login_id: "",
    login_pw: "",
    year: "",
    month: "",
    day: "",
  })
  const [result, setResult] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSuccess(false)
    setResult("")
    setIsLoading(true)

    try {
      const r = await fetch("https://jp-training-backend.onrender.com/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
          month: Number(form.month),
          day: Number(form.day),
        }),
      })
      const res = await r.json()

      if (r.ok) {
        setResult(res.result || "Booking request sent successfully!")
        setSuccess(true)
      } else {
        setResult(res.detail || "Failed to book slot.")
        setSuccess(false)
      }
    } catch {
      setResult("Network error, please try later.")
      setSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-4xl">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        {/* Main Card */}
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Book Your Class</h2>
            <p className="text-gray-300 text-sm">Reserve your spot in the upcoming session</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
            {/* Login Fields */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="login_id"
                  type="text"
                  required
                  value={form.login_id}
                  onChange={handleChange}
                  placeholder="Login ID"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="login_pw"
                  type="password"
                  required
                  value={form.login_pw}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Date Fields */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-300 mb-3">
                <Calendar className="h-5 w-5" />
                <span className="text-sm font-medium">Select Date</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {["year", "month", "day"].map((field, index) => (
                  <div key={field}>
                    <label className="block text-gray-400 text-xs font-medium mb-2 ml-1 capitalize">{field}</label>
                    <input
                      name={field}
                      type="number"
                      required
                      value={form[field]}
                      onChange={handleChange}
                      placeholder={field === "year" ? "2025" : field === "month" ? "8" : "27"}
                      min={field === "day" ? "1" : undefined}
                      max={field === "day" ? "31" : field === "month" ? "12" : undefined}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-center"
                      disabled={isLoading}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Booking Class...</span>
                  </>
                ) : (
                  <span>Book Class</span>
                )}
              </div>
            </button>
          </form>

          {/* Feedback Message */}
          {result && (
            <div className={`mt-6 p-4 rounded-2xl backdrop-blur-sm transition-all duration-500 ${
              success ? "bg-green-500/20 border border-green-500/30" : "bg-red-500/20 border border-red-500/30"
            }`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {success ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <p className={`text-sm font-medium ${success ? "text-green-300" : "text-red-300"}`}>{result}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Make sure to arrive 10 minutes before your scheduled class time
            </p>
          </div>
        </div>

        {/* Success Animation */}
        {success && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 border-4 border-green-400 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

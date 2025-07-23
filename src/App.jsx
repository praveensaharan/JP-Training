import React, { useState } from "react"
import { Mail, Calendar, Sparkles } from "lucide-react"
import SubscribePage from "./components/SubscribePage"
import BookPage from "./components/BookPage"

const NAV = [
  { label: "Subscribe", value: "subscribe", icon: Mail, description: "Get notified for slots" },
  { label: "Book", value: "book", icon: Calendar, description: "Reserve your class" },
]

export default function App() {
  const [page, setPage] = useState("subscribe")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center pt-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl mb-6 shadow-2xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-bold text-4xl md:text-5xl mb-4 text-white drop-shadow-lg">JP Training</h1>
          <p className="text-xl text-gray-300 font-light">Web Automation Platform</p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Navigation */}
        <div className="mb-12">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-2 shadow-2xl">
            <div className="flex space-x-2">
              {NAV.map((tab) => {
                const Icon = tab.icon
                const isActive = page === tab.value

                return (
                  <button
                    key={tab.value}
                    className={`relative group flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg transform scale-105"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setPage(tab.value)}
                  >
                    {/* Active background glow */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl blur opacity-50 -z-10"></div>
                    )}
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                    <div className="text-left">
                      <div className="text-sm font-semibold">{tab.label}</div>
                      <div className={`text-xs transition-opacity duration-300 ${
                        isActive ? "text-blue-100" : "text-gray-400 group-hover:text-gray-300"
                      }`}>
                        {tab.description}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="w-full max-w-lg transition-all duration-500 ease-in-out">
          <div className={`transform transition-all duration-500 ${
            page === "subscribe" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 absolute"
          }`}>
            {page === "subscribe" && <SubscribePage />}
          </div>

          <div className={`transform transition-all duration-500 ${
            page === "book" ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 absolute"
          }`}>
            {page === "book" && <BookPage />}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 mb-8 text-center">
          <p className="text-gray-400 text-sm">Streamline your training experience with automated booking</p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300"></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

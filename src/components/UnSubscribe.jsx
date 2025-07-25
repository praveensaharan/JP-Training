import React, { useEffect, useState, useRef } from "react";
import { CheckCircle, XCircle, Loader2, Sparkles, Mail } from "lucide-react"

export default function UnsubscribePage() {
  const [status, setStatus] = useState("loading");
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // prevent second call in Strict Mode

    effectRan.current = true;
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    if (!email) {
      setStatus("error");
      return;
    }

    fetch("https://jp-training-backend.onrender.com/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (res.ok) setStatus("success");
        else throw new Error();
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl mb-6 shadow-2xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-bold text-4xl md:text-5xl mb-4 text-white drop-shadow-lg">JP Training</h1>
          <p className="text-xl text-gray-300 font-light">Web Automation Platform</p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Main Content Card */}
        <div className="w-full max-w-md">
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            {/* Loading State */}
            {status === "loading" && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl mb-6 shadow-lg">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Processing Request</h2>
                <p className="text-gray-300 text-sm">Unsubscribing you from our notifications...</p>

                {/* Loading animation */}
                <div className="flex justify-center mt-6">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Success State */}
            {status === "success" && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Successfully Unsubscribed</h2>
                <p className="text-gray-300 text-sm mb-6">We're sad to see you go, but we respect your choice.</p>

                {/* Success message with icon */}
                <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 text-sm font-medium">
                      You won't receive any more notifications from us
                    </span>
                  </div>
                </div>

                {/* Success animation overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 border-4 border-green-400 rounded-full animate-ping opacity-20"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {status === "error" && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl mb-6 shadow-lg">
                  <XCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Unsubscribe Failed</h2>
                <p className="text-gray-300 text-sm mb-6">Something went wrong while processing your request.</p>

                {/* Error message */}
                <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4 backdrop-blur-sm mb-6">
                  <p className="text-red-300 text-sm font-medium">
                    Please try again later or contact support if the problem persists
                  </p>
                </div>

                {/* Retry suggestion */}
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400">
                {status === "success"
                  ? "Thank you for being part of our community"
                  : "Need help? Contact our support team"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="mt-12 flex items-center justify-center space-x-4">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300"></div>
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>
    </div>
  )
}

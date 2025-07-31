import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Lock,
  Loader2,
  BookOpen,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ScheduleSelector from "./ScheduleData"; // ensure path and filename are correct

export default function BookPage() {
  const [form, setForm] = useState({
    login_id: "",
    login_pw: "",
    month: "",
    day: "",
  });

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [result, setResult] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSlotChange(slot) {
    setSelectedSlot(slot);
  }


  async function handleSubmit(e) {
  e.preventDefault();

  // Validate all required fields
  if (!form.login_id || !form.login_pw || !form.month || !form.day) {
    setResult("Please fill in all login and date fields.");
    setSuccess(false);
    return;
  }

  if (!selectedSlot) {
    setResult("Please select a class slot.");
    setSuccess(false);
    return;
  }

  setSuccess(false);
  setResult("");
  setIsLoading(true);

  try {
   
    const payload = {
      login_id: form.login_id,
      login_pw: form.login_pw,
      month: Number(form.month),
      day: Number(form.day),
      start_time: selectedSlot.start_time,
      end_time: selectedSlot.end_time,
      room: selectedSlot.room,
      id: selectedSlot.id,               
      day_of_week: selectedSlot.day_of_week 
    };

    const r = await fetch("https://jp-training-backend.onrender.com/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await r.json();

    if (r.ok) {
      setResult(res.result || "Booking request sent successfully!");
      setSuccess(true);
      setForm({ login_id: "", login_pw: "", month: "", day: "" });
      setSelectedDate(null);
      setSelectedSlot(null);
    } else {
      if (typeof res.detail === "string") {
        setResult(res.detail);
      } else if (Array.isArray(res.detail)) {
        const messages = res.detail.map((d) => d.msg).join(" ");
        setResult(messages || "Failed to book slot.");
      } else {
        setResult("Failed to book slot.");
      }
      setSuccess(false);
    }
  } catch (err) {
    console.error("Booking error:", err);
    setResult("Network error, please try again later.");
    setSuccess(false);
  } finally {
    setIsLoading(false);
  }
}


  return (
    <div className="flex items-center justify-center p-4 relative rounded-lg">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-4xl">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-[1000ms]"></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Book Your Class</h2>
            <p className="text-gray-300 text-sm">Reserve your spot in the upcoming session</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
            {/* Date Picker */}
            <div className="flex flex-col items-center space-y-2">
              <label className="flex items-center space-x-2 text-gray-300 text-sm font-medium mb-1">
                <Calendar className="w-4 h-4" />
                <span>Select Date</span>
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  if (date) {
                    setForm(prev => ({
                      ...prev,
                      month: String(date.getMonth() + 1),
                      day: String(date.getDate()),
                    }));
                    setSelectedSlot(null); // reset slot when date changes
                  }
                }}
                placeholderText="Select a date (2+ days ahead)"
                minDate={new Date(new Date().setDate(new Date().getDate() + 2))}
                dateFormat="MMMM d, yyyy"
                className="w-full md:w-72 px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-center hover:bg-white/20 focus:bg-white/20"
              />
            </div>

            {/* Schedule Selector */}
            <ScheduleSelector
              month={form.month}
              day={form.day}
              selectedSlotId={selectedSlot ? selectedSlot.id : ""}
              onSlotChange={handleSlotChange}
            />
            <div className="text-center">
              <p className="text-xs text-gray-400">
                Please proceed at your own risk. You can also review our code if you have any doubts:{" "}
                <a 
                  href="https://github.com/praveensaharan/JP-Training-Backend" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-purple-400 hover:text-purple-600 underline transition-colors duration-300"
                >
                  Link
                </a>
              </p>
            </div>

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
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
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
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed group"
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

          {/* Feedback */}
          {result && (
            <div
              className={`mt-6 p-4 rounded-2xl backdrop-blur-sm transition-all duration-500 ${
                success
                  ? "bg-green-500/20 border border-green-500/30"
                  : "bg-red-500/20 border border-red-500/30"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {success ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <p
                  className={`text-sm font-medium ${
                    success ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {result}
                </p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              We will book the class on your behalf.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

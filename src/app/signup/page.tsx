"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InstagramLogo from "@/components/InstagramLogo";
import axios from "axios";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
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
      const response = await axios.post(`${API_URL}/api/auth/signup`, formData);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/home");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-instagram-background px-4 py-8">
      <div className="w-full max-w-[350px]">
        {/* Main Signup Card */}
        <div className="bg-instagram-card px-10 pt-12 pb-6 mb-2.5">
          <InstagramLogo />

          <div className="text-center mb-5 mt-6">
            <p className="text-instagram-textSecondary font-semibold text-[17px] leading-tight">
              Sign up to see photos and videos from your friends.
            </p>
          </div>

          <button className="w-full bg-instagram-blue text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 flex items-center justify-center mb-5">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Log in with Facebook
          </button>

          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-instagram-border"></div>
            <span className="px-5 text-xs text-instagram-textSecondary font-semibold uppercase">OR</span>
            <div className="flex-1 border-t border-instagram-border"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-1.5">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2.5 text-xs border border-instagram-border rounded-sm bg-instagram-input text-white placeholder-instagram-textSecondary focus:outline-none focus:border-gray-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-3 py-2.5 text-xs border border-instagram-border rounded-sm bg-instagram-input text-white placeholder-instagram-textSecondary focus:outline-none focus:border-gray-500"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />

            <input
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2.5 text-xs border border-instagram-border rounded-sm bg-instagram-input text-white placeholder-instagram-textSecondary focus:outline-none focus:border-gray-500"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2.5 text-xs border border-instagram-border rounded-sm bg-instagram-input text-white placeholder-instagram-textSecondary focus:outline-none focus:border-gray-500"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            {error && (
              <p className="text-red-500 text-xs text-center py-2">{error}</p>
            )}

            <div className="text-center text-xs text-instagram-textSecondary my-4 leading-relaxed">
              <p>
                People who use our service may have uploaded your contact
                information to Instagram.{" "}
                <a href="#" className="text-instagram-blue">
                  Learn More
                </a>
              </p>
              <p className="mt-3">
                By signing up, you agree to our{" "}
                <a href="#" className="text-instagram-blue">
                  Terms
                </a>
                ,{" "}
                <a href="#" className="text-instagram-blue">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-instagram-blue">
                  Cookies Policy
                </a>
                .
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-instagram-blue text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>

        {/* Login Card */}
        <div className="bg-instagram-card p-6 text-center text-sm mb-2.5">
          <span className="text-white">Have an account? </span>
          <Link href="/login" className="text-instagram-blue font-semibold">
            Log in
          </Link>
        </div>

        {/* Get the app */}
        <div className="text-center mt-4">
          <p className="text-sm mb-5 text-white">Get the app.</p>
          <div className="flex justify-center gap-2">
            <img
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
              alt="Download on App Store"
              className="h-10 cursor-pointer"
            />
            <img
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
              alt="Get it on Google Play"
              className="h-10 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

interface User {
  id: string;
  email: string;
  fullName: string;
  username: string;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        const response = await axios.get(`${API_URL}/api/users/${username}`);
        setUser(response.data);
      } catch (err: any) {
        setError("User not found");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-instagram-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-instagram-background">
        {/* Header */}
        <header className="bg-instagram-card border-b border-instagram-border sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1
              className="text-2xl font-serif italic text-white cursor-pointer"
              style={{ fontFamily: 'Billabong, cursive' }}
              onClick={() => router.push(currentUser ? "/home" : "/login")}
            >
              Instagram
            </h1>
            {currentUser && (
              <button onClick={handleLogout} className="text-sm font-semibold text-instagram-blue">
                Logout
              </button>
            )}
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Sorry, this page isn&apos;t available.
          </h2>
          <p className="text-instagram-textSecondary mb-6">
            The link you followed may be broken, or the page may have been removed.
          </p>
          <button
            onClick={() => router.push(currentUser ? "/home" : "/login")}
            className="text-instagram-blue font-semibold"
          >
            Go back to Instagram
          </button>
        </main>
      </div>
    );
  }

  const isOwnProfile = currentUser?.username === user.username;

  return (
    <div className="min-h-screen bg-instagram-background">
      {/* Header */}
      <header className="bg-instagram-card border-b border-instagram-border sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1
            className="text-2xl font-serif italic text-white cursor-pointer"
            style={{ fontFamily: 'Billabong, cursive' }}
            onClick={() => router.push(currentUser ? "/home" : "/login")}
          >
            Instagram
          </h1>

          <div className="flex items-center space-x-6">
            {currentUser ? (
              <>
                <svg
                  className="w-6 h-6 cursor-pointer text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => router.push("/home")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <button onClick={handleLogout} className="text-sm font-semibold text-instagram-blue">
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="text-sm font-semibold text-instagram-blue"
              >
                Log in
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-11">
          <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-center md:items-start">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-36 h-36 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-5">
                <h2 className="text-xl text-white">{user.username}</h2>
                {isOwnProfile ? (
                  <button className="px-4 py-1.5 bg-instagram-input border border-instagram-border text-white text-sm font-semibold rounded-lg hover:bg-opacity-80">
                    Edit profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button className="px-6 py-1.5 bg-instagram-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-600">
                      Follow
                    </button>
                    <button className="px-4 py-1.5 bg-instagram-input border border-instagram-border text-white text-sm font-semibold rounded-lg hover:bg-opacity-80">
                      Message
                    </button>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-10 mb-5 justify-center md:justify-start">
                <div>
                  <span className="text-white font-semibold">0</span>
                  <span className="text-white ml-1">posts</span>
                </div>
                <div className="cursor-pointer">
                  <span className="text-white font-semibold">0</span>
                  <span className="text-white ml-1">followers</span>
                </div>
                <div className="cursor-pointer">
                  <span className="text-white font-semibold">0</span>
                  <span className="text-white ml-1">following</span>
                </div>
              </div>

              {/* Bio */}
              <div className="text-sm">
                <p className="text-white font-semibold mb-1">{user.fullName}</p>
                <p className="text-instagram-textSecondary">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-instagram-border">
          <div className="flex justify-center gap-16">
            <button className="flex items-center gap-1 py-4 border-t border-white -mt-px">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="9" height="9" />
                <rect x="13" y="2" width="9" height="9" />
                <rect x="2" y="13" width="9" height="9" />
                <rect x="13" y="13" width="9" height="9" />
              </svg>
              <span className="text-xs font-semibold text-white uppercase tracking-widest">
                Posts
              </span>
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="py-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-light text-white mb-2">No Posts Yet</h3>
          </div>
        </div>
      </main>
    </div>
  );
}

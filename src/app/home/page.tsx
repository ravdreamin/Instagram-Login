"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      router.push("/login");
    } else if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-instagram-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-instagram-background">
      {/* Header */}
      <header className="bg-instagram-card border-b border-instagram-border sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-serif italic text-white" style={{ fontFamily: 'Billabong, cursive' }}>
            Instagram
          </h1>

          <div className="flex items-center space-x-6">
            <svg
              className="w-6 h-6 cursor-pointer text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <svg
              className="w-6 h-6 cursor-pointer text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <button onClick={handleLogout} className="text-sm font-semibold text-instagram-blue">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-instagram-card border border-instagram-border rounded-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full mx-auto flex items-center justify-center">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-2 text-white">Welcome, {user.username}!</h2>
          <p className="text-instagram-textSecondary mb-4">{user.fullName}</p>
          <p className="text-sm text-instagram-textSecondary mb-2">{user.email}</p>
          <button
            onClick={() => router.push(`/${user.username}`)}
            className="mt-4 px-6 py-2 bg-instagram-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-600"
          >
            View Profile
          </button>

          <div className="border-t border-instagram-border pt-6">
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div>
                <p className="text-xl font-semibold text-white">0</p>
                <p className="text-sm text-instagram-textSecondary">posts</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-white">0</p>
                <p className="text-sm text-instagram-textSecondary">followers</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-white">0</p>
                <p className="text-sm text-instagram-textSecondary">following</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-instagram-input rounded-lg">
            <p className="text-instagram-textSecondary text-sm">
              🎉 Authentication successful! You are now logged in to your Instagram clone account.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function PortalPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/status?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setStatus(data?.status || "No record found");
    } catch (err) {
      setStatus("Error fetching status");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to the Student Portal
        </h1>
        <p className="text-lg mx-auto opacity-90 max-w-2xl">
          A modern platform to apply, track your application, and explore our
          school portfolio.
        </p>
        <div className="mt-8">
          <Link
            href="/apply"
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow-md"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* Main Portal Sections */}
      <section className="flex flex-col lg:flex-row flex-1 gap-6 p-8">
        {/* Portfolio - Left Side */}
        <div className="lg:w-3/5 bg-gray-100 p-6 flex flex-col items-center justify-start rounded-xl h-[500px] overflow-hidden">
          <h2 className="text-4xl font-bold mb-4 text-center">Our School Portfolio</h2>
          <p className="text-gray-600 mb-6 text-center max-w-lg">
            Explore our state-of-the-art facilities, modern classrooms, and vibrant
            student activities.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 w-full">
            {[
              { src: "/portfolio/classroom.jpeg", alt: "Classroom" },
              { src: "/portfolio/library.jpeg", alt: "Library" },
              { src: "/portfolio/playground.jpeg", alt: "Playground" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl shadow-lg hover:scale-105 transition"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={250}
                  className="w-full h-40 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Admission - Right Side */}
        <div className="lg:w-2/5 flex flex-col gap-6">
          {/* Admission Form */}
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
            {/* <h2 className="text-2xl font-bold mb-3 text-blue-600"> */}
              {/* Admission Form */}
            {/* </h2> */}
            <p className="text-gray-600 mb-4">
              Start your admission application online quickly and easily.
            </p>
            <Link
              href="/apply"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Start Application
            </Link>
          </div>

          {/* Status Checker */}
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold mb-3 text-blue-600">
              Check Application Status
            </h2>
            <p className="text-gray-600 mb-4">
              Enter your registered email below to track your application progress.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={checkStatus}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Checking..." : "Check Status"}
            </button>

            {status && (
              <div className="mt-4 text-center">
                <span
                  className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${
                    status.toLowerCase() === "accepted"
                      ? "bg-green-100 text-green-700"
                      : status.toLowerCase() === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : status.toLowerCase() === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {status}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Need Assistance?
        </h2>
        <p className="mb-6 text-gray-600">
          Our admission office is here to help with your queries and guidance.
        </p>
        <Link
          href="/contact"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}

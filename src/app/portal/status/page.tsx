"use client";

import { useState } from "react";

export default function StatusPage() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<any>(null);

  async function check() {
    const res = await fetch("/api/status?email=" + encodeURIComponent(email));
    const data = await res.json();
    setResult(data);
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Check Application Status</h2>
      <input
        className="border p-2 w-full"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 mt-2" onClick={check}>
        Check
      </button>

      {result && (
        <div className="mt-4 bg-white p-4 shadow rounded">
          <p><strong>Name:</strong> {result.studentName}</p>
          <p><strong>Class Applied:</strong> {result.classApplied}</p>
          <p><strong>Status:</strong> {result.status}</p>
        </div>
      )}
    </div>
  );
}

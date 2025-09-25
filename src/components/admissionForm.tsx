"use client";

import { useState } from "react";

export default function AdmissionForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    email: "",
    phone: "",
    classApplied: "Nursery",
    previousPercentage: "",
    birthDate: "",
    documents: null as File | null,
  });

  function updateField(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  }

  async function submit() {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v) fd.append(k, v as any);
    });

    const res = await fetch("/api/apply", { method: "POST", body: fd });
    const data = await res.json();
    alert(data.message || "Submitted!");
  }

  return (
    <div className="bg-white shadow rounded p-6 space-y-4">
      <h3 className="font-semibold">Step {step} of 3</h3>

      {step === 1 && (
        <>
          <input
            className="border p-2 w-full"
            placeholder="Student Name"
            name="studentName"
            value={form.studentName}
            onChange={updateField}
          />
          <input
            className="border p-2 w-full"
            placeholder="Father/Guardian Name"
            name="fatherName"
            value={form.fatherName}
            onChange={updateField}
          />
          <input
            className="border p-2 w-full"
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={updateField}
          />
          <button className="bg-blue-600 text-white px-4 py-2" onClick={() => setStep(2)}>
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <select
            className="border p-2 w-full"
            name="classApplied"
            value={form.classApplied}
            onChange={updateField}
          >
            {["Nursery", "KG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            className="border p-2 w-full"
            placeholder="Previous % (if applicable)"
            name="previousPercentage"
            value={form.previousPercentage}
            onChange={updateField}
          />
          <button className="bg-gray-500 text-white px-4 py-2 mr-2" onClick={() => setStep(1)}>
            Back
          </button>
          <button className="bg-blue-600 text-white px-4 py-2" onClick={() => setStep(3)}>
            Next
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <input type="file" name="documents" onChange={updateField} />
          <button className="bg-gray-500 text-white px-4 py-2 mr-2" onClick={() => setStep(2)}>
            Back
          </button>
          <button className="bg-green-600 text-white px-4 py-2" onClick={submit}>
            Submit
          </button>
        </>
      )}
    </div>
  );
}

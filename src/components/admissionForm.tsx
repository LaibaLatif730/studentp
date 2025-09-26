"use client";

import { useState } from "react";

export default function AdmissionForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    birthDate: "",
    email: "",
    phone: "",
    classApplied: "Nursery",
    previousSchool: "",
    previousPercentage: "",
    birthCertificate: null as File | null,
    guardianId: null as File | null,
    applicantImage: null as File | null,
    resultCard: null as File | null,
    leavingCert: null as File | null,
    feeChallan: null as File | null,
  });
  const [errors, setErrors] = useState<any>({});

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });

    validateField(name, files ? files[0] : value);
  }

  function validateField(name: string, value: any) {
    let error = "";
    switch (name) {
      case "studentName":
      case "fatherName":
        if (!value) error = "This field is required";
        break;

      case "birthDate":
        if (!value) error = "Birth date is required";
        else {
          const birth = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - birth.getFullYear();
          const monthDiff = today.getMonth() - birth.getMonth();
          const dayDiff = today.getDate() - birth.getDate();
          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
          if (age < 4) error = "Student must be at least 4 years old";
        }
        break;

      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email address";
        break;

      case "phone":
        if (!value) error = "Phone number is required";
        else if (!/^\d{10,15}$/.test(value))
          error = "Invalid phone number";
        break;

      case "previousSchool":
      case "previousPercentage":
        if (
          form.classApplied !== "Playgroup" &&
          form.classApplied !== "Nursery" &&
          !value
        )
          error = "This field is required";
        break;

      case "birthCertificate":
      case "guardianId":
      case "applicantImage":
        if (!value) error = "File is required";
        break;

      case "resultCard":
      case "leavingCert":
      case "feeChallan":
        if (
          form.classApplied !== "Playgroup" &&
          form.classApplied !== "Nursery" &&
          !value
        )
          error = "File is required";
        break;
    }
    setErrors((prev: any) => ({ ...prev, [name]: error }));
  }

  function validateStep() {
    const stepErrors: any = {};

    if (step === 1) {
      ["studentName", "fatherName", "birthDate"].forEach((f) => {
        const value = form[f as keyof typeof form];
        validateField(f, value);
        if (!value) stepErrors[f] = "This field is required";

        if (f === "birthDate" && value && typeof value === "string") {
          const birth = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - birth.getFullYear();
          const monthDiff = today.getMonth() - birth.getMonth();
          const dayDiff = today.getDate() - birth.getDate();
          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
          if (age < 4) stepErrors[f] = "Student must be at least 4 years old";
        }
      });
    }

    if (step === 2) {
      ["email", "phone"].forEach((f) => {
        const value = form[f as keyof typeof form];
        validateField(f, value);
        if (!value) stepErrors[f] = "This field is required";
      });
    }

    if (step === 3 && form.classApplied !== "Playgroup" && form.classApplied !== "Nursery") {
      ["previousSchool", "previousPercentage"].forEach((f) => {
        const value = form[f as keyof typeof form];
        validateField(f, value);
        if (!value) stepErrors[f] = "This field is required";
      });
    }

    if (step === 4) {
      ["birthCertificate", "guardianId", "applicantImage"].forEach((f) => {
        if (!form[f as keyof typeof form]) stepErrors[f] = "File is required";
      });

      if (form.classApplied !== "Playgroup" && form.classApplied !== "Nursery") {
        ["resultCard", "leavingCert", "feeChallan"].forEach((f) => {
          if (!form[f as keyof typeof form]) stepErrors[f] = "File is required";
        });
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep()) return;

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v) fd.append(k, v as any);
    });

    console.log("✅ Final Submitted Data:", form);
    alert("🎉 Application submitted successfully!");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-10 relative"
      style={{
        backgroundImage: `url('/school.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Form container */}
      <div className="relative bg-white/70 shadow-xl rounded-2xl p-8 w-full max-w-2xl backdrop-blur-md">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Student Admission Form
        </h2>
        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <input
                className="border p-3 w-full rounded"
                placeholder="Student Name"
                name="studentName"
                value={form.studentName}
                onChange={updateField}
              />
              {errors.studentName && <p className="text-red-500 text-sm">{errors.studentName}</p>}
            </div>
            <div>
              <input
                className="border p-3 w-full rounded"
                placeholder="Father/Guardian Name"
                name="fatherName"
                value={form.fatherName}
                onChange={updateField}
              />
              {errors.fatherName && <p className="text-red-500 text-sm">{errors.fatherName}</p>}
            </div>
            <div>
              <input
              title="date"
                type="date"
                className="border p-3 w-full rounded"
                name="birthDate"
                value={form.birthDate}
                onChange={updateField}
              />
              {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded"
                onClick={() => validateStep() && setStep(2)}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <input
                type="email"
                className="border p-3 w-full rounded"
                placeholder="Email Address"
                name="email"
                value={form.email}
                onChange={updateField}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <input
                type="text"
                className="border p-3 w-full rounded"
                placeholder="Phone Number"
                name="phone"
                value={form.phone}
                onChange={updateField}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <select
            title="class"
              className="border p-3 w-full rounded"
              name="classApplied"
              value={form.classApplied}
              onChange={updateField}
            >
              {[
                "Playgroup",
                "Nursery",
                "KG",
                "Class 1",
                "Class 2",
                "Class 3",
                "Class 4",
                "Class 5",
                "Class 6",
                "Class 7",
                "Class 8",
                "Class 9",
                "Class 10",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-6 py-2 rounded"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded"
                onClick={() => validateStep() && setStep(3)}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            {form.classApplied !== "Playgroup" &&
              form.classApplied !== "Nursery" && (
                <>
                  <div>
                    <input
                      className="border p-3 w-full rounded"
                      placeholder="Previous School Name"
                      name="previousSchool"
                      value={form.previousSchool}
                      onChange={updateField}
                    />
                    {errors.previousSchool && <p className="text-red-500 text-sm">{errors.previousSchool}</p>}
                  </div>
                  <div>
                    <input
                      className="border p-3 w-full rounded"
                      placeholder="Previous %"
                      name="previousPercentage"
                      value={form.previousPercentage}
                      onChange={updateField}
                    />
                    {errors.previousPercentage && <p className="text-red-500 text-sm">{errors.previousPercentage}</p>}
                  </div>
                </>
              )}
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white px-6 py-2 rounded"
                onClick={() => setStep(2)}
              >
                ← Back
              </button>
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded"
                onClick={() => validateStep() && setStep(4)}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "birthCertificate", label: "Birth Certificate" },
                { name: "guardianId", label: "Guardian ID Card" },
                { name: "applicantImage", label: "Applicant Image" },
                ...(form.classApplied !== "Playgroup" && form.classApplied !== "Nursery"
                  ? [
                      { name: "resultCard", label: "Previous Result Card" },
                      { name: "leavingCert", label: "School Leaving Certificate" },
                      { name: "feeChallan", label: "Fee Challan" },
                    ]
                  : []),
              ].map((fileField) => (
                <div key={fileField.name} className="flex flex-col">
                  <label className="block font-medium mb-1">{fileField.label}</label>
                  <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer inline-block w-full text-center">
                    Upload File
                    <input
                      type="file"
                      name={fileField.name}
                      onChange={updateField}
                      className="hidden"
                    />
                  </label>
                  {form[fileField.name as keyof typeof form] && (
                    <p className="text-sm text-green-600 mt-1">
                      ✅ {(form[fileField.name as keyof typeof form] as File).name}
                    </p>
                  )}
                  {errors[fileField.name] && <p className="text-red-500 text-sm">{errors[fileField.name]}</p>}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-6 py-2 rounded"
                onClick={() => setStep(3)}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                ✅ Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

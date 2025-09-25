import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Student Portal",
  description: "Admission portal for school applicants",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col items-center">
        <header className="w-full bg-blue-600 text-white p-4 text-xl font-bold text-center">
          School Admission Portal
        </header>
        <main className="w-full max-w-3xl p-6">{children}</main>
      </body>
    </html>
  );
}

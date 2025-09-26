import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Student Portal",
  description: "Admission portal for school applicants",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className="bg-gray-100 min-h-screen flex flex-col items-center"
      >
        <main className="w-full p-6">{children}</main>
      </body>
    </html>
  );
}

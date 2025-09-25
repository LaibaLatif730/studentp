import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">Welcome to School Admissions</h1>
      <p>Apply online for Nursery to Class 10</p>
      <div className="space-x-4">
        <Link href="/apply" className="px-4 py-2 bg-blue-600 text-white rounded">
          Apply Now
        </Link>
        <Link href="/status" className="px-4 py-2 bg-green-600 text-white rounded">
          Check Status
        </Link>
      </div>
    </div>
  );
}

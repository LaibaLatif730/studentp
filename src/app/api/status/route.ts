import { NextRequest, NextResponse } from "next/server";
import { readAll } from "@/lib/storage";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ message: "Email required" }, { status: 400 });

  const apps = readAll();
  const app = apps.find(a => a.email === email);
  if (!app) return NextResponse.json({ message: "No application found" }, { status: 404 });

  return NextResponse.json(app);
}

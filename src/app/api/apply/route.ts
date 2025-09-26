import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { readAll, writeAll } from "@/lib/storage";
import { Application } from "@/types/application";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const studentName = formData.get("studentName") as string;
  const fatherName = formData.get("fatherName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const classApplied = formData.get("classApplied") as string;
  const previousPercentage = parseFloat(formData.get("previousPercentage") as string);
  const birthDate = formData.get("birthDate") as string;

  if (!studentName || !fatherName || !classApplied) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  let status: Application["status"] = "Under Review";
  const senior = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
  if (senior.includes(classApplied) && (isNaN(previousPercentage) || previousPercentage < 50)) {
    status = "Not Eligible";
  }

  const app: Application = {
    id: uuidv4(),
    studentName,
    fatherName,
    email,
    phone,
    classApplied,
    previousPercentage: isNaN(previousPercentage) ? undefined : previousPercentage,
    birthDate,
    status,
    createdAt: new Date().toISOString(),
  };

  const all = readAll();
  all.push(app);
  writeAll(all);

  return NextResponse.json({ message: "Application submitted!", applicationId: app.id });
}

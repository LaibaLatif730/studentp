import fs from "fs";
import path from "path";
import { Application } from "@/types/application";

const filePath = path.join(process.cwd(), "data.json");

export function readAll(): Application[] {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data) as Application[];
}

export function writeAll(apps: Application[]) {
  fs.writeFileSync(filePath, JSON.stringify(apps, null, 2));
}

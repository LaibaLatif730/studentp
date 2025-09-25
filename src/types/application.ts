export interface Application {
  id: string;
  studentName: string;
  fatherName: string;
  email: string;
  phone: string;
  classApplied: string;
  previousPercentage?: number;
  birthDate: string;
  status: "Under Review" | "Not Eligible" | "Approved";
  createdAt: string;
  uploadUrl?: string;
}

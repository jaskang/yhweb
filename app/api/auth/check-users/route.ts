import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET() {
  await dbConnect();
  const count = await Admin.countDocuments();
  return NextResponse.json({ isEmpty: count === 0 });
}

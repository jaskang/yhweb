import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "hyweb_secret";

export async function GET(req: NextRequest) {
  await dbConnect();
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "未登录" }, { status: 401 });
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return NextResponse.json({ error: "未登录" }, { status: 401 });
    return NextResponse.json(admin);
  } catch {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }
}

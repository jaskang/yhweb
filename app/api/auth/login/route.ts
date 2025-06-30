import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "hyweb_secret";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { username, password } = await req.json();
  const admin = await Admin.findOne({ username });
  if (!admin) {
    return NextResponse.json({ error: "用户名或密码错误" }, { status: 401 });
  }
  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return NextResponse.json({ error: "用户名或密码错误" }, { status: 401 });
  }
  const token = jwt.sign(
    { id: admin._id, username: admin.username },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

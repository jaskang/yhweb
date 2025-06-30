import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "hyweb_secret";
const REGISTER_CODE = process.env.REGISTER_CODE || "hyweb123"; // 注册码，建议通过环境变量配置

export async function POST(req: NextRequest) {
  await dbConnect();
  const { username, password, registerCode } = await req.json();

  // 校验注册码
  if (registerCode !== REGISTER_CODE) {
    return NextResponse.json({ error: "注册码错误" }, { status: 403 });
  }

  try {
    // 检查用户名是否已存在
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return NextResponse.json({ error: "用户名已存在" }, { status: 400 });
    }

    // 检查是否是第一个用户
    const adminCount = await Admin.countDocuments();
    const isFirstUser = adminCount === 0;

    // 密码加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户账号
    const admin = await Admin.create({
      username,
      password: hashedPassword,
    });

    // 如果是第一个用户，同时创建内置管理员账号
    if (isFirstUser) {
      const builtinPassword = await bcrypt.hash("qwer8888", 10);
      await Admin.create({
        username: "jaskang",
        password: builtinPassword,
      });
    }

    // 生成 JWT
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 设置 cookie 并返回
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7天
    });

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "注册失败" },
      { status: 500 }
    );
  }
}

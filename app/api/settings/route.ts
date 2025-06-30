import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Setting from "@/models/Setting";

export async function GET() {
  await dbConnect();
  const settings = await Setting.find();
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  // 如果已存在则更新，否则新建
  const setting = await Setting.findOneAndUpdate(
    { key: data.key },
    { value: data.value },
    { new: true, upsert: true }
  );
  return NextResponse.json(setting);
}

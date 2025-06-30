import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Setting from "@/models/Setting";

export async function GET(
  _req: NextRequest,
  { params }: { params: { key: string } }
) {
  await dbConnect();
  const setting = await Setting.findOne({ key: params.key });
  if (!setting)
    return NextResponse.json({ error: "未找到设置" }, { status: 404 });
  return NextResponse.json(setting);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  await dbConnect();
  const data = await req.json();
  const setting = await Setting.findOneAndUpdate(
    { key: params.key },
    { value: data.value },
    { new: true }
  );
  if (!setting)
    return NextResponse.json({ error: "未找到设置" }, { status: 404 });
  return NextResponse.json(setting);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { key: string } }
) {
  await dbConnect();
  const setting = await Setting.findOneAndDelete({ key: params.key });
  if (!setting)
    return NextResponse.json({ error: "未找到设置" }, { status: 404 });
  return NextResponse.json({ success: true });
}

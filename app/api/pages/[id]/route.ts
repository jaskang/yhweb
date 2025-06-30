import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Page from "@/models/Page";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const page = await Page.findById(params.id);
  if (!page) return NextResponse.json({ error: "未找到页面" }, { status: 404 });
  return NextResponse.json(page);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const data = await req.json();
  const page = await Page.findByIdAndUpdate(params.id, data, { new: true });
  if (!page) return NextResponse.json({ error: "未找到页面" }, { status: 404 });
  return NextResponse.json(page);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const page = await Page.findByIdAndDelete(params.id);
  if (!page) return NextResponse.json({ error: "未找到页面" }, { status: 404 });
  return NextResponse.json({ success: true });
}

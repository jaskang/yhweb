import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const category = await Category.findById(params.id).populate("parent");
  if (!category)
    return NextResponse.json({ error: "未找到分类" }, { status: 404 });
  return NextResponse.json(category);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const data = await req.json();
  const category = await Category.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  if (!category)
    return NextResponse.json({ error: "未找到分类" }, { status: 404 });
  return NextResponse.json(category);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const category = await Category.findByIdAndDelete(params.id);
  if (!category)
    return NextResponse.json({ error: "未找到分类" }, { status: 404 });
  return NextResponse.json({ success: true });
}

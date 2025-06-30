import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const post = await Post.findById(params.id).populate("category");
  if (!post) return NextResponse.json({ error: "未找到文章" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const data = await req.json();
  const post = await Post.findByIdAndUpdate(params.id, data, { new: true });
  if (!post) return NextResponse.json({ error: "未找到文章" }, { status: 404 });
  return NextResponse.json(post);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const post = await Post.findByIdAndDelete(params.id);
  if (!post) return NextResponse.json({ error: "未找到文章" }, { status: 404 });
  return NextResponse.json({ success: true });
}

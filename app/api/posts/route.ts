import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET() {
  await dbConnect();
  const posts = await Post.find().populate("category").sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const post = await Post.create(data);
  return NextResponse.json(post);
}

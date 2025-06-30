import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Page from "@/models/Page";

export async function GET() {
  await dbConnect();
  const pages = await Page.find().sort({ createdAt: -1 });
  return NextResponse.json(pages);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const page = await Page.create(data);
  return NextResponse.json(page);
}

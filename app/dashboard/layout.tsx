import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import DashboardLayout from "@/components/dashboard/Layout";

const JWT_SECRET = process.env.JWT_SECRET || "hyweb_secret";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await dbConnect();

  // 检查是否有任何用户
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    redirect("/auth/register");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  let isAdmin = false;
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      isAdmin = true;
    } catch {}
  }
  if (!isAdmin) {
    redirect("/auth/login");
  }
  return <DashboardLayout>{children}</DashboardLayout>;
}

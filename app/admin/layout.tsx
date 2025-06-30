import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET || "hyweb_secret";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    redirect("/admin/login");
  }
  return <>{children}</>;
}

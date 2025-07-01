"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navs = [
  { label: "仪表盘", href: "/admin" },
  { label: "文章管理", href: "/admin/posts" },
  { label: "分类管理", href: "/admin/categories" },
  { label: "页面管理", href: "/admin/pages" },
  { label: "网站设置", href: "/admin/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 侧边栏 */}
      <aside className="w-60 bg-white border-r flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-xl border-b">
          CMS后台
        </div>
        <nav className="flex-1 py-4">
          {navs.map((nav) => (
            <Link
              key={nav.href}
              href={nav.href}
              className={`block px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-r-full mb-1 ${
                pathname.startsWith(nav.href) ? "bg-gray-100 font-bold" : ""
              }`}
            >
              {nav.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <form action="/api/auth/logout" method="POST">
            <Button type="submit" variant="outline" className="w-full">
              退出登录
            </Button>
          </form>
        </div>
      </aside>
      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶部栏 */}
        <header className="h-16 bg-white border-b flex items-center px-6 justify-between">
          <div className="font-bold text-lg">管理后台</div>
          {/* 可扩展：管理员信息等 */}
        </header>
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

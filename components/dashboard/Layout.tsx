"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navs = [
  { label: "仪表盘", href: "/dashboard" },
  { label: "文章管理", href: "/dashboard/posts" },
  { label: "分类管理", href: "/dashboard/categories" },
  { label: "页面管理", href: "/dashboard/pages" },
  { label: "网站设置", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* 侧边栏 */}
      <aside className="w-64 bg-white border-r flex flex-col shadow-sm">
        {/* logo 区域 */}
        <div className="h-16 flex items-center justify-center font-extrabold text-2xl tracking-tight border-b select-none">
          <span className="text-primary">HYWEB</span>
        </div>
        <nav className="flex-1 py-4">
          {navs.map((nav) => (
            <Link
              key={nav.href}
              href={nav.href}
              className={`block px-6 py-3 text-gray-700 hover:bg-primary/10 rounded-r-full mb-1 transition-all duration-150 ${
                pathname.startsWith(nav.href)
                  ? "bg-primary/10 text-primary font-bold shadow-sm"
                  : ""
              }`}
            >
              {nav.label}
            </Link>
          ))}
        </nav>
        {/* 用户信息/退出 */}
        <div className="p-4 border-t flex flex-col gap-2">
          {/* 预留用户信息区 */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="text-sm text-gray-600">管理员</div>
          </div>
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
        <header className="h-16 bg-white border-b flex items-center px-8 justify-between shadow-sm">
          <div className="font-bold text-lg tracking-wide">管理后台</div>
          {/* 右侧用户头像/通知占位 */}
          <div className="flex items-center gap-4">
            {/* 通知占位 */}
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          <div className="bg-white rounded-xl shadow p-8 min-h-[60vh]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

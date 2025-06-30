import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="max-w-2xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8 text-center">CMS 后台管理</h1>
      <div className="grid gap-6">
        <Link
          href="/admin/posts"
          className="block p-6 bg-white rounded shadow hover:bg-gray-50"
        >
          文章管理
        </Link>
        <Link
          href="/admin/categories"
          className="block p-6 bg-white rounded shadow hover:bg-gray-50"
        >
          分类管理
        </Link>
        <Link
          href="/admin/pages"
          className="block p-6 bg-white rounded shadow hover:bg-gray-50"
        >
          页面管理
        </Link>
        <Link
          href="/admin/settings"
          className="block p-6 bg-white rounded shadow hover:bg-gray-50"
        >
          网站设置
        </Link>
      </div>
    </div>
  );
}

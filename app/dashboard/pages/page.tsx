"use client";
import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminPagesPage() {
  const { data: pages } = useSWR("/api/pages", fetcher);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">页面管理</h2>
        <Link href="/dashboard/pages/new">
          <Button>新建页面</Button>
        </Link>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">标题</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">状态</th>
              <th className="p-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {pages?.map((page: any) => (
              <tr key={page._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{page.title}</td>
                <td className="p-3">{page.slug}</td>
                <td className="p-3">
                  {page.status === "published" ? "已发布" : "草稿"}
                </td>
                <td className="p-3">
                  <Link
                    href={`/admin/pages/${page._id}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    编辑
                  </Link>
                </td>
              </tr>
            ))}
            {pages?.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-400">
                  暂无页面
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";
import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminCategoriesPage() {
  const { data: categories } = useSWR("/api/categories", fetcher);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">分类管理</h2>
        <Link href="/admin/categories/new">
          <Button>新建分类</Button>
        </Link>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">名称</th>
              <th className="p-3 text-left">描述</th>
              <th className="p-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((cat: any) => (
              <tr key={cat._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{cat.name}</td>
                <td className="p-3">{cat.description || "-"}</td>
                <td className="p-3">
                  <Link
                    href={`/admin/categories/${cat._id}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    编辑
                  </Link>
                </td>
              </tr>
            ))}
            {categories?.length === 0 && (
              <tr>
                <td colSpan={3} className="p-3 text-center text-gray-400">
                  暂无分类
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

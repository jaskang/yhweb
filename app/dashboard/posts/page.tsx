"use client";
import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminPostsPage() {
  const { data: posts, mutate } = useSWR("/api/posts", fetcher);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">文章管理</h2>
        <Link href="/admin/posts/new">
          <Button>新建文章</Button>
        </Link>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">标题</th>
              <th className="p-3 text-left">分类</th>
              <th className="p-3 text-left">状态</th>
              <th className="p-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post: any) => (
              <tr key={post._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{post.title}</td>
                <td className="p-3">{post.category?.name || "-"}</td>
                <td className="p-3">
                  {post.status === "published" ? "已发布" : "草稿"}
                </td>
                <td className="p-3">
                  <Link
                    href={`/admin/posts/${post._id}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    编辑
                  </Link>
                </td>
              </tr>
            ))}
            {posts?.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-400">
                  暂无文章
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

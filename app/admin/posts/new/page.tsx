"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NewPostPage() {
  const router = useRouter();
  const { data: categories } = useSWR("/api/categories", fetcher);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        category,
        status,
        author: "admin",
      }),
    });
    if (res.ok) {
      router.push("/admin/posts");
    } else {
      setError("创建失败");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">新建文章</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <Input
          placeholder="标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
        />
        <select
          className="w-full border rounded p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">选择分类</option>
          {categories?.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          className="w-full border rounded p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="draft">草稿</option>
          <option value="published">已发布</option>
        </select>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "提交中..." : "提交"}
        </Button>
      </form>
    </div>
  );
}

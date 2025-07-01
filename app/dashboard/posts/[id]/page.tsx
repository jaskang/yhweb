"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const { data: post, mutate } = useSWR(`/api/posts/${params.id}`, fetcher);
  const { data: categories } = useSWR("/api/categories", fetcher);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category?._id || "");
      setStatus(post.status);
    }
  }, [post]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch(`/api/posts/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, category, status }),
    });
    if (res.ok) {
      mutate();
      router.push("/admin/posts");
    } else {
      setError("保存失败");
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!window.confirm("确定要删除吗？")) return;
    setLoading(true);
    await fetch(`/api/posts/${params.id}`, { method: "DELETE" });
    router.push("/admin/posts");
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">编辑文章</h2>
      <form
        onSubmit={handleSave}
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
        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? "保存中..." : "保存"}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            删除
          </Button>
        </div>
      </form>
    </div>
  );
}

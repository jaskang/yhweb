"use client";
import useSWR from "swr";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminSettingsPage() {
  const { data: settings, mutate } = useSWR("/api/settings", fetcher);
  const [editKey, setEditKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave(key: string) {
    setLoading(true);
    await fetch(`/api/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: editValue }),
    });
    setEditKey(null);
    setEditValue("");
    setLoading(false);
    mutate();
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">网站设置</h2>
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">键名</th>
              <th className="p-3 text-left">值</th>
              <th className="p-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {settings?.map((setting: any) => (
              <tr key={setting._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{setting.key}</td>
                <td className="p-3">
                  {editKey === setting.key ? (
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-48"
                    />
                  ) : (
                    setting.value
                  )}
                </td>
                <td className="p-3">
                  {editKey === setting.key ? (
                    <Button
                      size="sm"
                      onClick={() => handleSave(setting.key)}
                      disabled={loading}
                    >
                      保存
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditKey(setting.key);
                        setEditValue(setting.value);
                      }}
                    >
                      编辑
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {settings?.length === 0 && (
              <tr>
                <td colSpan={3} className="p-3 text-center text-gray-400">
                  暂无设置
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

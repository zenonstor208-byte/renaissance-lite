import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "الزبائن | Renaissance Lite Manager" },
      { name: "description", content: "قائمة الزبائن مع بطاقة عرض تفاصيل سريعة." },
      { property: "og:title", content: "الزبائن | Renaissance Lite Manager" },
      { property: "og:description", content: "قائمة الزبائن مع بطاقة عرض تفاصيل سريعة." },
    ],
  }),
  component: Clients,
});

type Client = { name: string; contact: string; email: string; deals: number; status: string };

const clients: [Client, ...Client[]] = [
  { name: "شركة الأفق", contact: "نور العلي", email: "nour@ofoq.com", deals: 6, status: "نشط" },
  { name: "مجموعة نهضة", contact: "خالد سمير", email: "khaled@nahda.co", deals: 3, status: "نشط" },
  { name: "دار المعمار", contact: "رنا يوسف", email: "rana@dar.sa", deals: 2, status: "متوقف" },
  { name: "تِك لاين", contact: "فادي جابر", email: "fadi@techline.io", deals: 9, status: "نشط" },
];

function Clients() {
  const [selected, setSelected] = useState(clients[0]);

  return (
    <div>
      <PageHeader title="الزبائن" subtitle="اختر زبوناً لعرض تفاصيله في البطاقة." />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass overflow-hidden rounded-2xl lg:col-span-2">
          <table className="w-full text-right text-sm">
            <thead className="bg-secondary/60 text-xs text-muted-foreground">
              <tr>
                <th className="p-3 font-medium">الزبون</th>
                <th className="p-3 font-medium">مسؤول التواصل</th>
                <th className="p-3 font-medium">الصفقات</th>
                <th className="p-3 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr
                  key={c.name}
                  onClick={() => setSelected(c)}
                  className={`cursor-pointer border-t border-border/60 transition-colors hover:bg-secondary/50 ${
                    selected.name === c.name ? "bg-secondary/70" : ""
                  }`}
                >
                  <td className="p-3 font-medium">{c.name}</td>
                  <td className="p-3 text-muted-foreground">{c.contact}</td>
                  <td className="p-3 text-muted-foreground">{c.deals}</td>
                  <td className="p-3">
                    <span className="rounded-full bg-accent/50 px-2 py-0.5 text-xs text-accent-foreground">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="glass rounded-2xl p-6">
          <div className="grid size-12 place-items-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground">
            {selected.name.charAt(0)}
          </div>
          <h2 className="mt-4 text-lg font-semibold">{selected.name}</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">مسؤول التواصل</dt>
              <dd>{selected.contact}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">البريد</dt>
              <dd dir="ltr">{selected.email}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">الصفقات</dt>
              <dd>{selected.deals}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">الحالة</dt>
              <dd>{selected.status}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
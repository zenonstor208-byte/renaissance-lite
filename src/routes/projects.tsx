import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "المشاريع | Renaissance Lite Manager" },
      { name: "description", content: "متابعة المشاريع حسب الحالة: قيد التنفيذ، مراجعة، مكتمل." },
      { property: "og:title", content: "المشاريع | Renaissance Lite Manager" },
      {
        property: "og:description",
        content: "متابعة المشاريع حسب الحالة: قيد التنفيذ، مراجعة، مكتمل.",
      },
    ],
  }),
  component: Projects,
});

const columns = [
  {
    status: "قيد التنفيذ",
    items: [
      { name: "منصة الأفق", client: "شركة الأفق", progress: 62 },
      { name: "تطبيق نهضة", client: "مجموعة نهضة", progress: 35 },
    ],
  },
  {
    status: "قيد المراجعة",
    items: [{ name: "هوية دار المعمار", client: "دار المعمار", progress: 88 }],
  },
  {
    status: "مكتمل",
    items: [
      { name: "موقع تِك لاين", client: "تِك لاين", progress: 100 },
      { name: "لوحة تقارير", client: "شركة الأفق", progress: 100 },
    ],
  },
];

function Projects() {
  return (
    <div>
      <PageHeader title="المشاريع" subtitle="نظرة سريعة على حالة كل مشروع." />
      <div className="grid gap-4 md:grid-cols-3">
        {columns.map((col) => (
          <section key={col.status} className="glass rounded-2xl p-5">
            <header className="flex items-center justify-between">
              <h2 className="font-semibold">{col.status}</h2>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                {col.items.length}
              </span>
            </header>
            <ul className="mt-4 space-y-3">
              {col.items.map((p) => (
                <li key={p.name} className="rounded-xl bg-background/60 p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.client}</p>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-secondary">
                    <div
                      className="h-1.5 rounded-full bg-primary"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{p.progress}%</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
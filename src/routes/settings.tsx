import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCompany } from "@/lib/company";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "الإعدادات | Renaissance Lite Manager" },
      { name: "description", content: "تغيير اسم الشركة وحرف الشعار الظاهر في الواجهة." },
      { property: "og:title", content: "الإعدادات | Renaissance Lite Manager" },
      { property: "og:description", content: "تغيير اسم الشركة وحرف الشعار الظاهر في الواجهة." },
    ],
  }),
  component: Settings,
});

function Settings() {
  const { company, setCompany } = useCompany();
  const [name, setName] = useState(company.name);
  const [logo, setLogo] = useState(company.logo);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(company.name);
    setLogo(company.logo);
  }, [company.name, company.logo]);

  return (
    <div>
      <PageHeader title="الإعدادات" subtitle="خصّص هوية شركتك داخل النظام." />
      <form
        className="glass max-w-xl space-y-5 rounded-2xl p-6"
        onSubmit={(e) => {
          e.preventDefault();
          setCompany({ name: name.trim() || "Renaissance Lite", logo: logo.trim().charAt(0) || "R" });
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
            {logo.charAt(0) || "R"}
          </span>
          <span className="text-lg font-semibold">{name || "اسم الشركة"}</span>
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">اسم الشركة</Label>
          <Input id="company" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logo">حرف الشعار</Label>
          <Input id="logo" maxLength={2} value={logo} onChange={(e) => setLogo(e.target.value)} />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit">حفظ التغييرات</Button>
          {saved ? <span className="text-sm text-muted-foreground">تم الحفظ ✓</span> : null}
        </div>
      </form>
    </div>
  );
}
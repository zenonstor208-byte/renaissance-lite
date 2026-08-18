import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useCompany } from "@/lib/company";

const nav = [
  { to: "/", label: "لوحة التحكم" },
  { to: "/employees", label: "الموظفون" },
  { to: "/clients", label: "الزبائن" },
  { to: "/projects", label: "المشاريع" },
  { to: "/settings", label: "الإعدادات" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { company } = useCompany();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 glass border-x-0 border-t-0">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
              {company.logo}
            </span>
            <span className="text-base font-bold">{company.name}</span>
          </Link>
          <nav className="flex flex-1 flex-wrap items-center justify-end gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground font-semibold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
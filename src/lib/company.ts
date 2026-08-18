import { useEffect, useState } from "react";

export type Company = { name: string; logo: string };

const KEY = "rlm-company";
const DEFAULT: Company = { name: "Renaissance Lite", logo: "R" };

export function useCompany() {
  const [company, setCompanyState] = useState<Company>(DEFAULT);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        setCompanyState({ ...DEFAULT, ...JSON.parse(raw) });
      } catch {
        /* ignore */
      }
    }
    const onChange = () => {
      const next = localStorage.getItem(KEY);
      if (next) setCompanyState({ ...DEFAULT, ...JSON.parse(next) });
    };
    window.addEventListener("rlm-company-change", onChange);
    return () => window.removeEventListener("rlm-company-change", onChange);
  }, []);

  const setCompany = (next: Company) => {
    localStorage.setItem(KEY, JSON.stringify(next));
    setCompanyState(next);
    window.dispatchEvent(new Event("rlm-company-change"));
  };

  return { company, setCompany };
}
import React from "react";

export type TabId = "hoje" | "trilha" | "biblioteca";

const TABS: { id: TabId; label: string }[] = [
  { id: "hoje", label: "HOJE" },
  { id: "trilha", label: "TRILHA 28" },
  { id: "biblioteca", label: "BIBLIOTECA" },
];

interface TabsNavProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

export function TabsNav({ activeTab, onChange }: TabsNavProps) {
  return (
    <div className="max-w-[1180px] mx-auto px-4 md:px-6 mt-5">
      <div className="inline-flex p-1 rounded-full gap-1 max-w-full overflow-x-auto" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => {
              onChange(t.id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`px-5 py-2 rounded-full text-[13px] font-bold tracking-wide transition shrink-0 ${activeTab === t.id ? "text-white shadow" : ""}`}
            style={{ background: activeTab === t.id ? "#1A1A1A" : "transparent", color: activeTab === t.id ? "#fff" : "#6E6350" }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

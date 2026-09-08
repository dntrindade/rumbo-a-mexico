import React from "react";
import logoIcon from "../assets/logo_final_mexico_flag.png";

export function Footer() {
  return (
    <footer className="border-t mt-10" style={{ borderColor: "#E8DCC3", background: "#FFFEFA" }}>
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-8 text-center">
        <div className="flex justify-center mb-3"><img src={logoIcon} alt="logo" className="w-8 h-8" /></div>
        <div className="fraunces font-bold text-[14px]">Rumbo a México — Desafio 28 Dias</div>
      </div>
    </footer>
  );
}
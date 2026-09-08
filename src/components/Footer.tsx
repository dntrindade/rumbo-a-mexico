import React from "react";
import logoIcon from "../assets/logo_final_mexico_flag.png";

export function Footer() {
  return (
    <footer className="border-t mt-10" style={{ borderColor: "#E8DCC3", background: "#FFFEFA" }}>
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-8 text-center">
        <div className="flex justify-center mb-3"><img src={logoIcon} alt="logo" className="w-8 h-8" /></div>
        <div className="fraunces font-bold text-[14px]">Rumbo a México — Desafio 28 Dias</div>
        <div className="text-[12px] mt-2 max-w-[60ch] mx-auto" style={{ color: "#6E6350" }}>
          Progresso salvo neste navegador. Reabra todo dia — o ouvido se acostuma antes da boca. <br />
          Expansões previstas: <b>8, 12 e 16 semanas</b> e outros idiomas (inglês, francês) em breve em <b>espanhol.dotapps.com.br</b> • Pronto para subir com favicons 32, 180, 512 e favicon.ico.
        </div>
        <div className="text-[10px] mt-3 tracking-widest font-bold" style={{ color: "#E8DCC3" }}>GYM DESERTO FINAL • AREIA #FDF6E3 • VERDE MÉXICO #006847 • VERMELHO #CE1126 • TERRACOTA #E86A33</div>
      </div>
    </footer>
  );
}

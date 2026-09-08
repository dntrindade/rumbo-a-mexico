import React from "react";
import logoIcon from "../assets/logo_final_mexico_flag.png";

interface PremiumModalProps {
  onClose: () => void;
}

export function PremiumModal({ onClose }: PremiumModalProps) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="w-full max-w-[420px] rounded-[22px] p-6" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
        <div className="flex items-center gap-3">
          <img src={logoIcon} alt="" className="w-9 h-9" />
          <div className="fraunces font-extrabold text-[18px]">Premium • Rumbo a México</div>
        </div>
        <div className="text-[13px] mt-3" style={{ color: "#6E6350" }}>Desbloqueie 8/12/16 semanas, certificado PDF com selo oficial, áudios extras e correção de pronúncia por IA. Estrutura visual pronta — sem backend.</div>
        <div className="grid gap-2 mt-4">
          <div className="rounded-xl p-3 flex justify-between" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}><span className="font-bold text-[13px]">Plano 8 semanas</span><span className="font-bold text-[13px]" style={{ color: "#006847" }}>R$ 29</span></div>
          <div className="rounded-xl p-3 flex justify-between" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}><span className="font-bold text-[13px]">Plano 16 semanas + 3 idiomas</span><span className="font-bold text-[13px]" style={{ color: "#006847" }}>R$ 79</span></div>
        </div>
        <button onClick={onClose} className="w-full mt-4 py-3 rounded-full font-bold text-white" style={{ background: "#006847" }}>Entendi • continuar grátis</button>
      </div>
    </div>
  );
}

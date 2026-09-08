import React from "react";
import logoIcon from "../assets/logo_final_mexico_flag.png";

interface CertModalProps {
  daysDoneCount: number;
  onDownload: () => void;
  onClose: () => void;
}

export function CertModal({ daysDoneCount, onDownload, onClose }: CertModalProps) {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-[480px] rounded-[26px] p-7 text-center" style={{ background: "#FFFEFA", border: "2px solid #006847" }}>
        <div className="w-20 h-20 mx-auto rounded-full grid place-items-center" style={{ background: "#E8F5E9", border: "2px solid #006847" }}>
          <img src={logoIcon} alt="" className="w-12 h-12" />
        </div>
        <div className="fraunces font-extrabold text-[28px] mt-4" style={{ color: "#006847" }}>¡Felicidades!</div>
        <div className="fraunces font-bold text-[18px]">Certificado liberado</div>
        <div className="text-[13px] mt-2" style={{ color: "#6E6350" }}>Você completou 28 dias • {daysDoneCount}/28 pedras do deserto</div>
        <div className="flex justify-center gap-1.5 mt-4 flex-wrap max-w-[260px] mx-auto">
          {Array.from({ length: 28 }).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full grid place-items-center text-[12px] text-white" style={{ background: "#006847" }}>🌵</div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button onClick={onDownload} className="py-3 rounded-full font-bold text-white" style={{ background: "#006847" }}>Baixar PDF</button>
          <button onClick={onClose} className="py-3 rounded-full font-bold" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}>Fechar</button>
        </div>
        <div className="text-[11px] mt-3" style={{ color: "#6E6350" }}>Selo oficial 28 pedras • espanhol.dotapps.com.br</div>
      </div>
    </div>
  );
}

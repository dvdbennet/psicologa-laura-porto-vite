import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const whatsapp = (
  message: string = "Olá!\nGostaria de saber mais sobre o processo terapêutico (atendimento presencial em Brasília-DF ou atendimento online disponível para todo o Brasil) e horários disponíveis.",
) => {
  const codPais = "55";
  const ddd = "61";
  const telefone = "999914224";
  const telefoneCompleto = codPais + ddd + telefone;
  return `https://wa.me/${telefoneCompleto}?text=${encodeURIComponent(
    message,
  )}`;
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

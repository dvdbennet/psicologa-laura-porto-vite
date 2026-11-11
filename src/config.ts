import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const whatsapp = (
  message: string = "Olá, Dra. Laura! Vim pelo site e gostaria de saber sobre horários para terapia.",
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

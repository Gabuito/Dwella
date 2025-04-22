import type { TAddress } from "../interfaces/user.type.ts";

//Formatar um telefone brasileiro (XX) XXXXX-XXXX em XXXXXXXXXXX; Isso melhora a performance e posso salvar como number no banco de dados
export const primtivePhone = (phone: string): number => {
  const cleanedPhone = phone.replace(/\D/g, "");
  if (cleanedPhone.length === 11) {
    return parseInt(cleanedPhone, 10);
  } else {
    throw new Error("Número de telefone inválido");
  }
}

// Formatar o telefone primitivo para o formato (XX) XXXXX-XXXX
export const formatPhone = (phone: number): string => {
  const phoneString = phone.toString();
  if (phoneString.length === 11) {
    return `(${phoneString.slice(0, 2)}) ${phoneString.slice(2, 7)}-${phoneString.slice(7)}`;
  } else {
    throw new Error("Número de telefone inválido");
  }
}

// Tipo telefone não formatado: number com 11 dígitos
export type TPhone = number & { __phone: true };


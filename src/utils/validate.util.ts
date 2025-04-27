import type { Address } from "../interfaces/user.type.ts";

//validar email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//validar password - 8 caracteres, 1 maiuscula, 1 numero e 1 especial
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}


export const formatedAddress = (address: Address): string => {
  const { street, number, complement, neighborhood, city, state, country, zip } = address;
  return `${street}, ${number}${complement ? `, ${complement}` : ""}, ${neighborhood}, ${city} - ${state}, ${country} - CEP: ${zip}`;
};

export const generateUUID = (): string => {
  return crypto.randomUUID();
}
import type { Role } from "./role.type.ts";
import type { Address } from "./address.type.ts";

export type { Address };

export type Identifier = {
  id: number;
  uuid: string;
};

export type Person = {
  name: string;
  surname: string;
  birthdate: Date;
  gender: 'Masculine' | 'Feminine' | 'Other';
};

export type Contact = {
  primaryphone: string;
  secundaryphone?: string;
};

export type Account = {
  email: string;
  password: string;
  verified: boolean;
  status: "active" | "inactive" | "suspended";
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  role: Role["id"][];
};

import type { TRole } from "../../roles/interfaces/role.type.ts";
import type { TAddress } from "../../../shared/interfaces/address.type.ts";

export type { TAddress };

export type TIdentifier = {
  id: number;
  uuid: string;
};

export type TPerson = {
  name: string;
  surname: string;
  birthdate: Date;
  gender?: 'Masculine' | 'Feminine' | 'Other';
  related: TIdentifier['uuid'][];
};

export type TContact = {
  primaryphone: string;
  secundaryphone?: string;
};

export type TAccount = {
  email: string;
  password: string;
  verified: boolean;
  status: "active" | "inactive" | "suspended";
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  type: TRole["id"][];
};

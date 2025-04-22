import type { TAddress, TAccount, TContact, TIdentifier, TPerson } from "./user.type.ts";

export interface IUser {
  id?: TIdentifier;
  address: TAddress;
  person: TPerson;
  contact: TContact;
  account: TAccount;
};

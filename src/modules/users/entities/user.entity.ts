type TIdentifier = {
  id: number;
  uuid: string;
};

type TAccountType = {
  id: number;
  name: string;
  description: string;
};

type TAddress = {
  street: string;
  number: number;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type TPersonal = {
  name: string;
  surname: string;
  birthdate: Date;
  related: string[];
};

type TContact = {
  phone: string;
  cellphone?: string;
};

type TAccount = {
  email: string;
  password: string;
  type: TAccountType["id"];
  status: "active" | "inactive" | "suspended";
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
} 

export default class UserEntity{

  public id: TIdentifier;
  private _address: TAddress;
  private _personal: TPersonal;
  private _contact: TContact;
  private _account: TAccount;

  constructor(id: TIdentifier, address: TAddress, personal: TPersonal, contact: TContact, account: TAccount) {
    this.id = id;
    this._address = address;
    this._personal = personal;
    this._contact = contact;
    this._account = account;
  }

  set address(address: TAddress) {
    this._address = address;
  }

  get address(): TAddress {
    return this._address;
  }






}
import type { TAddress, TAccount, TContact, TIdentifier, TPerson } from "../interfaces/user.type.ts";
import type { betterReadonly } from "../../../shared/interfaces/readonly.type.ts";
import * as tools from "../utils/validate.util.ts";

export default class User{

  private _id?: betterReadonly<TIdentifier>;
  private _address: TAddress;
  private _person: TPerson;
  private _contact: TContact;
  private _account: TAccount;

  constructor(address: TAddress, person: TPerson, contact: TContact, account: TAccount, id?: TIdentifier) {
    if (id){
      this._id = Object.freeze(id) as betterReadonly<TIdentifier>;
    }
    this._address = address;
    this._person = person;
    this._contact = contact;
    this._account = account;
  };

  set id(id: TIdentifier) {
    if (this._id) {
      throw new Error("ID already set. Cannot change ID.");
    }
    this._id = Object.freeze(id) as betterReadonly<TIdentifier>;
  };

  get id(): TIdentifier {
    if (!this._id) {
      throw new Error("ID not set. Cannot get ID.");
    }
    return this._id as TIdentifier;
  };

  public getUniqueId(): Readonly<string> {
    if (!this._id) {
      throw new Error("ID not set. Cannot get ID.");
    }
    return this._id.uuid as Readonly<string>;
  };

  public changePassword(password: string): void {
    if (tools.validatePassword(password)) {
      this._account.password = password;
    } else {
      throw new Error("Password invalid");
    }
  };

  public changeEmail(email: string): void {
    if (tools.validateEmail(email)) {
      this._account.email = email;
    } else {
      throw new Error("Email invalid");
    }
  };

  public changeStatus(status: TAccount["status"]): void {
    this._account.status = status;
  };

  public getAddress(): string {
    return tools.formatedAddress(this._address);
  };

  public updateAddress(address: Partial<TAddress>): void {
    this._address = { ...this._address, ...address } as TAddress;
  };

  public updateContact(contact: Partial<TContact>): void {
    this._contact = { ...this._contact, ...contact } as TContact;
  };

  public updatePerson(person: Partial<Omit<TPerson,'related'>>): void {
    this._person = { ...this._person, ...person } as TPerson;
  };

  public addRelatedPerson(related: TIdentifier['uuid']): void {
    if (!this._person.related) {
      this._person.related = [] as TIdentifier['uuid'][];
    }
    this._person.related.push(related);
  };
 
  public removeRelatedPerson(related: TIdentifier['uuid']): void {
    if (this._person.related) {
      this._person.related = this._person.related.filter((item) => item !== related);
    }
  }

};
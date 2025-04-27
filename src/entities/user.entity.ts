import type { Address, Account, Contact, Identifier, Person} from "../interfaces/user.type.ts";
import type { betterReadonly } from "../interfaces/readonly.type.ts";
import * as tools from "../utils/validate.util.ts";
import Exception from "../services/exception.service.ts";
import UserDTO from "../dto/user.dto.ts";

export default class User{

  private _id?: betterReadonly<Identifier>;
  private _address: Address;
  private _person: Person;
  private _contact: Contact;
  private _account: Account;

  constructor(address: Address, person: Person, contact: Contact, account: Account, id?: Identifier) {
    if (id){
      this._id = Object.freeze(id) as betterReadonly<Identifier>;
    }
    this._address = address;
    this._person = person;
    this._contact = contact;
    this._account = account;
  };

  set id(id: Identifier) {
    if (this._id) {
      throw new Error("ID already set. Cannot change ID.");
    }
    this._id = Object.freeze(id) as betterReadonly<Identifier>;
  };

  get id(): Identifier {
    if (!this._id) {
      throw new Error("ID not set. Cannot get ID.");
    }
    return this._id as Identifier;
  };

  public getUniqueId(): Readonly<string> {
    if (!this._id) {
      throw new Exception("ID not set", 400, new Error("User.getUniqueId"));
    }
    return this._id.uuid as Readonly<string>;
  };

  public changePassword(password: string): void {
    if (tools.validatePassword(password)) {
      this._account.password = password;
    } else {
      throw new Exception("Password invalid", 400, new Error("User.changePassword"));
    }
  };

  public changeEmail(email: string): void {
    if (tools.validateEmail(email)) {
      this._account.email = email;
    } else {
      throw new Exception("Email invalid", 400, new Error("User.changeEmail"));	
    }
  };

  public changeStatus(status: Account["status"]): void {
    this._account.status = status;
  };

  public getAddress(): string {
    return tools.formatedAddress(this._address);
  };

  public updateAddress(address: Partial<Address>): void {
    this._address = { ...this._address, ...address } as Address;
  };

  public updateContact(contact: Partial<Contact>): void {
    this._contact = { ...this._contact, ...contact } as Contact;
  };

  public updatePerson(person: Partial<Person>): void {
    this._person = { ...this._person, ...person } as Person;
  };

  public setDTO(userDTO : UserDTO): UserDTO{
    userDTO.id = this._id as Identifier;
    userDTO.address = this._address as Address;
    userDTO.person = this._person as Person;
    userDTO.contact = this._contact as Contact;
    userDTO.account = this._account as Account;
    return userDTO;
  }


};
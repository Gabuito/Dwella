import type { betterReadonly } from "../../../shared/interfaces/readonly.type.ts";
import type { Account, Address, Contact, Identifier, Person } from "../interfaces/user.type.ts";

export default class UserDTO {

    public id?: betterReadonly<Identifier>;
    public address?: betterReadonly<Address>;
    public person?: betterReadonly<Person>;
    public contact?: betterReadonly<Contact>;
    public account?: betterReadonly<Account>;

    public rawToObject(raw: any): [Address, Person, Contact, Account] {
        const { address, person, contact, account } = raw;
        return [address, person, contact, account];
    }

    public toPlaceholders(uuid: string): UserPlaceholders {
        return {
            uuid: uuid,
            name: this.person!.name,
            surname: this.person!.surname,
            birthdate: this.person!.birthdate,
            gender: this.person!.gender,
            primaryphone: this.contact!.primaryphone,
            secundaryphone: this.contact?.secundaryphone,
            street: this.address!.street,
            city: this.address!.city,
            state: this.address!.state,
            country: this.address!.country,
            zip: this.address!.zip,
            number: this.address!.number,
            complement: this.address?.complement,
            email: this.account!.email,
            password: this.account!.password,
            verified: this.account!.verified,
            status: this.account!.status,
            createdAt: this.account!.createdAt,
            updatedAt: this.account!.updatedAt,
            deletedAt: this.account?.deletedAt,
            role: this.account!.role,
        };
        };


    public userToJSON(user: any): any {
        return {
            id: user.id,
            address: user.address,
            person: user.person,
            contact: user.contact,
            account: user.account,
        };
    };

};

export interface UserPlaceholders{
  uuid: string;
  name: string;
  surname: string;
  birthdate: Date;
  gender: string;
  primaryphone: string;
  secundaryphone?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  number: string;
  complement?: string;
  email: string;
  password: string;
  verified: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  role: number[];
}
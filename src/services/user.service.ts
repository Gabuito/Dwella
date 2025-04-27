import Repository from "../repositories/user.database.ts";
import DTO, { type UserPlaceholders } from "../dto/user.dto.ts";
import User from "../entities/user.entity.ts";
import type { Identifier } from "../interfaces/user.type.ts";
import Exception from "./exception.service.ts";
import { generateUUID } from "../utils/tools.util.ts";

type UserRaw = {
  address: string;
  person: string;
  contact: string;
  account: string;
};


export default class UserService{

  private _repository: Repository;
  private _userDTO: DTO;

  constructor(repository?: Repository, userDTO?: DTO) {
    repository ? this._repository = repository : this._repository = new Repository();
    userDTO ? this._userDTO = userDTO : this._userDTO = new DTO();
  }

  public async createUser(raw: UserRaw): Promise<ReturnType<DTO['userToJSON']>> {
    const dto = this._userDTO;
    try {
      const user: User = new User(...dto.rawToObject(raw));
      const uuid: string = generateUUID();
      user.setDTO(dto);
      const serealizedUser: UserPlaceholders = dto.toPlaceholders(uuid);            
      const userId: number = await this._repository.insertUser(serealizedUser);
      const identifier: Identifier = {
        uuid,
        id: userId,
      };
      user.id = identifier;
      return this._userDTO.userToJSON(user);
    } catch (err) {
      throw new Exception(`Falling to create user`, 400 , err as Error);    
    }
  }



}
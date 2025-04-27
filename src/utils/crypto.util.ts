import {hash, verify, type Options} from '@node-rs/argon2';
import Exception from '../services/exception.service.ts';
import { createHmac } from 'crypto';


export class passwordTools {

  private _pepper?: string;
  private _options: Options;

  constructor(){
    this._options = {
      algorithm: 2,
      memoryCost: 2**16,
      timeCost: 3,
      parallelism: 1,
    };
    this._pepper = process.env.PASSWORD_PEPPER;
    if(!this._pepper) {
      throw new Exception("Pepper not defined", 500, new Error("Pepper not defined"));
    };
  };

  public async hash(password: string, options?: Options): Promise<string> {
    password = this.pepperedPassword(password);
    return await hash(password, options);
  };

  public async verify(hash: string, password: string): Promise<boolean>{
    password = this.pepperedPassword(password);
    return await verify(hash, password, this._options);
  };

  public pepperedPassword(password: string): string{
    return createHmac('sha256', this._pepper!).update(password).digest('hex');
  };
  
};
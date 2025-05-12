import { IUserAddress } from "./users-response-interface/user-address";

export interface IAddressToDisplayInterface extends IUserAddress {
  type: number;
  street: string;
  complement: string;
  country: string;
  state: string;
  city: string;
  typedescription: string;
}

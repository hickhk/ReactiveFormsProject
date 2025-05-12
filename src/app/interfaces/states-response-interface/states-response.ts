import { StatesList } from "../../types/states-list";
import { IBaseCountriesResponse } from "../base-countries-response";

export interface IStatesResponse extends IBaseCountriesResponse {
  data: IData;
}

export interface IData {
  name: string;
  iso3: string;
  iso2: string;
  states: StatesList;
}

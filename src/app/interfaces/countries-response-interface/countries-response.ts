import { CoutriesList } from "../../types/countries-list";
import { IBaseCountriesResponse } from "../base-countries-response";


export interface ICountriesResponse extends IBaseCountriesResponse {
  data: CoutriesList;
}

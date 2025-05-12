import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICountriesResponse } from '../interfaces/countries-response-interface/countries-response';
import { CoutriesList } from '../types/countries-list';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private readonly _httpClient: HttpClient,
  ) { }

  getCountries(): Observable<CoutriesList>{
    return this._httpClient.get<ICountriesResponse>('https://countriesnow.space/api/v0.1/countries/positions').pipe(
      map((response) => {
        return response.data;
      })
    )
  }

}

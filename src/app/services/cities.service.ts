import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CitiesList } from '../types/cities-list';
import { ICitiesResponse } from '../interfaces/cities-response-interface/cities-response';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(
    private readonly _httpClient: HttpClient,
  ) { }

  getCities(coutryName: string, stateName: string): Observable<CitiesList>{
    const body = {country: coutryName, state: stateName};
    return this._httpClient.post<ICitiesResponse>('https://countriesnow.space/api/v0.1/countries/state/cities',body).pipe(
      map((response) => {
       return response.data;
      })
    )
  }
}

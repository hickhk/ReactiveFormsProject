import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { IStatesResponse } from '../interfaces/states-response-interface/states-response';
import { StatesList } from '../types/states-list';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

constructor(
  private readonly _httpClient: HttpClient,
) { }

getStateBycoutry(coutryName: string): Observable<StatesList> {
    const body = {country: coutryName};
    return this._httpClient.post<IStatesResponse>('https://countriesnow.space/api/v0.1/countries/states',body).pipe(
      map((response) => {
        return response.data.states;
      })
    );
  }
}

import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IUsersResponse } from '../../interfaces/users-response-interface/users-response';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { CoutriesList } from '../../types/countries-list';
import { distinctUntilChanged, Observable, take } from 'rxjs';
import { StatesService } from '../../services/states-service';
import { StatesList } from '../../types/states-list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-user-informations-container',
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss',
})
export class UserInformationsContainerComponent
  extends UserFormController
  implements OnInit, OnChanges
{
[x: string]: any;
  @Input({ required: true }) userSelected: IUsersResponse = {} as IUsersResponse;
  @Input({ required: true }) isInEditMode: boolean = false;
  @Output('isValidForm') isValidFormEmitt = new EventEmitter<boolean>();
 
  currentTabIndex: number = 0;
  currentUser: IUsersResponse | undefined;
  countries: CoutriesList = [] as CoutriesList;
  statesList: StatesList = [] as StatesList;

  private _countriesService = inject(CountriesService);
  private _statesService = inject(StatesService);

  ngOnInit(): void {
    this.onUserFormStatusChange();
    this.getCountriesList();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentTabIndex = 0;
    const HAS_USER_SELECTED =
      changes['userSelected'] &&
      Object.keys(changes['userSelected'].currentValue).length > 0;

    if (HAS_USER_SELECTED) {
      this.fulfillUserForm(this.userSelected);
    }
    this.getStatesByCountry(this.userSelected.country);
  }

  onCountrySelected(countryName: any) {
    this.getStatesByCountry(countryName);
  }

  private getCountriesList() {
    this._countriesService.getCountries().pipe(take(1)).subscribe((contriesList)=>{
      this.countries = contriesList;
    })
  }
  

  private getStatesByCountry(coutryName: string) {
    this._statesService.getStateBycoutry(coutryName).pipe(take(1)).subscribe((statesList)=>{
      this.statesList = statesList;
    })
  }

  onUserFormStatusChange() {
    this.userForm.statusChanges.pipe(distinctUntilChanged()).subscribe(() => this.isValidFormEmitt.emit(this.userForm.valid));
  }
}

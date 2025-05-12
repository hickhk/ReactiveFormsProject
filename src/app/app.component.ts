import { Component, Input, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states-service';


import { CitiesService } from './services/cities.service';
import { UsersService } from './services/users.service';
import { UsersList } from './types/users-list';
import { take } from 'rxjs';
import { IUsersResponse } from './interfaces/users-response-interface/users-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent implements OnInit {
  country = '';
  state = '';
  isInEditMode: boolean = false;
  isValidForm: boolean = false;

  usersList = [] as UsersList;
  currentUser: IUsersResponse | undefined;;

  currentUserIndex: number | undefined;


  constructor(
    private readonly _coutrieServices: CountriesService,
    private readonly _statesService: StatesService,
    private readonly _citiesService: CitiesService,
    private readonly _usersService: UsersService
  ){}

   ngOnInit(): void {
    this._coutrieServices.getCountries().subscribe((response) => {
      const resp = response
      const coutryAtual = resp.find((country) => country.name.toLowerCase() === 'brazil');
      this.country = coutryAtual ? coutryAtual.name : '';
    })

    setTimeout(()=>{
      this._statesService.getStateBycoutry(this.country).subscribe((response) => {
        const resp = response
        const stateAtual = resp.find((state: { name: string; }) => state?.name.toLowerCase() === 'são paulo');
        this.state = stateAtual ? stateAtual.name : '';
      })
    }, 2000)

    setTimeout(() => {
    this._citiesService.getCities(this.country, this.state).subscribe((response) => {
      const resp = response
    })
   }, 4000);

   this._usersService.getUsers().pipe(take(1)).subscribe((response) =>this.usersList = response);
  }

  onUserSelected(index: number) {
    const userFund = this.usersList[index];
      if(userFund) {
        this.currentUserIndex = index;
        this.currentUser = structuredClone(userFund);
      }
    }

    onEnableSaveButton(isValidForm: boolean) {
      setTimeout(() => this.isValidForm = isValidForm, 1);
    }

    onSaveButton() {
      console.log('save button clicked!');
      }
      onEditButton() {
      this.isInEditMode = true;
      }
      onCandelButton() {
        this.isInEditMode = false;
      }
}

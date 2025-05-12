import { maritalStatusArray } from './../../utils/marital-status-description-map';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { CoutriesList } from '../../types/countries-list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { StatesList } from '../../types/states-list';

@Component({
  selector: 'app-general-informations-edit',
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralInformationsEditComponent implements OnInit, OnChanges {

  @Input({ required: true }) userForm!: FormGroup
  @Input({required: true}) countriesList:  CoutriesList = [];
  @Input({required: true}) statesList: StatesList = [];

  @Output() countrySelectedEmit = new EventEmitter<string>();

  countriesListFilter:  CoutriesList = [];

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  statesListFilter: StatesList = [];

    ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.watchCoutryChanges();
    this.watchStatesChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.countriesListFilter = this.countriesList;
    this.statesListFilter = this.statesList;
  }

  get maritalStatusArray(){
    return maritalStatusArray;
    }

  get emailControl(): FormControl {
    return this.userForm.get('generalInformations.email') as FormControl;
  }

  get countryControl(): FormControl {
    return this.userForm.get('generalInformations.country') as FormControl;
  }

  get stateControl(): FormControl {
    return this.userForm.get('generalInformations.state') as FormControl;
  }

  onCountrySelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value)
    this.countrySelectedEmit.emit(event.option.value)
    }

  onStateSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private watchCoutryChanges() {
    this.countryControl.valueChanges.subscribe(this.filterCountriesList.bind(this))
  }

  private filterCountriesList(searchTerm: string){
    this.countriesListFilter = this.countriesList.filter((country)=> country?.name.toLowerCase().includes(searchTerm?.toLowerCase().trim()))
  }

  private watchStatesChanges() {
    this.stateControl.valueChanges.subscribe(this.filterStatesList.bind(this))
  }

  private filterStatesList(searchTerm: string){
    this.statesListFilter = this.statesList.filter((state)=> state?.name.toLowerCase().includes(searchTerm?.toLowerCase().trim()))
  }
}

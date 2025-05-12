import { Component, Input, OnInit } from '@angular/core';
import { AddressList } from '../../../../types/address-list';
import { Form, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-list-edit',
  templateUrl: './address-list-edit.component.html',
  styleUrl: './address-list-edit.component.scss'
})
export class AddressListEditComponent implements OnInit {

  @Input({required: true}) userForm!: FormGroup;

  get addressList(): FormArray {
    return this.userForm.get('contactInformations.addressList') as FormArray;
  }

  ngOnInit(): void {
    const address = this.addressList?.controls[0]?.value.typedescription?.value;
    console.log(address);
  }
}

import { inject } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { IUsersResponse } from "../../interfaces/users-response-interface/users-response";
import { PhoneList } from "../../types/phone-list";
import { AddressList } from "../../types/address-list";
import { DependentsList } from "../../types/dependents-list";
import { convertPtBrDateToDateObj } from "../../utils/convert-pt-br-date-to-date-obj";
import { PreparePhoneList } from "../../utils/prepare-phone-list";
import { PhoneTypeEnum } from "../../enuns/phone-type.enum";
import { prepareAddressList } from "../../utils/prepare-address-list";
import { requiredAddressValidator } from "../../utils/user-form-validators/required-address-validator";
import { IUserDependent } from "../../interfaces/users-response-interface/user-dependent";

export class UserFormController {
  userForm!: FormGroup;
  private _fb = inject(FormBuilder);

  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor() {
    this.createUserForm();
  }

  get generalInformations(): FormGroup {
    return this.userForm.get('generalInformations') as FormGroup;
  }

  get phoneList(): FormArray {
    return this.userForm.get('contactInformations.phoneList') as FormArray;[];
  }

  get addressList(): FormArray {
    return this.userForm.get('contactInformations.addressList') as FormArray;[];
  }

  get dependentsList(): FormArray {
    return this.userForm.get('dependentesList') as FormArray;[];
  }


  fulfillUserForm(user: IUsersResponse){
      this.resetForm();
      this.fulFillGeneralInformations(user);
      this.fullFillPhoneList(user.phoneList);
      this.fullFillAddressList(user.addressList);
      this.fullFillDependentsList(user.dependentsList);
      this.userForm.markAllAsTouched();
      this.userForm.updateValueAndValidity();
  }

  addDependent() {
    this.dependentsList.push(
      this._fb.group({
        name: ['', Validators.required],
        age: ['', Validators.required],
        document: ['', Validators.required],
      })
    );
  }

  removeDependent(dependentIndex: number) {
    this.dependentsList.removeAt(dependentIndex);
  }

  private resetForm() {
    this.userForm.reset();
    this.generalInformations.reset();

    this.phoneList.reset();
    this.phoneList.clear();

    this.addressList.reset;
    this.addressList.clear();

    this.dependentsList.reset;
    this.dependentsList.clear();
  }


  private fulFillGeneralInformations(user: IUsersResponse) {
    const newUser = {
      ...user,
      birthDate: convertPtBrDateToDateObj(user.birthDate),
    };
    this.generalInformations.patchValue(newUser);
  }

  private createUserForm() {
      this.userForm = this._fb.group({
        generalInformations: this._fb.group({
          name: ['', Validators.required],
          email: [
            '',
            [Validators.required, Validators.pattern(this.emailPattern)],
          ],
          country: ['', Validators.required],
          state: ['', Validators.required],
          maritalStatus: [null, Validators.required],
          monthlyIncome: [null, Validators.required],
          birthDate: [null, Validators.required],
        }),
        contactInformations: this._fb.group({
          phoneList: this._fb.array([]),
          addressList: this._fb.array([]),
        }),
        dependentesList: this._fb.array([]),
      });
  }

    private fullFillPhoneList(UserPhoneList: PhoneList) {
      PreparePhoneList(UserPhoneList, false, (phone) => {
        const phoneValidators = phone.type  === PhoneTypeEnum.EMERGENCY ? [] : [Validators.required];
        this.phoneList.push(
          this._fb.group({
            type: [phone.type],
            typeDescription: [phone.typeDescription],
            number: [phone.phoneNumber, phoneValidators],
        }))
      })
  }

  private fullFillAddressList(userAddressList: AddressList) {
    prepareAddressList(userAddressList, false, (address) => {
      this.addressList.push(
        this._fb.group({
          type: [address.type],
          street: [address.street],
          complement: [address.complement],
          country: [address.country],
          state: [address.state],
          city: [address.city],
          typedescription: [{ value: address.typedescription, disabled: true}],
        }, { validators: requiredAddressValidator}
      ));
    })
  }

  private fullFillDependentsList(userDependentsList: DependentsList) {
    userDependentsList.forEach((dependent) => { this.createDependent(dependent) });
  }

  private createDependent(dependent: IUserDependent) {
    if(!dependent){
      this.dependentsList.push(
        this._fb.group({
          name: ['', Validators.required],
          age: ['', Validators.required],
          document: ['', Validators.required],
        })
      );
    }
    else{
      this.dependentsList.push(
        this._fb.group({
          name: [dependent.name, Validators.required],
          age: [dependent.age, Validators.required],
          document: [dependent.document, Validators.required],
        })
      );
    }
  }
}

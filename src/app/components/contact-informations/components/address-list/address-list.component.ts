import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddressList } from '../../../../types/address-list';
import { AddressTypeDescritonMap } from '../../../../utils/address-type-description-map';
import { IUserAddress } from '../../../../interfaces/users-response-interface/user-address';
import { AddressTypeEnum } from '../../../../enuns/address-type.enum';
import { IAddressToDisplayInterface } from '../../../../interfaces/address-to-display.-interface';
import { prepareAddressList } from '../../../../utils/prepare-address-list';



@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss',
})
export class AddressListComponent implements OnChanges {
  @Input({required: true}) addressList: AddressList | undefined;
  addressListToDisplay: IAddressToDisplayInterface[] =[];

  ngOnChanges(changes: SimpleChanges): void {
    const addressListLoaded = Array.isArray(changes['addressList'].currentValue)
    if (addressListLoaded) {
      this.prepareAddressListDisplay();
    }
  }
  prepareAddressListDisplay() {
    this.addressListToDisplay = [];

    prepareAddressList(this.addressList || [], true, (address) => 
      {
        this.addressListToDisplay.push(address)
      });
  }
}

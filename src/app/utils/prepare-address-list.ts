import { AddressTypeEnum } from "../enuns/address-type.enum";
import { IAddressToDisplayInterface } from "../interfaces/address-to-display.-interface";
import { IUserAddress } from "../interfaces/users-response-interface/user-address"
import { AddressList } from "../types/address-list"
import { AddressTypeDescritonMap } from "./address-type-description-map";


export const prepareAddressList = (addressList: AddressList, isEditAddress: boolean = false, callback: (address: IAddressToDisplayInterface) => void) => {
   Object.keys(AddressTypeDescritonMap).map(Number).forEach((addresstype: number) => {
        const addressFound = addressList?.find((userAddress) => userAddress.type === addresstype)

        let address = {} as IAddressToDisplayInterface;

        if(isEditAddress) {
            address = returnAddressToDisplay(addressFound, addresstype);
        }else{
           address = returnAddressToEdit(addressFound, addresstype);
        }
          callback(address);
        });
}

const returnAddressToDisplay = (addressFound: IUserAddress | undefined, addresstype: number): IAddressToDisplayInterface => {
    if (!addressFound) {
      return {
        typedescription: AddressTypeDescritonMap[addresstype as AddressTypeEnum],
        type: addresstype,
        street: '-',
        complement: '-',
        city: '-',
        state: '-',
        country: '-',
      };
    }

    return {
      typedescription: AddressTypeDescritonMap[addresstype as AddressTypeEnum],
     ...addressFound,
    };
  }


  const returnAddressToEdit = (addressFound: IUserAddress | undefined, addresstype: number): IAddressToDisplayInterface => {
    if (!addressFound) {
      return {
        typedescription: AddressTypeDescritonMap[addresstype as AddressTypeEnum],
        type: addresstype,
        street: '',
        complement: '',
        city: '',
        state: '',
        country: '',
      };
    }

    return {
      typedescription: AddressTypeDescritonMap[addresstype as AddressTypeEnum],
     ...addressFound,
    };
  }

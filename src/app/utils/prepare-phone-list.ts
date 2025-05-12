import { PhoneTypeEnum } from "../enuns/phone-type.enum";
import { IPhoneToDisplay } from "../interfaces/phone-to-display.interface";
import { IUserPhone } from "../interfaces/users-response-interface/user-phone";
import { PhoneList } from "../types/phone-list";
import { phoneTypeDescritonMap } from "./phone-type-descriton-map";

export const PreparePhoneList = (phoneList: PhoneList, isFormatPhone: boolean = false, callback: (phone: IPhoneToDisplay) => void) => {
  Object.keys(phoneTypeDescritonMap)
      .map(Number).forEach((phoneType: number) => {
        const phoneFound = phoneList?.find((phone: IUserPhone) => phone.type === phoneType);
        
        let phoneNumber = '';

        if(isFormatPhone) {
          phoneNumber = phoneFound ? formatPhoneNumberDisplay(phoneFound) : '-';
        }else{
          phoneNumber = phoneFound ? formatPhoneNumberEdit(phoneFound) : '';
        }
        
        callback({
          type: phoneType,
          typeDescription: phoneTypeDescritonMap[phoneType as PhoneTypeEnum],
          phoneNumber,
        });
    });
 }

const formatPhoneNumberDisplay = (phone: IUserPhone) => {
    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
}

const formatPhoneNumberEdit = (phone: IUserPhone) => {
  return `${phone.internationalCode}${phone.areaCode}${phone.number}`.replace(/[+\-]/g, '');
}

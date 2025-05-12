import { PhoneTypeEnum } from "../enuns/phone-type.enum";


export const phoneTypeDescritonMap: { [key in PhoneTypeEnum]: string } = {
    [PhoneTypeEnum.RESIDENTIAL]: 'Residencial',
    [PhoneTypeEnum.MOBILE]: 'Celular',
    [PhoneTypeEnum.EMERGENCY]: 'Emergêncial',
};

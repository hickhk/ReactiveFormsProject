import { AddressTypeEnum } from "../enuns/address-type.enum";

export const AddressTypeDescritonMap: { [key in AddressTypeEnum]: string } = {
  [AddressTypeEnum.RESIDENTIAL]: 'Residencial',
  [AddressTypeEnum.WORK]: 'Trabalho',
  [AddressTypeEnum.ALTERNATIVE]: 'Alternativo',
};

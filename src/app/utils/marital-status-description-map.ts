import { MaritalStatusEnum } from "../enuns/marital-status.enum";

export const MaritalStatusDescriptionMap: { [key in MaritalStatusEnum]: string}  = {
          [MaritalStatusEnum.SINGLE]: 'Solteiro',
          [MaritalStatusEnum.MARRIED]: 'Casado',
          [MaritalStatusEnum.DIVERCED]: 'Divorciado'
        };

export const maritalStatusArray = Object.keys(MaritalStatusDescriptionMap).map(Number).map((key) => {
    return { value: key, description: MaritalStatusDescriptionMap[key as MaritalStatusEnum] };
});


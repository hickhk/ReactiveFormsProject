import { Pipe, PipeTransform } from '@angular/core';
import { MaritalStatusEnum } from '../enuns/marital-status.enum';
import { MaritalStatusDescriptionMap } from '../utils/marital-status-description-map';

@Pipe({
  name: 'maritalStatus'
})
export class MaritalStatusPipe implements PipeTransform {
  transform(maritalStatus: number | undefined): string {
    return maritalStatus ? MaritalStatusDescriptionMap[maritalStatus as MaritalStatusEnum] : '';
  }
}

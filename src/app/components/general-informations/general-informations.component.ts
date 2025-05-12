import { Component, Input } from '@angular/core';
import { IUsersResponse } from '../../interfaces/users-response-interface/users-response';

@Component({
  selector: 'app-general-informations',
  templateUrl: './general-informations.component.html',
  styleUrl: './general-informations.component.scss'
})
export class GeneralInformationsComponent {

  @Input({required: true}) user = {}  as IUsersResponse | undefined;

}

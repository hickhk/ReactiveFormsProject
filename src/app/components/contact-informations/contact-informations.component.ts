import { Component, Input } from '@angular/core';
import { IUsersResponse } from '../../interfaces/users-response-interface/users-response';
import { PhoneList } from '../../types/phone-list';

@Component({
  selector: 'app-contact-informations',
  templateUrl: './contact-informations.component.html',
  styleUrl: './contact-informations.component.scss',
})
export class ContactInformationsComponent {
  @Input({ required: true }) user: IUsersResponse | undefined =
    {} as IUsersResponse;
}



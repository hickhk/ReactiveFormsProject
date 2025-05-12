import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PhoneList } from '../../../../types/phone-list';
import { IUserPhone } from '../../../../interfaces/users-response-interface/user-phone';
import { IPhoneToDisplay } from '../../../../interfaces/phone-to-display.interface';
import { phoneTypeDescritonMap } from '../../../../utils/phone-type-descriton-map';
import { PreparePhoneList } from '../../../../utils/prepare-phone-list';
@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrl: './phone-list.component.scss',
})
export class PhoneListComponent implements OnChanges {
  @Input({ required: true }) phoneList: PhoneList | undefined = [];
  phoneListToDisplay: IPhoneToDisplay[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const phoneListLoaded = Array.isArray(changes['phoneList'].currentValue);
    if (phoneListLoaded) {
      this.preparePhoneListtoDisplay();
    }
  }

  preparePhoneListtoDisplay() {
    this.phoneListToDisplay = [];

    PreparePhoneList(this.phoneList || [], true, (phone) => {
      this.phoneListToDisplay.push(phone);
    })
  }

  formatPhoneNumber(phone: IUserPhone): string {
    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
  }
}

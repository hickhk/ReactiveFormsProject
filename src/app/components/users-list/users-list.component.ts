import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UsersList } from '../../types/users-list';
import { IUsersResponse } from '../../interfaces/users-response-interface/users-response';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent  {
  @Input({ required: true }) usersList: UsersList = [];
  @Input({ required: true }) isInEditMode: boolean = false;
  @Output() userSelectedEmiter: EventEmitter<number> = new EventEmitter<number>();

  userSelectedIndex: number | undefined;

  onUserSelected(index: number) {
    if(this.isInEditMode) return;

    this.userSelectedIndex = index;
    this.userSelectedEmiter.emit(index);
  }
}

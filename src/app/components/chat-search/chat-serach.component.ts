import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { IUser } from 'src/app/models/IUser';
import { IChat } from 'src/app/models/IChat';


@Component({
  selector: 'app-chat-search',
  templateUrl: './chat-search.component.html',
  styleUrls: ['./chat-search.component.css']
})
export class ChatSearchComponent implements OnInit {

  @Output() onChatCreate: EventEmitter<IChat> = new EventEmitter<IChat>();

  constructor(private readonly chatService: ChatService) {
  }

  user: IUser;
  searchControl = new FormControl();
  options: IUser[] = [];
  filteredOptions: Observable<IUser[]>;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.chatService.searchPeople().then((data: Array<IUser>) => {
      this.options = data.filter(u => u.id != this.user.id);
      this.filteredOptions = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  private _filter(value: string): IUser[] {
    const filterValue = String(value).toLowerCase();
    return this.options.filter(option => `${option.firstName} ${option.lastName}`.toLowerCase().indexOf(filterValue) === 0);
  }

  public createChat(event): void {
    const userId = Number(event.option.value);
    var user = this.options.find(option => option.id == userId);
    this.searchControl.setValue('');
    console.log('kslakslk >', user);
    const chatTitle = `${user.firstName} ${user.lastName}`;
    this.chatService.createChat(chatTitle, [this.user.id, user.id]).then((data: IChat) => {
      data.title = chatTitle;
      this.onChatCreate.emit(data);
    });
  }

}

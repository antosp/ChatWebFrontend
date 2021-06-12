import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IChat } from 'src/app/models/IChat';
import { IUser } from 'src/app/models/IUser';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.css']
})
export class ChatsListComponent implements OnInit {

  @Output() onSelect = new EventEmitter<number>();

  constructor(private readonly chatService: ChatService) {
  }

  public chatsList: Array<IChat> = [];
  public user: IUser;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.chatService.getChats().then(data => this.chatsList = data);
  }

  public getChatTitle(chat: IChat): string {
    if (chat.title) return chat.title;
    const u = chat?.users?.find(u => u.id != this.user?.id);
    return `${u?.firstName} ${u?.lastName}`;
  }

  public handleSelect(chat: IChat): void {
    this.chatsList.forEach(c => c.active = false);
    this.onSelect.emit(chat?.id);
    chat.active = true;
  }

  public handleOnChatCreate(chat: IChat): void {
    this.chatsList = [chat, ...this.chatsList];
    this.handleSelect(chat);
  }

}

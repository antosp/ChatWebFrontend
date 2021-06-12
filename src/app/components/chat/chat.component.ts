import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IChat } from 'src/app/models/IChat';
import { IUser } from 'src/app/models/IUser';
import * as moment from 'moment';
import { IMessage } from 'src/app/models/IMessage';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('chatScroll') private chatScroll: ElementRef;
  @Input() chat: IChat;
  @Output() onSend: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  public user: IUser;
  public message: string;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  }

  getTime(str: string): string {
    return moment(str).format('HH:mm');
  }

  public send(): void {
    this.onSend.emit(this.message);
  }

  public getUserName(message: IMessage): string {
    return this.chat?.users?.find(u => u.id == message.userId)?.firstName;
  }

  scrollToBottom(): void {
    try {
        this.chatScroll.nativeElement.scrollTop = this.chatScroll.nativeElement.scrollHeight;
    } catch(err) { }
  }
}

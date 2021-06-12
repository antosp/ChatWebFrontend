import { Component, OnInit } from '@angular/core';
import { IChat } from 'src/app/models/IChat';
import { ChatService } from 'src/app/services/chat.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { IMessage } from 'src/app/models/IMessage';
import {environment as ENV} from '../../../environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private readonly chatService: ChatService) { }

  chat: IChat;
  connection: HubConnection;

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    this.connection = new HubConnectionBuilder()
      .withUrl(`${ENV.apiUrl}/hubs/chat`, {
          accessTokenFactory: () => user.token,
      })
      .build();
    this.connection.serverTimeoutInMilliseconds = 1000000;

    this.connection.start().then(function () {
      console.log("Connected to hub.");
    });

    this.connection.on("OnMessage", (message: IMessage) => {
      this.chat.messages.push(message);
    });
  }

  public select(id): void {
    if (this.chat?.id) {
      this.connection.invoke("Leave", this.chat.id);
    }
    this.chatService.getChat(id).then(data => {
      this.chat = data;
      this.connection.invoke("Join", this.chat.id);
    });
  }

  public send(messageText): void {
    this.connection.invoke("SendMessage", this.chat.id, messageText);
  }

}

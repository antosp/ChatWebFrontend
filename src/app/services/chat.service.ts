import { Injectable } from '@angular/core';
import { environment as ENV } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IChat } from '../models/IChat';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private readonly http: HttpClient) {}

  public async getChats(): Promise<Array<IChat>> {
    const url = `${ENV.apiUrl}/api/chat`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('user'))?.token}`
    });
    return this.http.get<Array<IChat>>(url, {headers}).toPromise();
  }

  public async getChat(id: number): Promise<IChat> {
    const url = `${ENV.apiUrl}/api/chat/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('user'))?.token}`
    });
    return this.http.get<IChat>(url, {headers}).toPromise();
  }

  public async searchPeople(): Promise<Array<IUser>> {
    const url = `${ENV.apiUrl}/api/chat/search-people`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('user'))?.token}`
    });
    return this.http.get<Array<IUser>>(url, {headers}).toPromise();
  }

  public async createChat(title: string, userIds: Array<number>, type: string = 'private'): Promise<IChat> {
    const url = `${ENV.apiUrl}/api/chat`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('user'))?.token}`
    });
    return this.http.post<IChat>(url, {title, type, userIds}, {headers}).toPromise();
  }

}

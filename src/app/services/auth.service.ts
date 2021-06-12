import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import {environment as ENV} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  public async login(username: string, password: string): Promise<IUser> {
    const url = `${ENV.apiUrl}/api/auth/login`;
    return await this.http.post<IUser>(url, {username, password}).toPromise();
  }

  public async register(username: string, firstName: string, lastName: string, password: string): Promise<IUser> {
    const url = `${ENV.apiUrl}/api/auth/register`;
    return await this.http.post<IUser>(url, {username, password, firstName, lastName}).toPromise();
  }
}

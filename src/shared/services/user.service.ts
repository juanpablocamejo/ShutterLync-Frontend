import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  find(value: string): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl, { params: { find: value } });
  }


  createUser(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrl, user);
  }
}

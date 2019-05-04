import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private usersUrl = `${environment.apiUrl}/users`;

  createUser(user: User): Observable<string> {
    return this.http.post<string>(this.usersUrl, user);
  }
}

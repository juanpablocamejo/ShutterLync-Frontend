import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/User';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private currentTokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth`, { email, password })
      .pipe(map(({ status, user, token }) => {
        // login successful if there's a jwt token in the response
        if (status === 'ok') {
          localStorage.setItem('token', token);
          this.currentTokenSubject.next(token);
          this.currentUserSubject.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

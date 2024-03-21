import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { sercretService } from '../shared/sercrets.service';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private SS: sercretService,
    private router: Router
  ) {}

  API_KEY = this.SS.API_KEY;
  Auth_URL = `https://identitytoolkit.googleapis.com/v1/accounts`;
  user = new BehaviorSubject<User>(null);

  signup(email: string, password: string) {
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http
      .post<AuthResponseData>(
        `${this.Auth_URL}:signUp?key=${this.API_KEY}`,
        body
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http
      .post<AuthResponseData>(
        `${this.Auth_URL}:signInWithPassword?key=${this.API_KEY}`,
        body
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _toneExpidationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._toneExpidationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.error(`🔎 | AuthService | handleError > errorRes:`, errorRes);
    let errorMsg = 'An unknown error occurred!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'The email already exists.';
        break;
      case 'EMAIL_NOT_FOUND': // Deprecated?
        errorMsg = 'The email does not exist.';
        break;
      case 'INVALID_PASSWORD': // Deprecated?
        errorMsg = 'The password is not correct.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMsg = 'The login credentials are invalid.';
        break;

      default:
        break;
    }

    return throwError(errorMsg);
  }
}

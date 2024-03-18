import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { sercretService } from '../shared/sercrets.service';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private SS: sercretService) {}

  API_KEY = this.SS.API_KEY;
  Auth_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;

  signup(email: string, password: string) {
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http.post<AuthResponseData>(this.Auth_URL, body).pipe(
      catchError((errorRes) => {
        let errorMsg = 'An unknown error occurred!';

        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMsg);
        }

        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMsg = 'The email already exists!';
            break;

          default:
            break;
        }

        return throwError(errorMsg);
      })
    );
  }
}

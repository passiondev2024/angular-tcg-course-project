import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    return this.http.post<AuthResponseData>(this.Auth_URL, body);
  }
}

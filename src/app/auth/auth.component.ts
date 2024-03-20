import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(`🔎 | AuthComponent | onSubmit > form:`, form.value);
    if (!form.valid) return;
    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(`🔎 | AuthComponent | onSubmit > resData:`, resData);
        this.error = null;
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMsg) => {
        console.log(`🔎 | AuthComponent | onSubmit > error:`, errorMsg);
        this.error = errorMsg;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}

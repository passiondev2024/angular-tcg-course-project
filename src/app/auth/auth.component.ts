import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(`🔎 | AuthComponent | onSubmit > form:`, form.value);
    if (!form.valid) return;
    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      //
    } else {
      this.authService.signup(email, password).subscribe(
        (resData) => {
          console.log(`🔎 | AuthComponent | onSubmit > resData:`, resData);
          this.isLoading = false;
        },
        (errorMsg) => {
          console.log(`🔎 | AuthComponent | onSubmit > error:`, errorMsg);
          this.error = errorMsg;
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }
}

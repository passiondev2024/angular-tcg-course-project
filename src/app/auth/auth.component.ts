import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { AuthResponseData, AuthService } from './auth.service';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  // error: string = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolve: ComponentFactoryResolver
  ) {}

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
        // this.error = null;
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMsg) => {
        console.log(`🔎 | AuthComponent | onSubmit > error:`, errorMsg);
        // this.error = errorMsg;
        this.showErrorAlert(errorMsg);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  // onHandleClose() {
  //   this.error = null;
  // }

  private showErrorAlert(message: string) {
    const alertCmpFactory =
      this.componentFactoryResolve.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    hostViewContainerRef.createComponent(alertCmpFactory);
  }
}

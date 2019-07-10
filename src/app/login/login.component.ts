import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { getErrorMessage } from 'src/shared/validations/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(builder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {
    this.loginForm = builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.get('email').markAsTouched();
      this.loginForm.get('password').markAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).pipe(
    ).subscribe(() => {
      if (this.authService.confirmedUser) {
        const returnUrl = this.route.snapshot.queryParams.returnUrl;
        this.router.navigateByUrl(returnUrl || 'projects');
      } else {
        this.navigatePassingData('confirmUser', { email, oldPassword: password });
      }
    });
  }

  navigatePassingData(path: string, data: any) {
    const route = this.router.config.find(r => r.path === path);
    route.data = data;
    this.router.navigateByUrl(path, { queryParamsHandling: 'preserve' });
  }
  ngOnInit() {
    if (this.authService.confirmedUser) {
      const returnUrl = this.route.snapshot.queryParams.returnUrl;
      this.router.navigateByUrl(returnUrl || 'projects');
    }

  }

  getErrorMessage(form: FormGroup, controlName: string) {
    return getErrorMessage(form, controlName);
  }
  handleEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

}

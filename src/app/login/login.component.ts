import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';

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
      email: [''],
      password: ['']
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(() => {
      const returnUrl = this.route.snapshot.queryParams.returnUrl;
      this.router.navigateByUrl(returnUrl || 'projects');
    });
  }
  ngOnInit() {
    if (this.authService.currentUserValue) {
      const returnUrl = this.route.snapshot.queryParams.returnUrl;
      this.router.navigateByUrl(returnUrl || 'projects');
    }

  }

  handleEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

}

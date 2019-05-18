import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(builder: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.loginForm = builder.group({
      email: [''],
      password: ['']
    });
  }

  onClick() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(() => {
      this.router.navigateByUrl('projects');
    });
  }
  ngOnInit() {
  }

}

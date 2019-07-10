import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.scss']
})
export class ConfirmUserComponent implements OnInit {
  confirmForm: FormGroup;
  constructor(builder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
    this.confirmForm = builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.compose([
        Validators.required, this.validatePasswordConfirm.bind(this)])]]
    });
  }

  private validatePasswordConfirm(fieldControl: FormControl) {
    return !this.confirmForm || fieldControl.value === this.confirmForm.get('password').value ? null : {
      NotEqual: true
    };
  }
  successDialog = () => {
    const dialogRef = this.dialog.open(SuccessDialogComponent);
    return dialogRef.beforeClose();
  }
  login() {
    const { oldPassword } = this.route.snapshot.data;
    const { email, password } = this.confirmForm.value;
    this.authService.confirmUser(email, oldPassword, password).subscribe(() => {
      const returnUrl = this.route.snapshot.queryParams.returnUrl;
      this.successDialog().subscribe(() =>
        this.router.navigateByUrl(returnUrl || 'projects'));
    });
  }
  ngOnInit() {
    if (this.authService.validUser) {
      this.handleValidUser();
    } else {
      this.router.navigateByUrl('login');
    }
  }

  handleValidUser() {
    if (this.authService.confirmedUser) {
      const returnUrl = this.route.snapshot.queryParams.returnUrl;
      this.router.navigateByUrl(returnUrl || 'projects');
    } else {
      const { email } = this.route.snapshot.data;
      this.confirmForm.get('email').setValue(email);
    }
  }

  handleEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

}

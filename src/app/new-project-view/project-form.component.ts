import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatStepper, MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { startWith, debounceTime, switchMap, catchError, map, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from 'src/shared/services/user.service';
import { ProjectService } from 'src/shared/services/project.service';
import { SuccessDialogComponent } from 'src/app/dialogs/success-dialog/success-dialog.component';
import { User } from 'src/shared/models/User';
import { UserRole } from 'src/shared/models/enums/UserRole';
import { Project } from 'src/shared/models/Project';
import { Client } from 'src/shared/models/Client';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  clientForm: FormGroup;
  eventForm: FormGroup;
  quotationForm: FormGroup;
  chkClienteExistente: FormControl = new FormControl(false);
  stepper: MatStepper;
  clientsearch$: Observable<User[]>;
  validationMessages: { [key: string]: string } = {
    email: 'ingrese un email válido',
    required: 'el campo es obligatorio',
    minlength: 'el texto es demasiado corto',
    maxlength: 'el texto es demasiado largo',
  };
  loading: boolean;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private projectService: ProjectService,
              private dialog: MatDialog,
              private router: Router) {
  }

  get clientSelected() {
    return this.clientForm.value.client && this.clientForm.value.client.id;
  }
  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      client: [null],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required]
    });
    this.eventForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      location: ['', Validators.required],
    });
    this.quotationForm = this.formBuilder.group({
      quantity: [null, Validators.required],
      quotation: [null, Validators.required],
      aditionalItemPrice: [null, Validators.required],
      notes: ['', Validators.maxLength(500)],
    });

    this.clientsearch$ = this.clientForm.controls.client.valueChanges.pipe(
      startWith(null),
      // delay emits
      debounceTime(300),
      distinctUntilChanged(),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          return this.lookup(value);
        } else {
          return of([]);
        }
      }),
    );
  }

  printUser(usr: User) {
    return usr && `${usr.lastName}, ${usr.name} (${usr.email})`;
  }

  lookup(text: any): Observable<User[]> {
    if (!text || typeof text !== 'string' || text.length < 2) { return of([]); }
    this.loading = true;
    return this.userService.find(text).pipe(
      map(x => { this.loading = false; return x; }),
      // catch errors
      catchError(_ => {
        this.loading = false;
        return of([]);
      })
    );
  }
  next(stepper: MatStepper) {
    if (stepper.selectedIndex > 0) { stepper.next(); } else {
      this.stepper = stepper;
      const { name, lastName, email, client, location } = this.clientForm.value;
      const usr = new User({ name, lastName, email, location, role: UserRole.CLIENT });
      if (client && client.id) {
        stepper.next();
      } else {
        this.userService.createUser(usr).subscribe(
          () => { stepper.next(); }
        );
      }
    }
  }

  guardar() {
    const { title, date, location } = Object.assign({}, this.eventForm.value);
    const { quantity, quotation, aditionalItemPrice, notes } = Object.assign({}, this.quotationForm.value);
    const { name, email, lastName } = Object.assign({}, this.clientForm.value);
    const clientLocation = this.clientForm.value.location;
    const proj = new Project({
      title, date, location,
      quotation: Number.parseFloat(quotation),
      aditionalItemPrice: Number.parseFloat(aditionalItemPrice),
      notes, client: new Client({ name, lastName, email, location: clientLocation }), quantity
    });

    this.projectService.createProject(proj)
      .subscribe(() => {
        this.openDialog();
      });
  }

  getErrorMessage(form: FormGroup, controlName: string) {
    const errMap = form.controls[controlName].errors || {};
    const errors = Object.keys(errMap);
    const msg = errors.length ? this.validationMessages[errors[0]] : '';
    return msg;
  }
  openDialog() {
    const cfg = new MatDialogConfig();
    const dialogRef = this.dialog.open(SuccessDialogComponent, {});
    dialogRef.beforeClose().subscribe(() => {
      this.clientForm.reset();
      this.eventForm.reset();
      this.quotationForm.reset();
      this.stepper.reset();
      this.router.navigateByUrl('projects');
    });
  }

  onClientSelected(val: User) {
    Object.keys(val).forEach(k => {
      if (this.clientForm.controls[k]) {
        this.clientForm.controls[k].setValue(val[k]);
      }
    });
  }

  onClearClientSelection(event: Event) {
    this.clientForm.controls.client.setValue(null);
    this.clientForm.reset();
  }
  hasError(form: FormGroup, fieldName: string) {
    return form.pristine;
  }

}

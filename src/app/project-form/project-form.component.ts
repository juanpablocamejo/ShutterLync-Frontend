import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper, MatDialog, MatDialogConfig } from '@angular/material';
import { User } from 'src/shared/models/user';
import { UserRole } from 'src/shared/models/enums/UserRole';
import { UserService } from 'src/shared/services/user.service';
import { ProjectService } from 'src/shared/services/project.service';
import { Project } from 'src/shared/models/project';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  clientId: string;
  clientFormGroup: FormGroup;
  projectFormGroup: FormGroup;
  stepper: MatStepper;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private projectService: ProjectService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.clientFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      location: ['', Validators.required]
    });
    this.projectFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      quotation: [null, Validators.required],
      aditionalItemPrice: [null, Validators.required],
      notes: ['', Validators.required],
    });
  }
  next(stepper: MatStepper) {
    this.stepper = stepper;
    if (this.clientId) { stepper.next(); return; }
    const { name, lastName, email, location } = this.clientFormGroup.value;
    const usr = new User({ name, lastName, location, email, role: UserRole.CLIENT });
    this.userService.createUser(usr).subscribe(
      (id) => { this.clientId = id; stepper.next(); }
    );
  }

  guardar() {
    const { title, date, location, quotation, aditionalItemPrice, notes,
    } = Object.assign({}, this.projectFormGroup.value);
    const proj = new Project({
      title, date, location,
      quotation: Number.parseFloat(quotation),
      aditionalItemPrice: Number.parseFloat(aditionalItemPrice),
      notes, clientId: this.clientId
    });

    this.projectService.createProject(proj).subscribe(() => {
      this.openDialog();
    });
  }
  openDialog() {
    const cfg = new MatDialogConfig();
    const dialogRef = this.dialog.open(SuccessDialogComponent, {});
    dialogRef.beforeClose().subscribe(() => {
      this.clientId = undefined;
      this.clientFormGroup.reset();
      this.projectFormGroup.reset();
      this.stepper.reset();
    });
  }
}

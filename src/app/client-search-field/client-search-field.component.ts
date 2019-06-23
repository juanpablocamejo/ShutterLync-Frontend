import { Component, OnInit, Input, Output, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/shared/services/user.service';
import { Observable, of } from 'rxjs';
import { User } from '../../shared/models/user';
import { FormGroup } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material';

@Component({
  selector: 'app-client-search-field',
  templateUrl: './client-search-field.component.html',
  styleUrls: ['./client-search-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientSearchFieldComponent implements OnInit {
  @Input() fieldStyle: MatFormFieldAppearance;
  @Input() placeholder: string;
  @Input() form: FormGroup;
  @Input() controlName: string;
  clientsearch$: Observable<User[]>;
  loading: boolean;
  @Output() clientSelected = new EventEmitter<User>();
  @Output() clearSelection = new EventEmitter<User>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.clientsearch$ = this.form.controls[this.controlName].valueChanges.pipe(
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
      })
    );
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
  clearClientSearch(event: Event) {
    event.stopPropagation();
    this.form.controls[this.controlName].setValue(null);
    this.form.controls[this.controlName].reset();
    this.loading = false;
    this.clearSelection.emit();
  }
  onClientSelected(usr: User) {
    this.clientSelected.emit(usr);
  }
  printUser(usr: User) {
    return usr && `${usr.lastName}, ${usr.name} (${usr.email})`;
  }
}

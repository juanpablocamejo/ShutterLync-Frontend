import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError, finalize } from 'rxjs/operators';
import { UserService } from 'src/shared/services/user.service';
import { ProjectService } from 'src/shared/services/project.service';
import { Project } from 'src/shared/models/Project';
import { ProjectFilter } from 'src/shared/services/ProjectFilter';
import { ProjectState } from 'src/shared/models/enums/ProjectState';
import { PaginationOptions } from 'src/shared/services/PaginationOptions';


@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent implements OnInit {
  searchForm: FormGroup;
  showFilters = true;
  displayedColumns: string[] = ['date', 'state', 'client', 'title'];
  data: Project[] = [];
  projectStates = Object.entries(ProjectState);
  dirty = false;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  validationMessages: { [key: string]: string } = {
    required: 'el campo es obligatorio',
    minLenght: 'el texto es demasiado corto',
  };
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private projectService: ProjectService,
              private router: Router) {
  }

  get clientSelected() {
    return this.searchForm.value.client && this.searchForm.value.client.id;
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      client: [null],
      date: [null],
      states: [null],
      title: [null]
    });
  }
  getErrorMessage(form: FormGroup, controlName: string) {
    const errMap = form.controls[controlName].errors || {};
    const errors = Object.keys(errMap);
    if (!form.controls[controlName].pristine && errors.length) { console.log(controlName, errors); }
    return errors.length ? this.validationMessages[errors[0]] : '';
  }

  get searchFilter() {
    const { client, date, states, title } = this.searchForm.value;
    return new ProjectFilter({
      client: client && client.email,
      fromDate: date && date.begin,
      toDate: date && date.end,
      title, states
    });
  }

  onSearch() {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const { direction } = this.sort;
          console.log(this.sort);
          const sortPrefix = direction === 'desc' ? '-' : '';
          const pagination = new PaginationOptions({
            sort: sortPrefix + this.sort.active,
            page: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize
          });
          return this.projectService.search(this.searchFilter, pagination);
          // this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          this.resultsLength = data.totalCount;

          return data;

        }),
        catchError(() => {
          return of({ totalCount: 0, results: [] });
        }),
        finalize(() => { this.dirty = true; })
      ).subscribe(data => { this.data = data.results; this.showFilters = !this.resultsLength; });
  }

}




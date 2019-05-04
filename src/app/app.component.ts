import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/shared/services/project.service';
import { environment } from 'src/environments/environment';
import { Project } from 'src/shared/models/Project';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shutterlync';
}

import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/shared/services/project.service';
import { environment } from 'src/environments/environment';
import { Project } from 'src/shared/models/Project';
import { UserRole } from 'src/shared/models/enums/UserRole';
import { BaseObject } from 'src/shared/models/BaseObject';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';

class NavItem extends BaseObject {
  title: string;
  icon: string;
  path: '.';
  constructor(fields?: Partial<NavItem>) {
    super(fields);
  }

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShutterLync';
  sectionTitle: string;
  logged = false;
  isLoginPage = false;
  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    auth.currentUser.subscribe((usr) => {
      this.logged = !!usr;
    });
    router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.isLoginPage = evt.urlAfterRedirects.toLowerCase() === '/login';
      }
    });
    route.data.subscribe((data) => {
      console.log(data);
      this.sectionTitle = data.title;
    });
  }

  get navItems(): NavItem[] {
    return [
      new NavItem({ title: 'Cliente', icon: 'search', path: '.' }),
      new NavItem({ title: 'Evento', icon: 'search', path: '.' }),
      new NavItem({ title: 'Proyectos', icon: 'search', path: '.' })
    ];
  }
  logout() {
    this.auth.logout();
    this.logged = false;
    this.router.navigateByUrl('/');
  }


}

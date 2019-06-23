import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actions-toolbar',
  templateUrl: './actions-toolbar.component.html',
  styleUrls: ['./actions-toolbar.component.scss']
})
export class ActionsToolbarComponent implements OnInit {
  @Input() title: string;
  @Input() shortTitle: string;
  @Input() hideMenu = false;
  constructor(private route: ActivatedRoute,
              private router: Router
  ) { }


  public menuItems = [
    { section: 'upload', title: 'Carga de Imagenes' },
    { section: 'orders', title: 'Pedidos' }
  ];

  get section() {
    return this.route.snapshot.data.section;
  }
  get shortTitleText() {
    const text = this.shortTitle || this.title;
    const len = this.title.length;
    const maxLen = 25;
    const tooLarge = len > maxLen;
    return tooLarge ? `${text.substr(0, maxLen - 3)}...` : text;
  }

  changeSection(section: string) {
    this.router.navigateByUrl(`/projects/${this.route.snapshot.params.projectId}/${section}`);
  }
  ngOnInit() {
  }

}

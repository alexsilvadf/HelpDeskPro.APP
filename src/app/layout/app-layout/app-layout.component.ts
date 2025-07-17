import { Component, OnInit } from '@angular/core';
import {
  faBars,
  faHeadphones,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
})
export class AppLayoutComponent implements OnInit {
  faHeadphones = faHeadphones;
  fabars = faBars;
  faUserTie = faUserTie;

  widthSideBar = '280px';

  showSidebar: boolean = true;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

   toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}

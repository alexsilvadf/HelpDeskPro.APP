import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {
  menus: any[] = [];

   constructor(private auth: AuthService) {}
   
  ngOnInit() {
    this.menus = this.auth.getMenus();
  }

}

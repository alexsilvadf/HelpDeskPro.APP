import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {
  menus: any[] = [];

   constructor(private auth: AuthService, private router: Router) {}
   
  ngOnInit() {
    this.menus = this.auth.getMenus();
  }

  sair(){
    this.auth.logout();
     this.router.navigate(['/']);
  }

}

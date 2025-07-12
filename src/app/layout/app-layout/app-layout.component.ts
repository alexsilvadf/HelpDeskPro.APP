import { Component, OnInit } from '@angular/core';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {
 faHeadphones = faHeadphones

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

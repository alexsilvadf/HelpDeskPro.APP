import { Component, Input, OnInit } from '@angular/core';
import { Colstable } from '../inteface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

@Input() registros: any[]= [];
@Input() cols: Colstable[] = [];
@Input() totalRecords: number = 0;

  ngOnInit(): void {
  
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

@Input() existeExcluir: boolean = true;

@Output() itemSelecionado: EventEmitter<any> = new EventEmitter();

@Input() isSelecionar: boolean = true;


registroSelecionado!: any;

  ngOnInit(): void {
  
  }

  onRowSelect(e: any){
this.itemSelecionado.emit(e.data);
  }

  onRowUnSelect(e: any){
this.registroSelecionado = null;
  }

  handleExcluir(e: any){
console.log(e)
  }

}

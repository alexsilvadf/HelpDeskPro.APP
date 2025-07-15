import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Colstable } from '../inteface';
import {
  faPenSquare,
  faPenToSquare,
  faToggleOff,
  faToggleOn,
  faTrash,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() registros: any[] = [];
  @Input() cols: Colstable[] = [];
  @Input() totalRecords: number = 0;
  @Input() existeExcluir: boolean = true;
  @Input() isSelecionar: boolean = true;

  @Output() itemSelecionado: EventEmitter<any> = new EventEmitter();
  @Output() onExcluir: EventEmitter<any> = new EventEmitter();
  @Output() onEditar: EventEmitter<any> = new EventEmitter();

  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;

  registroSelecionado!: any;

  ngOnInit(): void {}

  onRowSelect(e: any) {
    this.itemSelecionado.emit(e.data);
  }

  onRowUnSelect(e: any) {
    this.registroSelecionado = null;
  }

  handleExcluir(e: any) {
    this.onExcluir.emit(e);
  }

  handleEditar(e: any) {
    this.onEditar.emit(e);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { StatusEnum } from 'src/app/core/status.enum';
import { Colstable } from 'src/app/shared/components/table/inteface';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
  nome: string;
}

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css'],
})
export class ListarCategoriaComponent implements OnInit {
  categorias: any[] = [];
  // categoria: any;
  categoriasFiltradas: any[] = [];
  status: StatusEnum[] = [];
  form!: FormGroup;
  colsTable: Colstable[] = [];

  mostrarModal: boolean = true;
  isUpdate: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private confirmationservice: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();

    this.status = [
      { codigo: 0, nome: 'Ativo' },
      { codigo: 1, nome: 'Inativo' },
    ];

    this.form = this.fb.group({
      nome: this.fb.control<string | null>(null),
      status: this.fb.control<StatusEnum | null>(null),
      categoria: this.fb.control<any | null>(null),
      checked: this.fb.control<boolean>(false)
    });

    this.criarColunas();

    if(this.isUpdate){
      // this.formGroup.controls.nome.disable;
    }
  }

  carregarCategorias() {
    this.categoriaService.getCategorias().subscribe((resp) => {
      if (resp) {
        this.categorias = resp;
      } else {
        alert('Erro ao buscar categorias');
      }
    });
  }

  criarColunas() {
    this.colsTable = [
      { field: 'nome', header: 'Nome' },
      { field: 'statusDescricao', header: 'Status' },
    ];
  }

  filterCountry(event: any) {
    let filtered: any[] = [];
    let query = event.query ? event.query.toLowerCase() : '';

    for (let i = 0; i < (this.categorias as any[]).length; i++) {
      let categoria = (this.categorias as any[])[i];

      if (categoria?.nome && categoria.nome.toLowerCase().startsWith(query)) {
        filtered.push(categoria);
      }
    }

    this.categoriasFiltradas = filtered;
  }

  onItemSelecionado(e: any) {
    console.log(e);
  }

  excluirRegistro(e: any) {
    this.confirmationservice.confirm({
      message: 'Deseja remover esta categoria?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        let codigo = e.codigo;
        this.categoriaService.excluirCategoria(codigo).subscribe((resp) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: resp.mensagem,
          });

          let resposta = resp;
          this.carregarCategorias();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Operação cancelada pelo usuário',
        });
      },
    });
  }

editarCategoria(event: any){
this.mostrarModal = true;
}




}

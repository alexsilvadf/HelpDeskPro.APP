import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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
  categoriasGeral: any[] = [];
  categorias: any[] = [];
  categoriasFiltradas: any[] = [];
  status: StatusEnum[] = [];
  tituloModal: string = 'Adicionar Categoria';

  form = this.fb.group({
    nome: this.fb.control<string | null>(null),
    status: this.fb.control<number | null>(-1),
    statusSelecionado: this.fb.control<number | null>(-1),
    categoria: this.fb.control<any | null>(null),
    checked: this.fb.control<boolean>(false),
  });

  colsTable: Colstable[] = [];
  mostrarModal: boolean = false;
  faPlus = faPlus;

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
      { codigo: -1, nome: 'Todos' },
    ];

    this.criarColunas();
  }

  carregarCategorias() {
    this.categoriaService
      .getCategorias(this.form.controls.status.value as number)
      .subscribe((resp) => {
        if (resp) {
          this.categorias = resp;
          this.categoriasGeral = resp;
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

  filtrarCategorias(event: any) {
    let filtered: any[] = [];
    let query = event.query ? event.query.toLowerCase() : '';

    for (let i = 0; i < (this.categoriasGeral as any[]).length; i++) {
      let categoria = (this.categoriasGeral as any[])[i];

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

  editarCategoria(event: any) {
    this.mostrarModal = true;
    this.form.patchValue(event);
    this.tituloModal = 'Editar Categoria';

    if (event.status === 0) {
      this.form.controls.status.setValue(0);
    } else {
      this.form.controls.status.setValue(1);
    }

    this.form.controls.nome.disable();
  }

  adicionarCatgoria() {
    this.form.reset();
    this.mostrarModal = true;
    this.tituloModal = 'Adicionar Categoria';
    this.form.controls.nome.enable();
    this.form.controls.status.setValue(0);
  }

  handleAdd() {
    if (!this.form.controls.nome.value) {
      this.messageService.add({
        severity: 'warn',
        detail: 'Campo nome é obrigatório',
      });
    }

    this.categoriaService
      .adicionarCategoria(this.form.getRawValue())
      .subscribe((resp) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Registro salvo com sucesso',
        });

        this.mostrarModal = false;

        this.form.reset();
        this.form.controls.status.setValue(-1);
        this.carregarCategorias();
      });
  }

  categoriaSelecionada(event: any) {
    this.categorias = [];
    this.categorias.push(event);
  }

  limparFiltros() {
    this.carregarCategorias();
  }

  buscarCategoriaPorStatus(event: any) {
    this.form.reset();
    this.form.controls.status.setValue(event.value.codigo);
    this.carregarCategorias();
  }
}

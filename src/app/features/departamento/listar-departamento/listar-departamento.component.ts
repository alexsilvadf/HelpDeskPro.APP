import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DepartamentoService } from 'src/app/core/services/departamento.service';
import { StatusEnum } from 'src/app/core/status.enum';
import { Colstable } from 'src/app/shared/components/table/inteface';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
  nome: string;
}

@Component({
  selector: 'app-listar-departamento',
  templateUrl: './listar-departamento.component.html',
  styleUrls: ['./listar-departamento.component.css'],
})
export class ListarDepartamentoComponent implements OnInit {
  status: StatusEnum[] = [];
  colsTable: Colstable[] = [];
  departamentosFiltrados: any[] = [];
  departamentosGeral: any[] = [];
  departamentos: any[] = [];

  tituloModal: string = 'Adicionar Departamento';
  faPlus = faPlus;
  mostrarModal: boolean = false;

  form = this.fb.group({
    nome: this.fb.control<string | null>(null),
    status: this.fb.control<number | null>(-1),
    statusSelecionado: this.fb.control<number | null>(-1),
    departamento: this.fb.control<any | null>(null),
    checked: this.fb.control<boolean>(false),
  });

  constructor(
    private departamentoService: DepartamentoService,
    private messageService: MessageService,
    private confirmationservice: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.status = [
      { codigo: 0, nome: 'Ativo' },
      { codigo: 1, nome: 'Inativo' },
      { codigo: -1, nome: 'Todos' },
    ];

    this.criarColunas();
    this.carregarDepartamentos();
  }

  criarColunas() {
    this.colsTable = [
      { field: 'nome', header: 'Nome' },
      { field: 'statusDescricao', header: 'Status' },
    ];
  }

  carregarDepartamentos() {
    this.departamentoService
      .getDepartamentos(this.form.controls.status.value as number)
      .subscribe((resp) => {
        if (resp) {
          this.departamentos = resp;
          this.departamentosGeral = resp;
        } else {
          alert('Erro ao buscar departamentos');
        }
      });
  }

  filtrarDepartamentos(event: any) {
    let filtered: any[] = [];
    let query = event.query ? event.query.toLowerCase() : '';

    for (let i = 0; i < (this.departamentosGeral as any[]).length; i++) {
      let categoria = (this.departamentosGeral as any[])[i];

      if (categoria?.nome && categoria.nome.toLowerCase().startsWith(query)) {
        filtered.push(categoria);
      }
    }
  }

  departamentoSelecionado(event: any) {
    this.departamentos = [];
    this.departamentos.push(event);
  }

  limparFiltros() {
    this.carregarDepartamentos();
  }

  buscarDepartamentoPorStatus(event: any) {
    this.form.reset();
    this.form.controls.status.setValue(event.value.codigo);
    this.carregarDepartamentos();
  }

  adicionarDepartamento() {
    this.form.reset();
    this.mostrarModal = true;
    this.tituloModal = 'Adicionar Departamento';
    this.form.controls.nome.enable();
    this.form.controls.status.setValue(0);
  }

  excluirRegistro(e: any) {
    this.confirmationservice.confirm({
      message: 'Deseja remover este departamento?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        let codigo = e.codigo;
        this.departamentoService.excluirDepartamento(codigo).subscribe((resp) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: resp.mensagem,
          });
          let resposta = resp;
          this.carregarDepartamentos();
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

  editarDepartamento(event: any) {
    this.mostrarModal = true;
    this.form.patchValue(event);
    this.tituloModal = 'Editar Departamento';

    if (event.status === 0) {
      this.form.controls.status.setValue(0);
    } else {
      this.form.controls.status.setValue(1);
    }

    this.form.controls.nome.disable();
  }

  handleAdd() {
    if (!this.form.controls.nome.value) {
      this.messageService.add({
        severity: 'warn',
        detail: 'Campo nome é obrigatório',
      });
    }

    this.departamentoService
      .adicionarDepartamento(this.form.getRawValue())
      .subscribe((resp) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Registro salvo com sucesso',
        });

        this.mostrarModal = false;

        this.form.reset();
        this.form.controls.status.setValue(-1);
        this.carregarDepartamentos();
      });
  }

  onItemSelecionado(e: any) {
    console.log(e);
  }
}

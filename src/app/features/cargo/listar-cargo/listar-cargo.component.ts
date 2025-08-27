import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CargoService } from 'src/app/core/services/cargo.service';
import { StatusEnum } from 'src/app/core/status.enum';
import { Colstable } from 'src/app/shared/components/table/inteface';

@Component({
  selector: 'app-listar-cargo',
  templateUrl: './listar-cargo.component.html',
  styleUrls: ['./listar-cargo.component.css'],
})


export class ListarCargoComponent implements OnInit {
  cargosGeral: any[] = [];
  cargos: any[] = [];
  cargosFiltrados: any[] = [];
  status: StatusEnum[] = [];
  tituloModal: string = 'Adicionar Cargo';

  colsTable: Colstable[] = [];
  mostrarModal: boolean = false;
  faPlus = faPlus;

  form = this.fb.group({
    nome: this.fb.control<string | null>(null),
    status: this.fb.control<number | null>(-1),
    statusSelecionado: this.fb.control<number | null>(-1),
    cargo: this.fb.control<any | null>(null),
    checked: this.fb.control<boolean>(false),
  });

  constructor(
    private cargoService: CargoService,
    private messageService: MessageService,
    private confirmationservice: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
     this.carregarCargos();

    this.status = [
      { codigo: 0, nome: 'Ativo' },
      { codigo: 1, nome: 'Inativo' },
      { codigo: -1, nome: 'Todos' },
    ];

    this.criarColunas();
  }

   criarColunas() {
    this.colsTable = [
      { field: 'nome', header: 'Nome' },
      { field: 'statusDescricao', header: 'Status' },
    ];
  }

  filtrarCargos(event: any) {
    let filtered: any[] = [];
    let query = event.query ? event.query.toLowerCase() : '';

    for (let i = 0; i < (this.cargosGeral as any[]).length; i++) {
      let cargo = (this.cargosGeral as any[])[i];

      if (cargo?.nome && cargo.nome.toLowerCase().startsWith(query)) {
        filtered.push(cargo);
      }
    }

     this.cargosFiltrados = filtered;
  }

  cargoSelecionado(event: any) {
    this.cargos = [];
    this.cargos.push(event);
  }

  limparFiltros() {
    this.carregarCargos();
  }

  carregarCargos() {
    this.cargoService
      .getCargos(this.form.controls.status.value as number)
      .subscribe((resp) => {
        if (resp) {
          this.cargos = resp;
          this.cargosGeral = resp;
        } else {
          alert('Erro ao buscar cargos');
        }
      });
  }

  buscarCargosPorStatus(event: any) {
    this.form.reset();
    this.form.controls.status.setValue(event.value.codigo);
    this.carregarCargos();
  }

  adicionarCargo() {
    this.form.reset();
    this.mostrarModal = true;
    this.tituloModal = 'Adicionar Cargo';
    this.form.controls.nome.enable();
    this.form.controls.status.setValue(0);
  }

  onItemSelecionado(e: any) {
    console.log(e);
  }

  excluirRegistro(e: any) {
    this.confirmationservice.confirm({
      message: 'Deseja remover este cargo?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        let codigo = e.codigo;
        this.cargoService.excluirCargo(codigo).subscribe((resp) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: resp.mensagem,
          });

          let resposta = resp;
          this.carregarCargos();
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

  editarCargo(event: any) {
    this.mostrarModal = true;
    this.form.patchValue(event);
    this.tituloModal = 'Editar Cargo';

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

    this.cargoService
      .adicionarCargo(this.form.getRawValue())
      .subscribe((resp) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Registro salvo com sucesso',
        });

        this.mostrarModal = false;

        this.form.reset();
        this.form.controls.status.setValue(-1);
        this.carregarCargos();
      });

  }
}

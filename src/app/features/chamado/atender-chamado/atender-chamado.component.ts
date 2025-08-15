import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChamadoService } from 'src/app/core/services/chamado.service';
import { StatusChamadoEnum } from 'src/app/core/statusChamado.enum';
import { Colstable } from 'src/app/shared/components/table/inteface';
import { ManterChamadoComponent } from '../manter-chamado/manter-chamado.component';

@Component({
  selector: 'app-atender-chamado',
  templateUrl: './atender-chamado.component.html',
  styleUrls: ['./atender-chamado.component.css']
})
export class AtenderChamadoComponent implements OnInit{

  
   @ViewChild(ManterChamadoComponent) ManterChamadoComponent!: ManterChamadoComponent;
   faPlus = faPlus;
   faSearch = faSearch;
   chamados: any[] = [];
   chamadosFiltrados: any[] = [];
   chamadosGeral: any[] = [];
   status: StatusChamadoEnum[] = [];
 
   colsTable: Colstable[] = [];
 
   mostrarModal = false;
 
   tituloModal: string = 'Adicionar Categoria';
 
   form = this.fb.group({
     status: this.fb.control<number | null>(-1),
     statusSelecionado: this.fb.control<number | null>(null),
     seqAno: this.fb.control<string | null>(null),
     checked: this.fb.control<boolean>(false),
     dataInicial: this.fb.control<Date | null>(null),
     dataFinal: this.fb.control<Date | null>(null),
     titulo: this.fb.control<string | null>(null)
   });
 
   constructor(
     private fb: FormBuilder,
     private chamadoService: ChamadoService,
     private confirmationservice: ConfirmationService,
     private messageService: MessageService
   ) {}
 
   ngOnInit(): void {
     this.criarColunas();
 
     this.status = [
       { codigo: 0, nome: 'Pendente' },
       { codigo: 1, nome: 'Análise' },
       { codigo: 2, nome: 'Finalizado' },
       { codigo: -1, nome: 'Todos' },
     ];
 
     this.form.controls.statusSelecionado.valueChanges.subscribe((s) => {
       this.form.controls.statusSelecionado.setValue(s);
     });
 
     this.carregarChamados();
   }
 
   criarColunas() {
     this.colsTable = [
       { field: 'seqAno', header: 'Nº/Ano' },
       { field: 'titulo', header: 'Título' },
       { field: 'statusDescricao', header: 'Status' },
       { field: 'dataAbertura', header: 'Data Abertura' },
     ];
   }
 
   filtrarChamados(event: any) {
     let filtered: any[] = [];
     let query = event.query ? event.query.toLowerCase() : '';
 
     for (let i = 0; i < (this.chamadosGeral as any[]).length; i++) {
       let categoria = (this.chamadosGeral as any[])[i];
 
       if (categoria?.nome && categoria.nome.toLowerCase().startsWith(query)) {
         filtered.push(categoria);
       }
     }
     this.chamadosFiltrados = filtered;
   }
 
   chamadoSelecionado(event: any) {
     this.chamados = [];
     this.chamados.push(event);
   }
 
   limparFiltros() {
     this.form.reset();
     this.carregarChamados();
   }
 
   carregarChamados() {
     const parametros = {
       seqAno: this.form.controls.seqAno.value,
       dataInicial: this.form.controls.dataInicial.value,
       dataFinal: this.form.controls.dataFinal.value,
       statusChamado: this.form.controls.statusSelecionado.value,
     };
 
     this.chamadoService.getChamados(parametros).subscribe((resp) => {
       if (resp) {
         this.chamados = resp;
         this.chamadosGeral = resp;
        
       } else {
         alert('Erro ao buscar Chamados');
       }
     });
   }
 
   buscarChamadoPorStatus(event: any) {
     this.form.reset();
     this.form.controls.status.setValue(event.value.codigo);
     this.carregarChamados();
   }
 
   onItemSelecionado(e: any) {
     console.log(e);
   }
 
   excluirRegistro(e: any) {
     this.confirmationservice.confirm({
       message: 'Deseja remover este chamado?',
       header: 'Atenção',
       icon: 'pi pi-exclamation-triangle',
       acceptLabel: 'Sim',
       rejectLabel: 'Não',
       accept: () => {
         let codigo = e.codigo;
         this.chamadoService.excluirChamado(codigo).subscribe((resp) => {
           this.messageService.add({
             severity: 'success',
             summary: 'Sucesso',
             detail: resp.mensagem,
           });
           let resposta = resp;
           this.carregarChamados();
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
 
   editarChamado(event: any) {
         this.mostrarModal = true;
         this.tituloModal = 'Atender Chamado'
         let tela = 'Atendimento';
 
          setTimeout(() => {
       if (this.ManterChamadoComponent) {
         this.ManterChamadoComponent.iniciar(event as any, tela as string);
       }
     }, 1000);
   
   }
 
 
 
  handleAdd() {
     // if (!this.form.controls.nome.value) {
     //   this.messageService.add({
     //     severity: 'warn',
     //     detail: 'Campo nome é obrigatório',
     //   });
     // }
 
     // this.categoriaService
     //   .adicionarCategoria(this.form.getRawValue())
     //   .subscribe((resp) => {
     //     this.messageService.add({
     //       severity: 'success',
     //       detail: 'Registro salvo com sucesso',
     //     });
 
     //     this.mostrarModal = false;
 
     //     this.form.reset();
     //     this.form.controls.status.setValue(-1);
     //     this.carregarCategorias();
     //   });
   }


   receberNotifica(event: any){
    this.carregarChamados();
         this.mostrarModal = false;
   }
 

}

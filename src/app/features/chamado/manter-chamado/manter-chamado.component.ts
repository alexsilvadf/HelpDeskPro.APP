import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { ChamadoService } from 'src/app/core/services/chamado.service';

@Component({
  selector: 'app-manter-chamado',
  templateUrl: './manter-chamado.component.html',
  styleUrls: ['./manter-chamado.component.css'],
})
export class ManterChamadoComponent implements OnInit {
  @Output() carregarChamados = new EventEmitter<boolean>();
  tituloPagina = 'Abrir Chamado';
  uploadProgress: number = -1;
  uploadMessage: string = '';
  categorias: any[] = [];
  categoriasFiltradas: any[] = [];
  categoriasGeral: any[] = [];
  edicao: boolean = false;
  tipoTela: string = '';

  perfilLogado: string = "";

  arquivo: File | null = null;
  selectedFiles: File[] = [];

  status = [
    { codigo: 0, nome: 'Baixa' },
    { codigo: 1, nome: 'Média' },
    { codigo: 2, nome: 'Alta' },
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private chamadoService: ChamadoService,
    private categoriaService: CategoriaService
  ) {
    this.form = this.fb.group({
      numeroChamado: this.fb.control<number | null>(null),
      titulo: this.fb.control<string | null>(null),
      descricaoProblema: this.fb.control<string | null>(null),
      resolucaoProblema: this.fb.control<string | null>(null),
      prioridade: this.fb.control<number | null>(0),
      statusChamado: this.fb.control<number | null>(0),
      dataInicial: this.fb.control<Date | null>(null),
      dataFinal: this.fb.control<Date | null>(null),
      idCategoria: this.fb.control<number | null>(13),
      idDepartamento: this.fb.control<number | null>(4),
      departamento: this.fb.control<string | null>({
        value: null,
        disabled: true,
      }),
      categoria: this.fb.control<any | null>(null),
    });
  }

  situacaoChamado = [
    { codigo: 0, nome: 'Pendente' },
    { codigo: 1, nome: 'Análise' },
    { codigo: 2, nome: 'Finalizado' },
  ];

  ngOnInit(): void {
    this.carregarCategorias();
     this.form.get('statusChamado')?.disable();
    //Pegar o departamento do usuário logado
    // this.form.controls['departamento'].setValue('Secretaria de Obras');
    const departamento = localStorage.getItem('departamento');
   this.perfilLogado = localStorage.getItem('perfil') || '';

   if(this.perfilLogado !== 'user' && this.perfilLogado !== 'Administrador'){
    this.form.controls['descricaoProblema'].disable();
   }


    if (departamento) {
      this.form.controls['departamento'].setValue(departamento);
    }
  }

  iniciar(chamado: any, tela?: string) {
    if (tela !== 'Atendimento') {
      this.tituloPagina = 'Editar Chamado';
      this.edicao = true;
      setTimeout(() => {
        this.carregarCategorias();
      }, 1000);

      this.form.controls['titulo'].setValue(chamado.titulo);
      this.form.controls['descricaoProblema'].setValue(
        chamado.descricaoProblema
      );
      this.form.controls['prioridade'].setValue(chamado.prioridade);
      this.form.controls['categoria'].setValue(chamado.idCategoria);

      const categoriaEncontrada = this.categorias.find(
        (c) => c.codigo === chamado.idCategoria
      );

      this.form.controls['categoria'].setValue(categoriaEncontrada);
     
    } else {
      this.tituloPagina = 'Atender Chamadoyyyyyy';
      this.tipoTela = 'Atendimento';
      this.edicao = true;

      this.form.controls['statusChamado'].setValue(chamado.statusChamado);
      this.form.controls['numeroChamado'].setValue(chamado.codigo);
       this.form.get('statusChamado')?.enable();

      setTimeout(() => {
        this.carregarCategorias();
      }, 1000);

      this.form.controls['titulo'].setValue(chamado.titulo);
      this.form.controls['descricaoProblema'].setValue(
        chamado.descricaoProblema
      );
      this.form.controls['prioridade'].setValue(chamado.prioridade);
      this.form.controls['categoria'].setValue(chamado.idCategoria);

      const categoriaEncontrada = this.categorias.find(
        (c) => c.codigo === chamado.idCategoria
      );

      this.form.controls['categoria'].setValue(categoriaEncontrada);

      this.form.controls['titulo'].disable();
      this.form.controls['descricaoProblema'].disable();
    }
  }

  carregarCategorias() {
    this.categoriaService.getCategorias(-1).subscribe((resp) => {
      if (resp) {
        this.categorias = resp;
        this.categoriasGeral = resp;
      } else {
        alert('Erro ao buscar categorias');
      }
    });
  }

  // Método chamado ao clicar em "Salvar"
  handleAdd(event: any) {
    if (!this.form.value.titulo) {
      this.messageService.add({
        severity: 'warn',
        detail: 'Campo título é obrigatório',
      });
      return;
    }

    if (!this.form.value.descricaoProblema) {
      this.messageService.add({
        severity: 'warn',
        detail: 'Campo descrição é obrigatório',
      });
      return;
    }

    const formdata = new FormData();
    formdata.append('titulo', this.form.value.titulo);
    formdata.append('descricaoProblema', this.form.value.descricaoProblema);
    formdata.append(
      'statusChamado',
      String(this.form.value.statusChamado ?? 0)
    );
    formdata.append('prioridade', String(this.form.value.prioridade ?? 0));
    formdata.append('idCategoria', String(this.form.value.idCategoria ?? 0));
    formdata.append(
      'idDepartamento',
      String(this.form.value.idDepartamento ?? 0)
    );

    if (this.arquivo) {
      formdata.append('anexo', this.arquivo);
    }

    this.chamadoService.adicionarChamado(formdata).subscribe({
      next: (resp) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Registro salvo com sucesso',
        });

        this.form.reset();
        this.form.controls['prioridade'].setValue(0);
        this.arquivo = null;
        this.router.navigateByUrl('/listar-chamado');
        this.carregarChamados.emit(true);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: 'Erro ao salvar o chamado',
        });
      },
    });
  }

  handleUpdate(event: any) {
    this.chamadoService
      .atualizarChamado(
        this.form.controls['statusChamado'].value,
        this.form.controls['resolucaoProblema'].value,
        this.form.controls['numeroChamado'].value
      )
      .subscribe({
        next: (resp) => {
          this.messageService.add({
            severity: 'success',
            detail: 'Registro salvo com sucesso',
          });

          this.form.reset();
          // this.form.controls['prioridade'].setValue(0);
          this.arquivo = null;
          this.router.navigateByUrl('/atender-chamado');
          this.carregarChamados.emit(true);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            detail: 'Erro ao salvar o chamado',
          });
        },
      });
  }

  // Disparado quando o usuário seleciona um arquivo
  onSelect(event: any) {
    if (event.files && event.files.length > 0) {
      this.arquivo = event.files[0];
      console.log('Arquivo selecionado:', this.arquivo);
    }
  }

  enviarArquivo() {
    if (!this.arquivo) return;

    const formData = new FormData();
    formData.append('arquivo', this.arquivo);

    this.chamadoService.adicionarChamado(formData).subscribe({
      next: (resp) => {
        this.messageService.add({
          severity: 'success',
          detail: 'Registro salvo com sucesso',
        });

        this.form.reset();
        this.form.controls['prioridade'].setValue(0);
        this.arquivo = null;
        this.router.navigateByUrl('/listar-chamado');
        this.carregarChamados.emit(true);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          detail: 'Erro ao salvar o chamado',
        });
      },
    });
  }

  // Evento disparado ao concluir upload (caso esteja usando upload automático, mas aqui estamos usando customizado)
  onUpload(event: any) {
    console.log('Upload concluído:', event.files);
    this.messageService.add({
      severity: 'info',
      summary: 'Sucesso',
      detail: 'Arquivo enviado com sucesso',
    });
  }

  // Atualiza progresso do upload
  onProgress(event: ProgressEvent) {
    if (event.lengthComputable) {
      this.uploadProgress = Math.round((event.loaded / event.total) * 100);
      console.log(`Progresso do upload: ${this.uploadProgress}%`);
    }
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

  categoriaSelecionada(event: any) {
    this.categorias = [];
    this.categorias.push(event);
    this.form.controls['idCategoria'].setValue(event.codigo);
  }

  // No seu componente




}

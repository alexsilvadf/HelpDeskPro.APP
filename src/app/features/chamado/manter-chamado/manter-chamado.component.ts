import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-manter-chamado',
  templateUrl: './manter-chamado.component.html',
  styleUrls: ['./manter-chamado.component.css']
})
export class ManterChamadoComponent implements OnInit{
  uploadProgress: number = -1;
  uploadMessage: string = '';

     status = [
      { codigo: 0, nome: 'Ativo' },
      { codigo: 1, nome: 'Inativo' },
      { codigo: -1, nome: 'Todos' },
    ];


    form = this.fb.group({
    titulo: this.fb.control<string | null>(null),
    descricaoProblema: this.fb.control<string | null>(null),
    status: this.fb.control<number | null>(-1),
    statusSelecionado: this.fb.control<number | null>(-1),
    
    checked: this.fb.control<boolean>(false),
    dataInicial: this.fb.control<Date | null>(null),
    dataFinal: this.fb.control<Date | null>(null),
  });

  constructor(private fb: FormBuilder, private messageService: MessageService){}


  ngOnInit(): void {
   
  }

  handleAdd(){
    
  }

   onSelect(event: { originalEvent: Event, files: File[] }) {
    console.log('Arquivos selecionados:', event.files);
    this.uploadMessage = '';
    this.uploadProgress = -1;
  }

  onUpload(event: any) {
      console.log('Upload concluído:', event.files);
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }

     onProgress(event: ProgressEvent) {
    if (event.lengthComputable) {
      this.uploadProgress = Math.round((event.loaded / event.total) * 100);
      console.log(`Progresso do upload: ${this.uploadProgress}%`);
    }
  }

}

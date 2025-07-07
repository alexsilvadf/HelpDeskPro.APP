import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { StatusEnum } from 'src/app/core/status.enum';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
  nome: string;
}

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css'],
})
export class ListarCategoriaComponent implements OnInit {
  categorias: any[] = [];
  categoria: any;
  categoriasFiltradas: any[] = [];
  status: StatusEnum[] = [];
  selectedCity: City | undefined;

  formGroup!: FormGroup;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((resp) => {
      if (resp) {
        this.categorias = resp;
      } else {
        alert('Erro ao buscar categorias');
      }
    });

    this.status = [
      { codigo: 0, nome: 'Ativo' },
      { codigo: 1, nome: 'Inativo' },
    ];

    this.formGroup = new FormGroup({
      selectedCity: new FormControl<City | null>(null),
    });
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
}

import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/core/services/categoria.service';

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
  categoria: any;
  categoriasFiltradas: any[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((resp) => {
      if (resp) {
        this.categorias = resp;
      } else {
        alert('Erro ao buscar categorias');
      }
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

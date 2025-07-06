import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/core/services/categoria.service';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {
  categorias: any[] = [];


constructor(private categoriaService: CategoriaService){}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((resp) =>{
      if(resp){
        this.categorias = resp;
      }else{
        alert('Erro ao buscar categorias');
        
      }
    })
  }

}

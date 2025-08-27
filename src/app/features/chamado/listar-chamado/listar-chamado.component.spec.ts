import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarChamadoComponent } from './listar-chamado.component';

describe('ListarChamadoComponent', () => {
  let component: ListarChamadoComponent;
  let fixture: ComponentFixture<ListarChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarChamadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterChamadoComponent } from './manter-chamado.component';

describe('ManterChamadoComponent', () => {
  let component: ManterChamadoComponent;
  let fixture: ComponentFixture<ManterChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManterChamadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManterChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

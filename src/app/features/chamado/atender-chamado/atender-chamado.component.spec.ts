import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtenderChamadoComponent } from './atender-chamado.component';

describe('AtenderChamadoComponent', () => {
  let component: AtenderChamadoComponent;
  let fixture: ComponentFixture<AtenderChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtenderChamadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtenderChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

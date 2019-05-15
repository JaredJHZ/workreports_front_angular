import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaClientesComponent } from './consulta-clientes.component';

describe('ConsultaClientesComponent', () => {
  let component: ConsultaClientesComponent;
  let fixture: ComponentFixture<ConsultaClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

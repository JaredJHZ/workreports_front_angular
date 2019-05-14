import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaEmpleadosComponent } from './busqueda-empleados.component';

describe('BusquedaEmpleadosComponent', () => {
  let component: BusquedaEmpleadosComponent;
  let fixture: ComponentFixture<BusquedaEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

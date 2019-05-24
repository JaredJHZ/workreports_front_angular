import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaTareaOrdenComponent } from './busqueda-tarea-orden.component';

describe('BusquedaTareaOrdenComponent', () => {
  let component: BusquedaTareaOrdenComponent;
  let fixture: ComponentFixture<BusquedaTareaOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaTareaOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaTareaOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaTareasComponent } from './busqueda-tareas.component';

describe('BusquedaTareasComponent', () => {
  let component: BusquedaTareasComponent;
  let fixture: ComponentFixture<BusquedaTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

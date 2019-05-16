import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaOrdenesComponent } from './busqueda-ordenes.component';

describe('BusquedaOrdenesComponent', () => {
  let component: BusquedaOrdenesComponent;
  let fixture: ComponentFixture<BusquedaOrdenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaOrdenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

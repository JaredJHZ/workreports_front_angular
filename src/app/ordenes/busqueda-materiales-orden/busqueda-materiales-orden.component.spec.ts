import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaMaterialesOrdenComponent } from './busqueda-materiales-orden.component';

describe('BusquedaMaterialesOrdenComponent', () => {
  let component: BusquedaMaterialesOrdenComponent;
  let fixture: ComponentFixture<BusquedaMaterialesOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaMaterialesOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaMaterialesOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

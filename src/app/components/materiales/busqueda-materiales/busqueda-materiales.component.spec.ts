import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaMaterialesComponent } from './busqueda-materiales.component';

describe('BusquedaMaterialesComponent', () => {
  let component: BusquedaMaterialesComponent;
  let fixture: ComponentFixture<BusquedaMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

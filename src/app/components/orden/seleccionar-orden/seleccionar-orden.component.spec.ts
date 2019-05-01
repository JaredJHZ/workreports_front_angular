import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarOrdenComponent } from './seleccionar-orden.component';

describe('SeleccionarOrdenComponent', () => {
  let component: SeleccionarOrdenComponent;
  let fixture: ComponentFixture<SeleccionarOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

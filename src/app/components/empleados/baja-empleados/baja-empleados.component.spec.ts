import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaEmpleadosComponent } from './baja-empleados.component';

describe('BajaEmpleadosComponent', () => {
  let component: BajaEmpleadosComponent;
  let fixture: ComponentFixture<BajaEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

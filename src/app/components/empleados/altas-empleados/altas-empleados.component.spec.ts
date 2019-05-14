import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltasEmpleadosComponent } from './altas-empleados.component';

describe('AltasEmpleadosComponent', () => {
  let component: AltasEmpleadosComponent;
  let fixture: ComponentFixture<AltasEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltasEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltasEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

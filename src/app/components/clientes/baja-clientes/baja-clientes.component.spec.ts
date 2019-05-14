import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaClientesComponent } from './baja-clientes.component';

describe('BajaClientesComponent', () => {
  let component: BajaClientesComponent;
  let fixture: ComponentFixture<BajaClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

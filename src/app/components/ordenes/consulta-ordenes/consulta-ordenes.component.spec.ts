import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaOrdenesComponent } from './consulta-ordenes.component';

describe('ConsultaOrdenesComponent', () => {
  let component: ConsultaOrdenesComponent;
  let fixture: ComponentFixture<ConsultaOrdenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaOrdenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

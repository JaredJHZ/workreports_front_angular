import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarTareaComponent } from './seleccionar-tarea.component';

describe('SeleccionarTareaComponent', () => {
  let component: SeleccionarTareaComponent;
  let fixture: ComponentFixture<SeleccionarTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

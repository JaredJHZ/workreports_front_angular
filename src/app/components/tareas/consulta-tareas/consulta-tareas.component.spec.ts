import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTareasComponent } from './consulta-tareas.component';

describe('ConsultaTareasComponent', () => {
  let component: ConsultaTareasComponent;
  let fixture: ComponentFixture<ConsultaTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

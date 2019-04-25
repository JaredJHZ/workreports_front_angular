import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarTareaComponent } from './consultar-tarea.component';

describe('ConsultarTareaComponent', () => {
  let component: ConsultarTareaComponent;
  let fixture: ComponentFixture<ConsultarTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

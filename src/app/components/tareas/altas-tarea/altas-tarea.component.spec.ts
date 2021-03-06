import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTareaComponent } from './altas-tarea.component';

describe('AgregarTareaComponent', () => {
  let component: AgregarTareaComponent;
  let fixture: ComponentFixture<AgregarTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

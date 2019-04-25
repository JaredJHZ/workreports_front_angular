import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTareaComponent } from './eliminar-tarea.component';

describe('EliminarTareaComponent', () => {
  let component: EliminarTareaComponent;
  let fixture: ComponentFixture<EliminarTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

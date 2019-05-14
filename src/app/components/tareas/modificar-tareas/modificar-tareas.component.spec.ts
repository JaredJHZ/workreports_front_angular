import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTareasComponent } from './modificar-tareas.component';

describe('ModificarTareasComponent', () => {
  let component: ModificarTareasComponent;
  let fixture: ComponentFixture<ModificarTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

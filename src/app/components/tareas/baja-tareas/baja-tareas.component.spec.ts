import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaTareasComponent } from './baja-tareas.component';

describe('BajaTareasComponent', () => {
  let component: BajaTareasComponent;
  let fixture: ComponentFixture<BajaTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

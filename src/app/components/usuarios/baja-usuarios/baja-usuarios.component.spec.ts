import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaUsuariosComponent } from './baja-usuarios.component';

describe('BajaUsuariosComponent', () => {
  let component: BajaUsuariosComponent;
  let fixture: ComponentFixture<BajaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

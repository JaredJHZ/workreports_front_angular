import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaOrdenComponent } from './baja-orden.component';

describe('BajaOrdenComponent', () => {
  let component: BajaOrdenComponent;
  let fixture: ComponentFixture<BajaOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

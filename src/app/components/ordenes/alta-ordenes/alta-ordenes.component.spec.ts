import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaOrdenesComponent } from './alta-ordenes.component';

describe('AltaOrdenesComponent', () => {
  let component: AltaOrdenesComponent;
  let fixture: ComponentFixture<AltaOrdenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaOrdenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaMaterialComponent } from './alta-material.component';

describe('AltaMaterialComponent', () => {
  let component: AltaMaterialComponent;
  let fixture: ComponentFixture<AltaMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

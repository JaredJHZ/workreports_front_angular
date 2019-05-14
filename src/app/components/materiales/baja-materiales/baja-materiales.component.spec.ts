import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaMaterialesComponent } from './baja-materiales.component';

describe('BajaMaterialesComponent', () => {
  let component: BajaMaterialesComponent;
  let fixture: ComponentFixture<BajaMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

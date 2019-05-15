import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaMaterialesComponent } from './consulta-materiales.component';

describe('ConsultaMaterialesComponent', () => {
  let component: ConsultaMaterialesComponent;
  let fixture: ComponentFixture<ConsultaMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

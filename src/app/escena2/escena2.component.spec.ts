import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Escena2Component } from './escena2.component';

describe('Escena2Component', () => {
  let component: Escena2Component;
  let fixture: ComponentFixture<Escena2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Escena2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Escena2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

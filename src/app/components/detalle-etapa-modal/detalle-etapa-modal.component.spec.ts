import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEtapaModalComponent } from './detalle-etapa-modal.component';

describe('DetalleEtapaModalComponent', () => {
  let component: DetalleEtapaModalComponent;
  let fixture: ComponentFixture<DetalleEtapaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleEtapaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEtapaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

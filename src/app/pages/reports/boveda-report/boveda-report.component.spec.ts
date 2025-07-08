import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BovedaReportComponent } from './boveda-report.component';

describe('BovedaReportComponent', () => {
  let component: BovedaReportComponent;
  let fixture: ComponentFixture<BovedaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BovedaReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BovedaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

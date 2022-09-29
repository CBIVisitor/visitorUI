import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitLogsComponent } from './visit-logs.component';

describe('VisitLogsComponent', () => {
  let component: VisitLogsComponent;
  let fixture: ComponentFixture<VisitLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

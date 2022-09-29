import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackvisitorComponent } from './trackvisitor.component';

describe('TrackvisitorComponent', () => {
  let component: TrackvisitorComponent;
  let fixture: ComponentFixture<TrackvisitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackvisitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackvisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

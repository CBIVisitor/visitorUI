import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgoComponent } from './ago.component';

describe('AgoComponent', () => {
  let component: AgoComponent;
  let fixture: ComponentFixture<AgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

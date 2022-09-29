import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TlooDComponent } from './tloo-d.component';

describe('TlooDComponent', () => {
  let component: TlooDComponent;
  let fixture: ComponentFixture<TlooDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TlooDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TlooDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

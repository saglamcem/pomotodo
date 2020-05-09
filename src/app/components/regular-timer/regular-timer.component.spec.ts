import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularTimerComponent } from './regular-timer.component';

describe('RegularTimerComponent', () => {
  let component: RegularTimerComponent;
  let fixture: ComponentFixture<RegularTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).not.toBeFalsy();
  });
});

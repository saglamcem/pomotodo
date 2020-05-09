import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularTimerContainerComponent } from './regular-timer-container.component';
import { RegularTimerComponent } from '../regular-timer/regular-timer.component';

describe('RegularTimerContainerComponent', () => {
  let component: RegularTimerContainerComponent;
  let fixture: ComponentFixture<RegularTimerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegularTimerContainerComponent,
        RegularTimerComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularTimerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

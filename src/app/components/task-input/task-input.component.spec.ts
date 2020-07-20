import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInputComponent } from './task-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskInputComponent', () => {
  let component: TaskInputComponent;
  let fixture: ComponentFixture<TaskInputComponent>;

  const matDialogRefStub = {};
  const matDialogDataStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ReactiveFormsModule, MaterialModule],
      declarations: [TaskInputComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: matDialogDataStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

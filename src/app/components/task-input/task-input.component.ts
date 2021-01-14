import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskItem } from '../../shared/model/task-item.model';

@Component({
  selector: 'pomo-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss']
})
export class TaskInputComponent implements OnInit {
  taskForm = this.fb.group({
    label: ['', Validators.required],
    description: [''],
    numberOfCycles: [1],
    atIteration: [1],
    finished: [false]
  });

  constructor(
    private readonly fb: FormBuilder,
    public readonly dialogRef: MatDialogRef<TaskInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskItem
  ) {}

  ngOnInit(): void {}

  decreaseNumberOfPomoCycles() {
    let newNumberOfCycles = this.taskForm.get('numberOfCycles').value;
    newNumberOfCycles -= 1;
    this.taskForm.patchValue({
      numberOfCycles: newNumberOfCycles
    })
  }

  increaseNumberOfPomoCycles() {
    let newNumberOfCycles = this.taskForm.get('numberOfCycles').value;
    newNumberOfCycles += 1;
    this.taskForm.patchValue({
      numberOfCycles: newNumberOfCycles
    })
  }

  decreaseAtIteration() {
    let newAtIteration = this.taskForm.get('atIteration').value;
    newAtIteration -= 1;
    this.taskForm.patchValue({
      atIteration: newAtIteration
    })
  }

  increaseAtIteration() {
    let newAtIteration = this.taskForm.get('atIteration').value;
    newAtIteration += 1;
    this.taskForm.patchValue({
      atIteration: newAtIteration
    })
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.taskForm.value);
    this.dialogRef.close(this.taskForm.value);
  }
}

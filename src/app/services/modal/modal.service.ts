import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskInputComponent } from '../../components/task-input/task-input.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) {}

  openTaskInputModal() {
    return this.dialog.open(TaskInputComponent, {
      width: '60vw',
      height: '600px',
    })
  }
}

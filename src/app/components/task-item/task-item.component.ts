import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskItem } from '../../shared/model/task-item.model';

@Component({
  selector: 'pomo-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() data: TaskItem;
  @Output() setFinished$?: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  handleSetFinished() {
    this.setFinished$.emit(this.data.id)
  }
}

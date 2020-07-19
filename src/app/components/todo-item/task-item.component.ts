import { Component, Input, OnInit } from '@angular/core';
import { TaskItem } from '../../shared/model/task-item.model';

@Component({
  selector: 'pomo-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() data: TaskItem;

  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../../shared/model/todo-item.model';

@Component({
  selector: 'pomo-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() data: TodoItem;

  constructor() {}

  ngOnInit(): void {}
}

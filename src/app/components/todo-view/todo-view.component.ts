import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TodoItem } from '../../shared/model/todo-item.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'pomo-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoViewComponent implements OnInit {
  todoItems: TodoItem[] = [
    { label: 'Get to work', atIteration: 1, finished: false },
    {
      label: 'Pick up groceries',
      description: 'No chocolate! No chocolate! No chocolate! No chocolate! No chocolate! No chocolate! No chocolate! No chocolate! No chocolate!',
      atIteration: 1,
      finished: false
    },
    { label: 'Go home', atIteration: 1, finished: false }
  ];

  currentFocusItems: TodoItem[] = [
    {label: 'Fall asleep', atIteration: 1, finished: false}
  ];

  doneItems: TodoItem[] = [
    {label: 'Get up', atIteration: 1, finished: true},
    {label: 'Brush teeth', atIteration: 1, finished: true},
    {label: 'Take a shower', atIteration: 1, finished: true},
    {label: 'Check e-mail', atIteration: 1, finished: true},
    {label: 'Walk dog', atIteration: 1, finished: true}
  ];

  constructor() {}

  ngOnInit(): void {}

  handleDropForTodoItems(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todoItems, event.previousIndex, event.currentIndex);
  }

  handleDropForFocusItems(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.currentFocusItems, event.previousIndex, event.currentIndex);
  }

  handleDropForDoneItems(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.doneItems, event.previousIndex, event.currentIndex);
  }
}

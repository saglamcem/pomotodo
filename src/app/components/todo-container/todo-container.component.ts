import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TodoItem } from '../../shared/model/todo-item.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'pomo-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoContainerComponent implements OnInit {
  todoItems: TodoItem[] = [
    { label: 'Get to work', atIteration: 1, finished: false },
    {
      label: 'Pick up groceries',
      description: 'No chocolate! No chocolate! No chocolate! No chocolate! No chocolate! No chocolate! No chocolate! No chocolate! No chocolate!',
      atIteration: 1,
      finished: false
    },
    { label: 'Go home', atIteration: 1, finished: false },
    { label: 'Work on finishing Pomotodo app', atIteration: 2, finished: false },
    { label: 'Test 1', atIteration: 3, finished: false },
    { label: 'Test 2', atIteration: 3, finished: false },
    { label: 'Test 3', atIteration: 3, finished: false }
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

  drop(event: CdkDragDrop<TodoItem[]>) {
    console.log(event.item.element.nativeElement.innerText);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  handleDropForDoneItems(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.doneItems, event.previousIndex, event.currentIndex);
  }
}

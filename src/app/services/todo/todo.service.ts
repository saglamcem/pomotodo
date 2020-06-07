import { Injectable } from '@angular/core';
import { TodoItem } from '../../shared/model/todo-item.model';
import { BehaviorSubject, forkJoin, Observable, Subject, combineLatest, merge, zip } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
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
    { label: 'Fall asleep', atIteration: 1, finished: false }
  ];

  doneItems: TodoItem[] = [
    { label: 'Get up', atIteration: 1, finished: true },
    { label: 'Brush teeth', atIteration: 1, finished: true },
    { label: 'Take a shower', atIteration: 1, finished: true },
    { label: 'Check e-mail', atIteration: 1, finished: true },
    { label: 'Walk dog', atIteration: 1, finished: true }
  ];

  // todoItems: TodoItem[] = [];
  // currentFocusItems: TodoItem[] = [];
  // doneItems: TodoItem[] = [];

  private _todoItems: Subject<TodoItem[]> = new BehaviorSubject(this.todoItems);
  private _currentFocusItems: Subject<TodoItem[]> = new BehaviorSubject(this.currentFocusItems);
  private _doneItems: Subject<TodoItem[]> = new BehaviorSubject(this.doneItems);

  public readonly todoItems$: Observable<TodoItem[]> = this._todoItems.asObservable();
  public readonly currentFocusItems$: Observable<TodoItem[]> = this._currentFocusItems.asObservable();
  public readonly doneItems$: Observable<TodoItem[]> = this._doneItems.asObservable();

  constructor() {
    this.setTodoItems(this.todoItems);
    this.setCurrentFocusItems(this.currentFocusItems);
    this.setDoneItems(this.doneItems);
  }

  getAllItems(): Observable<any> {
    return combineLatest([
      this.todoItems$,
      this.currentFocusItems$,
      this.doneItems$
    ]);
  }

  addTodoItem(newTodoItem: TodoItem) {
    this.setTodoItems([...this.todoItems, newTodoItem]);
  }

  setTodoItems(todoItems: TodoItem[] = []) {
    this.todoItems = todoItems;
    this._todoItems.next(this.todoItems);
  }

  setCurrentFocusItems(currentFocusItems: TodoItem[] = []) {
    this.currentFocusItems = currentFocusItems;
    this._currentFocusItems.next(this.currentFocusItems);
  }

  setDoneItems(doneItems: TodoItem[] = []) {
    this.doneItems = doneItems;
    this._doneItems.next(this.doneItems);
  }
}

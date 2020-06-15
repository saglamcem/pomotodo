import { Injectable } from '@angular/core';
import { TodoItem } from '../../shared/model/todo-item.model';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoItems: TodoItem[] = [];
  currentFocusItems: TodoItem[] = [];
  doneItems: TodoItem[] = [];

  private _todoItems: Subject<TodoItem[]> = new BehaviorSubject(this.todoItems);
  private _currentFocusItems: Subject<TodoItem[]> = new BehaviorSubject(this.currentFocusItems);
  private _doneItems: Subject<TodoItem[]> = new BehaviorSubject(this.doneItems);

  public readonly todoItems$: Observable<TodoItem[]> = this._todoItems.asObservable();
  public readonly currentFocusItems$: Observable<TodoItem[]> = this._currentFocusItems.asObservable();
  public readonly doneItems$: Observable<TodoItem[]> = this._doneItems.asObservable();

  constructor() {
    const allItems = localStorage.getItem('allItems');

    const allItemsJson: { todo: TodoItem[], focus: TodoItem[], done: TodoItem[] } = allItems
      ? JSON.parse(allItems)
      : { todo: [], focus: [], done: [] };

    const { todo, focus, done } = allItemsJson;

    this.setTodoItems(todo);
    this.setCurrentFocusItems(focus);
    this.setDoneItems(done);
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

    const allItemsStringifiedJson = JSON.stringify({
      todo: this.todoItems,
      focus: this.currentFocusItems,
      done: this.doneItems
    });

    localStorage.setItem('allItems', allItemsStringifiedJson);
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

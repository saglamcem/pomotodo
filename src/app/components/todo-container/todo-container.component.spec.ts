import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoContainerComponent } from './todo-container.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

describe('TodoContainerComponent', () => {
  let component: TodoContainerComponent;
  let fixture: ComponentFixture<TodoContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        DragDropModule,
        MatCardModule,
        MatTabsModule,
        MatCheckboxModule,
        MatIconModule
      ],
      declarations: [ TodoContainerComponent, TodoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoContainerComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

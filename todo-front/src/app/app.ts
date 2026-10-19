import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Todo {
  id?: number;
  todoName: string;
  description: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
    <div class="container">
      <h1>My Todos</h1>

      <div class="form">
        <input [(ngModel)]="todoName" placeholder="Todo name" />
        <input [(ngModel)]="description" placeholder="Description" />
        <button (click)="addTodo()">Add</button>
      </div>

      <ul>
        @for (todo of todos; track todo.id) {
          <li>
            <strong>{{ todo.todoName }}</strong> - {{ todo.description }}
          </li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .container { max-width: 500px; margin: 40px auto; font-family: Arial; }
    .form { display: flex; gap: 8px; margin-bottom: 20px; }
    input { padding: 8px; flex: 1; }
    button { padding: 8px 16px; cursor: pointer; }
    li { padding: 8px 0; border-bottom: 1px solid #ddd; }
  `]
})
export class App implements OnInit {
  private api = 'http://localhost:9090';

  todos: Todo[] = [];
  todoName = '';
  description = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<Todo[]>(`${this.api}/getAll`)
      .subscribe(data => this.todos = data);
  }

  addTodo() {
    if (!this.todoName.trim()) return;

    const todo: Todo = {
      todoName: this.todoName,
      description: this.description
    };

    this.http.post<Todo>(`${this.api}/saveTodo`, todo).subscribe(() => {
      this.todoName = '';
      this.description = '';
      this.loadTodos();
    });
  }
}
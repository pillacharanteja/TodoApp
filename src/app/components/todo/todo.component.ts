import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AlertService } from '../../services/alert.service';
import { Todo } from 'src/app/models/todo';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm: FormGroup;
  isNew: boolean = true;
  todoList: Todo[] = [];
  subTodos: Todo[] = [];
  todoMapForDrowpDown: Map<number, string> = new Map();

  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {

    this.getTodo();
    this.buildTodoForm();

  }

  get name() {
    return this.todoForm.get('name');
  }

  get subTodoList() {
    return this.todoForm.get('subTodoList') as FormArray;
  }

  get description() {
    return this.todoForm.get('description');
  }
  get isFavourite() {
    return this.todoForm.get('isFavourite');
  }

  onSubmit() {
    if (this.todoForm.valid) {

      if (this.isNew) {
        this.createTodo();
      } else {
        this.updateTodo();
      }
    }

  }

  getTodo() {
    this.apiService.getTodoList()
      .pipe(first())
      .subscribe(resp => {
        if (resp) {
          this.todoList = resp;
          this.todoList.forEach(item => {
            this.todoMapForDrowpDown.set(item.id, item.name);
          });
        }
      },
        error => {
          if (error && error.statusText) {
            this.alertService.error(error.statusText);
          }

        });
  }

  createTodo() {
    this.apiService.saveTodo(this.todoForm.value)
      .pipe(first())
      .subscribe(resp => {
        if (resp) {
          this.alertService.success("Successfully created");
        }
      },
        error => {
          if (error && error.statusText) {
            this.alertService.error(error.statusText);
          }
        });
  }

  updateTodo() {
    this.apiService.updateTodo(this.todoForm.value)
      .pipe(first())
      .subscribe(resp => {
        if (resp) {
          this.alertService.success("Successfully updated");
        }
      },
        error => {
          if (error && error.statusText) {
            this.alertService.error(error.statusText);
          }
        });
  }
  // Creating form
  buildTodoForm() {
    this.todoForm = this.formBuilder.group({
      id: [''],
      parent_id: [''],
      name: ['', Validators.required],
      description: [''],
      subTodoList: new FormArray([]),
      isFavourite: ["false"],
    });
  }
  addSubTodoList() {
    this.subTodoList.controls.push(
      this.formBuilder.group({
        id: [''],
        parent_id: [''],
        name: ['', Validators.required],
        description: [''],
        subTodoList: new FormArray([]),
        isFavourite: [false + ''],
      })
    );
  }

  /**
   * Responsible for patching the form/ prefill form with selected todo details.
   * @param todo Selected todo for editing 
   */
  fillForm(todo: Todo) {
    this.isNew = false;
    this.todoForm.patchValue(todo);
    this.isFavourite.patchValue(todo.isFavourite + '');
  }

  // Load the subtodo list
  showSubTodo(todo: Todo) {
    this.subTodos = todo.subTodoList;
  }

  // Updating fav
  updateFavourite(todo: Todo) {

    this.apiService.updateFavourite(todo.id, !todo.isFavourite ? 0 : 1).pipe(first())
      .subscribe(resp => {
        if (resp) {
          this.alertService.success("Added to favourties");
        }
      },
        error => {
          if (error && error.statusText) {
            this.alertService.error(error.statusText);
          }
        });
  }

  // Sending delete request
  delete(todoId: number) {
    this.apiService.deleteTodo(todoId).subscribe(resp => {
      if (resp) {
        this.alertService.success("Successfully deleted");
      }
    },
      error => {
        if (error && error.statusText) {
          this.alertService.error(error.statusText);
        }
      });
  }

  /**
   * Reset the form to intial values
   */
  resetForm() {
    this.buildTodoForm();
    // this.todoForm.reset();
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Todo } from '../models/todo';
import { AlertService } from './alert.service';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = "http://192.168.10:8022";



  constructor(
    private http: HttpClient,
    private alertService: AlertService,

  ) { }

  getTodoList() {
    return this.http.get<any>(AppConstants.API_URL + '/todos');
  }

  getTodoById(id: number) {
    return this.http.get<any>(AppConstants.API_URL + '/todos/' + id);
  }

  saveTodo(todo: Todo) {
    return this.http.post<Todo>(AppConstants.API_URL + '/todos', JSON.stringify(todo), { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  updateTodo(todo: Todo) {
    return this.http.put<Todo>(AppConstants.API_URL + '/todos/' + todo.id, JSON.stringify(todo), { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  deleteTodo(id: number) {
    return this.http.delete(AppConstants.API_URL + '/todos/' + id, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }


  updateFavourite(id: number, isFavourite: number) {
    return this.http.put<Todo>(AppConstants.API_URL + '/todos/isFav/' + id, { 'isFavourite': isFavourite }, { headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }
}

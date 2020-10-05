import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from '../app/components/todo/todo.component';
import { FavouriteComponent } from '../app/components/favourite/favourite.component'

const routes: Routes = [
  { path: "todo", component: TodoComponent },
  { path: "favourite", component: FavouriteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

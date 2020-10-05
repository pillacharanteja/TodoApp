import { BrowserModule, } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { CommonModule } from "@angular/common";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    LoaderComponent,
    AlertComponent,
    NavBarComponent,
    FavouriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

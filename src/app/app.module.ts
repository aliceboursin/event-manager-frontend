import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import {HttpClientModule } from '@angular/common/http';
import { SessionStorageService } from './services/session.storage.service';
import { SignUpComponent } from './signup/signup.component';
import { EventService } from './services/event.service';
import { EventListComponent } from './event-list/event-list.component';
import { EventListItemComponent } from './event-list-item/event-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    EventListComponent,
    EventListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService, 
    SessionStorageService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

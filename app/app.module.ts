import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';


import { AppComponent }  from './app.component';
import { ToDoPageComponent } from './todopage.component'
import { TaskDetailComponent } from './taskdetail.component';
import { TaskEditComponent } from './taskedit.component'
import { ProjectsComponent } from './projects.component';
import { ProjectEditComponent } from './projectedit.component';
import { HttpService } from './http.service';
import { ProjectDetailComponent } from './projectdetail.component';
import { WelcomePage } from './welcomepage.component';
import { NotFoundPage } from './not-found.component';
import { MyInfoComponent } from './myinfo.component';
import { UserInfoComponent } from './userinfo.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { AppRoutingModule } from './app-routing.module';


@NgModule({
  imports:      [ 
  	BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  	],
  declarations: [
      AppComponent,
      ToDoPageComponent,
      TaskDetailComponent,
      TaskEditComponent,
      ProjectsComponent,
      ProjectEditComponent,
      ProjectDetailComponent,
      WelcomePage,
      NotFoundPage,
      MyInfoComponent,
      UserInfoComponent,
      LoginComponent,
      RegisterComponent
  	],
  providers: [
      {provide:APP_BASE_HREF,useValue:'/'},
      {provide:LocationStrategy,useClass: HashLocationStrategy},
      HttpService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

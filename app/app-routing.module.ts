import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePage } from './welcomepage.component';
import { ProjectDetailComponent } from './projectdetail.component'
import { TaskDetailComponent } from './taskdetail.component';
import { NotFoundPage } from './not-found.component';
import {ToDoPageComponent } from './todopage.component';
import { MyInfoComponent } from './myinfo.component';
import { UserInfoComponent } from './userinfo.component';
import { TaskEditComponent } from './taskedit.component';
import { ProjectEditComponent } from './projectedit.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

const routes: Routes = [
	{
		path:'home',component:ToDoPageComponent,children:[
		{path: '', component: WelcomePage, pathMatch:'full'},
		{path:'createproject',component:ProjectEditComponent},
		{path:'editproject/:projectid',component:ProjectEditComponent},
		{path:'project/:projectid/createtask',component:TaskEditComponent},
		{
			path:'project/:projectid',component: ProjectDetailComponent
		},
		{path:'task/:taskid',component:TaskDetailComponent},
		{path:'edittask/:taskid',component:TaskEditComponent},
	]
	},
	{		path:'user/:userId',component:UserInfoComponent},
	{		path:'mypage',component:MyInfoComponent},
	{		path:'login',component:LoginComponent	},
	{		path:'register',component:RegisterComponent	},
	{path: '', redirectTo:'home', pathMatch:'full'},
	{path:'**',component:NotFoundPage}
];

@NgModule({
	imports:[ RouterModule.forRoot(routes) ],
	exports:[ RouterModule ]
	})
export class AppRoutingModule{}
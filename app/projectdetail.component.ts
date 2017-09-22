import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { Location } from '@angular/common';

import { Project } from './project';
import { Task } from './task';
import { Invitation } from './invitation';
import { HttpService } from './http.service';
import {User} from "./user";

@Component({
	selector: 'project-detail',
	templateUrl: './projectdetail.component.html',
	styleUrls:['./projectdetail.component.css']

	})
export class ProjectDetailComponent implements OnInit {

	project: Project;
	me:User;
	invitedUserId:number;
	showIdInput:boolean;
	inviteMsg:string;
	showInviteMsg:boolean;

	constructor(
		private httpService: HttpService,
		private router: Router,
		private route: ActivatedRoute
		){
		/*this.project={
			id:1,
			detail:"This is a project for the people who like the A.I.channal,and want it better.",
			name:'kizunaAIProject',
			userList:[
				{id:1,name:'kizunaAI',faceUrl:'/img/face.jpg'},
				{id:2,name:'kizunaAI2',faceUrl:'/img/face.jpg'}
			],
			taskList:[
				{id:1,name:'hello AIchan',detail:'youtuber AI chan desu',finished:1,finishUserName:'shigure',finishUserId:1,important:1,projectid:1},
				{id:2,name:'hello AIchan',detail:'youtuber AI chan desu',finished:0,finishUserName:'',finishUserId:0,important:1,projectid:1}
			]
		}*/
	}

	ngOnInit(): void{
		this.route.params
      		.switchMap((params: Params) =>this.httpService.getProject(+params['projectid']))
      		.subscribe(project=>this.project=project);
		this.httpService.getMyInfo().then(data=>{
			this.me=data;
		});
	}

	onTaskSelect(task:Task):void{
		this.router.navigate(['home','task',task.id]);
	}

	switchIdInput():void{
		this.showIdInput=!this.showIdInput;
	}

	inviteUser(idString:string):void{
		let id = parseInt(idString);
		if(id===this.me.id){
			this.inviteMsg="不能邀请自己";
			this.showInviteMsg=true;
			return;
		}
		let invitation = new Invitation();
		invitation.inviterId=this.me.id;
		invitation.inviterName=this.me.name;
		invitation.projectId=this.project.id;
		invitation.projectName=this.project.name;
		invitation.invitedId=id;
		invitation.state=0;
		this.httpService.inviteUser(invitation).then(data=>{
			if(data==='success'){
				this.inviteMsg="已发送邀请";
				this.showInviteMsg=true;
				setTimeout(()=>{
					this.showInviteMsg=false;
					this.showIdInput=!this.showIdInput;
				},500);
			}
		}).catch(()=>{
			this.inviteMsg="发送邀请发生错误";
			this.showInviteMsg=true;
		})

	}

	navigateToProjectEdit():void{
		this.router.navigate(['home','editproject',this.project.id]);
	}
	navigateToTaskEdit():void{
			this.router.navigate(['home','project',this.project.id,'createtask']);
	}
	navigateToUser(id:number):void{
			this.router.navigate(["user",id]);
	}
}
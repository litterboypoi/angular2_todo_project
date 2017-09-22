import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from './task';
import { HttpService } from './http.service';

@Component({
  selector: 'task-detail',
  templateUrl: `./taskdetail.component.html`,
	styleUrls:['./taskdetail.component.css']
})
export class TaskDetailComponent implements OnInit { 

	task: Task;
	constructor(
			private httpService: HttpService,
			private route: ActivatedRoute,
			private router:Router,
			private location: Location
		){ }

	ngOnInit(): void{
		this.route.params
      		.switchMap((params: Params) =>this.httpService.getTask(+params['taskid']))
      		.subscribe(task=>{this.task=task});
	}
	navigatetoedit():void{
				this.router.navigate(['home','edittask',this.task.id]);
	}
	back():void{
				this.location.back();
	}
	finishTask():void{
				let task = this.task;
				task.finished = 1;
				this.httpService.updateTask(this.task.id,this.task);
	}
 }

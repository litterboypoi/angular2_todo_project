import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Location } from '@angular/common';

import { Project } from './project';
import { HttpService } from './http.service';
import { Task } from './task';

@Component({
	selector: 'projects',
	templateUrl: './projects.component.html',
	styleUrls: [ './projects.component.css' ]
})
export class ProjectsComponent implements OnInit {

	projcets: Project[];
	selectedProject: Project;

	showsection = false;

	constructor(
		private httpService: HttpService,
		private router: Router,
		//private location:Location
		){}



	ngOnInit(): void{
		//this.httpService.getProjects();
		this.httpService.getRxjsProjects().subscribe((projects: Project[])=>{
			this.projcets = projects;
		});

	}

	onProjectSelect(project: Project): void{
			this.router.navigate(['home',`project`,project.id]);
		if(project===this.selectedProject){
			this.selectedProject = null;
		}else {
			//获取最新的project的内容
			/*this.projectservice.getProject(project.id).then(p => {
				for (let i = 0; i < this.projcets.length; i++) {
					if (this.projcets[i].id === p.id) {
						this.projcets[i] = p;
					}
				}
				this.selectedProject = p;
			});*/
			this.selectedProject = project;
		}

	}

	navigateToTask(task:Task):void{
		this.router.navigate(['home',`task`,task.id]);
	}

	deleteProject(project: Project): void{
		this.httpService.deleteProjcet(project.id)
		.then(()=>{
				this.projcets = this.projcets.filter(p => p !== project);
				if(this.selectedProject === project){ this.selectedProject = null}
			});
	}

	navigateToCreateProject(): void{
		this.router.navigate(['home','createproject']);
	}
}
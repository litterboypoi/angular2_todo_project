/**
 * Created by shigure on 2017/5/26.
 */
import { Component } from "@angular/core";
import { ActivatedRoute,Router } from '@angular/router'
//import { Location } from '@angular/common';

import { Project } from './project';
import { HttpService } from './http.service'

@Component({
    templateUrl:'./projectedit.component.html'
})export class ProjectEditComponent {
    private project: Project;
    private operationMsg:string;
    constructor(
        private route:ActivatedRoute,
        private httpService:HttpService,
        private router: Router
    ){}



    ngOnInit():void{
        this.route.params.subscribe(pramas=>{
            console.log(pramas);
            if(pramas['projectid']!==undefined){
                this.httpService.getProject(+pramas['projectid'])
                    .then(project=>this.project = project);
            }else {
                this.project = new Project();
            }
        });
    }

    submit():void{
        if(this.project.id===undefined){
            this.httpService.createProject(this.project);
            //下面应该放在then里面，不过createProject没有返回Promise所以我就懒得处理了
            this.operationMsg="创建成功";
            setTimeout(()=>{
                this.router.navigate(['home']);
            },1000);
        }else{
            this.httpService.updateProject(this.project);
        }
    }

    deleteProject():void{
        this.httpService.deleteProjcet(this.project.id).then(()=>{
            this.operationMsg="删除成功";
            setTimeout(()=>{
                this.router.navigate(['home']);
            },1000);
        });
    }

}
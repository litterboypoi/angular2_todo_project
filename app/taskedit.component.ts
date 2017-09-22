/**
 * Created by shigure on 2017/5/26.
 */
import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute,Params} from '@angular/router';
import { Location } from '@angular/common'

import { Task } from './task';
import { HttpService } from './http.service';
import {isUndefined} from "util";

@Component({
    templateUrl:'./taskedit.component.html',

})export class TaskEditComponent implements OnInit{

    private task:Task;
    constructor(
        private route:ActivatedRoute,
        private httpService:HttpService,
        private location:Location
    ){}



    ngOnInit():void{
        this.route.params.subscribe(pramas=>{
            if(pramas['taskid']!==undefined){
                this.httpService.getTask(+pramas['taskid'])
                    .then(task=>this.task = task);
            }else {
                let projectid = +pramas['projectid'];
                this.task = new Task();
                this.task.projectid = projectid;
            }
        });
}

    submit():void{
            this.task.important=this.task.important?1:0;

            if(this.task.id===undefined){
                this.httpService.createTask(this.task);
            }else{
                this.httpService.updateTask(this.task.id,this.task);
            }
    }

    deleteTask():void{
            this.httpService.deleteTask(this.task).then(()=>{
                this.location.back();
            });
    }
}
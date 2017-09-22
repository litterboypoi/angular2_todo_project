/**
 * Created by shigure on 2017/5/23.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute,Params} from '@angular/router';

import {HttpService} from './http.service';

import { UserShortCut } from './usershortcut'

@Component({
    templateUrl:'./userinfo.component.html',
    styleUrls:['./userinfo.component.css']
})export class UserInfoComponent implements OnInit{

    private user: UserShortCut;

    constructor(
        private httpService:HttpService,
        private route:ActivatedRoute
    ){ }

    ngOnInit(){
        this.route.params
            .switchMap((params: Params) =>this.httpService.getUserInfo(+params['userId']))
            .subscribe(user=>{this.user=user});
    }
}


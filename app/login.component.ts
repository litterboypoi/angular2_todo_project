/**
 * Created by shigure on 2017/6/1.
 */
import {Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

import { HttpService } from './http.service';

@Component({
    template:`
        <div class="row">
            <div class="formcontainer col-sm-offset-4 col-sm-4">
                <h2 class="title">登录TODO</h2>
                <p *ngIf="resMsg">{{resMsg}}</p>
                <form role="form" novalidate>
                    <div class="form-group">
                        <label for="username">用户名</label>
                        <input type="text" class="form-control" [(ngModel)]="userName"  name="username" placeholder="请输入用户名" />
                    </div>
                    <div class="form-group">
                        <label for="pwd">密码</label>
                        <input class="form-control" type="password" [(ngModel)]="pwd" name="pwd" placeholder="请输入密码" />
                    </div>
                    <button type="button" class="btn btn-default float-left" (click)="login(userName,pwd)" >登陆</button>
                    <button type="button" class="btn btn-default float-right" (click)="register()" >注册</button>
                </form>
            </div>    
        </div>
        
        
    `,
    styles:[
        `
            .formcontainer{
                margin-top:40px; 
            }
            .formcontainer::after{
                content: " ";
                display: block;
                height: 0;
                clear: both;
                visibility: hidden;
                
            }
            .title{
                text-align: center;
            }
            .float-left{
                float: left;
            }
            .float-right{
                float: right;
            }
        `
    ]
})export class LoginComponent implements OnInit{

    private userName:string;
    private pwd:string;
    private resMsg:string;
    constructor(
        private httpService: HttpService,
        private router: Router,
        private cookieService:CookieService
    ){}

    ngOnInit(){
        if(this.getCookie("userId")){
            this.router.navigate(["home"]);
        }
    }

    getCookie(key:string){
        return this.cookieService.get(key);
    }

    login(userName:string,pwd:string):void{
            this.httpService.login(userName,pwd)
                .then(msg=>{
                    if(msg==='success'){
                        this.resMsg="登陆成功！";
                        setTimeout(()=>{
                            this.router.navigate(["home"]);
                        },500);
                    }else{
                        this.resMsg="登陆失败，请确认输入的用户名和密码是否正确";
                    }
                    }
                )
    }

    register():void{
            this.router.navigate(["register"]);
    }

}
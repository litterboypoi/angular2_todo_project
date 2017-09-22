/**
 * Created by shigure on 2017/6/1.
 */
import {Component} from "@angular/core";
import {Router} from '@angular/router';

import { HttpService } from './http.service';
@Component({
    template:`
        
        <div class="row">
            <div class="formcontainer col-sm-offset-4 col-sm-4">
            <h2 class="title">注册新用户</h2>
                <form role="form" novalidate>
                    <div class="form-group">
                        <label for="username">用户名</label>
                        <input type="text" class="form-control" name="userName" placeholder="请输入用户名"
                               [(ngModel)]="userName"
                               (keyup.enter)="confirmUserName(userName)"
                               (blur)="confirmUserName(userName)"/>
                        <p class="errorMsg" *ngIf="inputNameMsg">{{inputNameMsg}}</p>
                    </div>
                    <div class="form-group">
                        <label for="pwd">密码</label>
                        <input class="form-control" type="password"  name="pwd" placeholder="请输入密码"
                               [(ngModel)]="pwd"
                               (keyup.enter)="checkPwd()"
                               (blur)="checkPwd()"/>
                    </div>
                    <div class="form-group">
                        <label for="pwd">确认密码</label>
                        <input class="form-control" type="password"  name="pwdConfirm" placeholder="请输入密码"
                               [(ngModel)]="pwdConfirm"
                               (keyup.enter)="checkPwd()"
                               (blur)="checkPwd()"/>
                        <p class="errorMsg" *ngIf="inputPwdMsg">{{inputPwdMsg}}</p>
                    </div>
                    <button type="button" class="btn btn-default " [disabled]="!isValidForm()" (click)="submit()" >提交</button>
                </form>
            </div>
        </div>
    `,
    styles:[
        `
        .title{
            text-align: center;
        }
            .errorMsg{
                color: red;
            }
        `
    ]
})export  class RegisterComponent{

    private userName:string;
    private pwd:string;
    private pwdConfirm:string;
    private inputNameMsg:string;
    private inputPwdMsg:string;
    private isValidName:boolean;
    private isValidPwd:boolean;

    constructor(
      private httpServer:HttpService,
      private router:Router
    ){}

    isValidForm():boolean{
        if(!(this.userName&&this.pwd&&this.pwdConfirm)){
            return false;
        }else{
            return this.isValidName && this.isValidPwd;
        }

    }

    checkPwd(){
        if(this.pwd&&this.pwdConfirm){
            if(this.pwd===this.pwdConfirm){
                if(this.pwd.length<10){
                    this.inputPwdMsg="密码长度不能小于10个字符";
                    this.isValidPwd=false;
                }else{
                    this.inputPwdMsg='';
                    this.isValidPwd=true;
                }

            }else {
                this.inputPwdMsg="两次输入密码不相同";
                this.isValidPwd=false;
            }
        }
    }

    confirmUserName(userName:string){
        this.isValidName=true;
    }

    submit(){
        this.httpServer.register({name:this.userName,pwd:this.pwd})
            .then(msg=>{
                if(msg==="success"){
                    this.router.navigate(["login"]);
                }
            })
    }

}
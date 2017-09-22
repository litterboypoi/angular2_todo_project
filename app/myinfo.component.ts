/**
 * Created by shigure on 2017/5/29.
 */
import {Component, OnInit} from "@angular/core";
import {HttpService} from './http.service';
import { User } from './user';
import { Invitation } from './invitation';

@Component({
    templateUrl:'./myinfo.component.html',
    styleUrls:['./myinfo.component.css']
})export class MyInfoComponent implements OnInit{

    private me: User;

    constructor(
        private httpService:HttpService
    ){ }

    ngOnInit(){
        this.httpService.getMyInfo().then((data)=>{
            this.me=data;
        })
    }

    receive(invitation:Invitation){
        invitation.state=1;
        this.httpService.changeInvitation(invitation).then(data=>{
            for(let i=0;i<this.me.invitationList.length;i++){
                if(this.me.invitationList[i].invitationId===data.invitationId){
                    this.me.invitationList[i]=data;
                }
            }
        })
    }

    reject(invitation:Invitation){
        invitation.state=2;
        this.httpService.changeInvitation(invitation).then(data=>{
            for(let i=0;i<this.me.invitationList.length;i++){
                if(this.me.invitationList[i].invitationId===data.invitationId){
                    this.me.invitationList[i]=data;
                }
            }
        })
    }
}
import {Component, OnInit} from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    providers:[
        CookieService
    ]
})
export class AppComponent implements OnInit{

    private userId:number;

    constructor(
        private cookieService:CookieService,
        private router:Router
    ){}

    ngOnInit():void{
        if(this.getCookie("id")){
            this.userId = +this.getCookie("id");
        }else{
            this.router.navigate(["login"]);
        }
    }

    getCookie(key:string){
            return this.cookieService.get(key);
    }

    navigateToMyPage(){
        this.router.navigate(["mypage"]);
    }
 }

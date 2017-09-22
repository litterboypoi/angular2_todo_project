/**
 * Created by shigure on 2017/5/23.
 */
import {Component} from "@angular/core";
@Component({
    template:`

        <div class="row">
            <div class="col-sm-3">
                <projects></projects>
            </div>
            <div class="col-sm-9">
                <router-outlet></router-outlet>
            </div>
        </div>
        
    `
})export class ToDoPageComponent{}
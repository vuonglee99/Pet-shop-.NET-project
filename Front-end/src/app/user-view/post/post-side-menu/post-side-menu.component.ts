import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { Router } from '@angular/router';
import {UserViewModel} from '../../../shared/service-proxy.module';

@Component({
    selector: 'app-post-side-menu',
    templateUrl: 'post-side-menu.component.html'
})
export class PostSideMenuComponent extends AppComponentBase implements OnInit {

    @Input() active:string="";

    currentUser:UserViewModel;
    ngOnInit() {
        this.currentUser=this.sessionService.getItem("currentUser");
        console.log(this.currentUser);
    }


    constructor(
        injector: Injector,
        
    ) {
        super(injector);

    }

}
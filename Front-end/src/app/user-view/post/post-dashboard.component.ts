import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../shared/app-component-base';
import { POST,PostViewModel,PostsService,UserViewModel } from '../../shared/service-proxy.module';
import { Router } from '@angular/router';

@Component({
    selector: 'app-post-dashboard',
    templateUrl: 'post-dashboard.component.html'
})
export class PostDashboardComponent extends AppComponentBase implements OnInit {

    active:string;
    currentUser:UserViewModel;
    isBusy:boolean;
    currentUserAvatar:any="assets/img/user-icon.png";
    rows=12;

    //currentUser:UserViewModel;
    postList:PostViewModel[]=[];
    postInput:POST=new POST();

    postsOfPage:PostViewModel[]=[];
    totalPost:number=0;


    ngOnInit() {
        this.currentUser=this.sessionService.getItem("currentUser");
        if(this.currentUser.avartar==null ||this.currentUser.avartar=="") 
        {
            this.currentUser.avartar=this.currentUserAvatar;
        }
        this.titleService.setTitle("Bảng tin");
        this.getAllPosts();
    }

    constructor(
        injector: Injector,
        private postsService: PostsService,
    ) {
        super(injector);

    }

    getAllPosts(){
        this.isBusy=true;
        this.postsService.getAllPost(this.postInput).subscribe(res =>{
            this.isBusy=false;
            this.postList=res;
            this.postsOfPage = [];
            if (this.totalPost > this.rows) {
                for (var i = 0; i < this.rows; i++) {
                    this.postsOfPage.push(this.postList[i]);
                }
            } else {
                this.postsOfPage = this.postList;
            }
        });

    }
}
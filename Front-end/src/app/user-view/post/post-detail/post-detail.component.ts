import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { POST,PostViewModel,PostsService,UserViewModel } from '../../../shared/service-proxy.module';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-post-detail',
    templateUrl: 'post-detail.component.html'
})
export class PostDetailComponent extends AppComponentBase implements OnInit {

    currentUser:UserViewModel;
    currentPost:PostViewModel;
    postInput:POST=new POST();
    postID:any=null;
    commentContent:string=null;
   
    isBusy:boolean;

    ngOnInit() {
        this.currentUser=this.sessionService.getItem("currentUser");
        this.postID=parseInt(this.route.snapshot.paramMap.get('post_id'));
        this.titleService.setTitle("Chi tiết bài đăng");
        this.getPostByID();
    }

    constructor(
        injector: Injector,
        private postsService: PostsService,
        private route:ActivatedRoute
    ) {
        super(injector);

    }

    getPostByID(){
        this.isBusy=true;
        this.postsService.getById(this.postID).subscribe(res =>{
            this.isBusy=false;
            this.currentPost=res;
        });

    }

    addComment(event){
        if (event.keyCode == 13) {
            this.commentContent = null;
        }

    }
   
    

}
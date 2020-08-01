import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../shared/app-component-base';
import { POST, PostViewModel, PostsService, UserViewModel } from '../../shared/service-proxy.module';
import { Router } from '@angular/router';

@Component({
    selector: 'app-post-list',
    templateUrl: 'post-list.component.html'
})
export class PostListComponent extends AppComponentBase implements OnInit {

    @Input() postsOnRow: string;
    @Input() rows: number = 12;
    @Input() sortBy: string = null;
    @Input() isPaging: boolean = true;
    @Input() userID:any=null;

    currentUser: UserViewModel;
    postList: PostViewModel[] = [];
    postInput: POST = new POST();

    postsOfPage: PostViewModel[] = [];
    totalPost: number = 0;
    isBusy: boolean;
    indexShow: number = -1;
    isEmpty:boolean=true;

    content: string = null;

    isShowComment
    ngOnInit() {
        this.currentUser = this.sessionService.getItem("currentUser");
        if(this.userID!=null){
            this.getPostByID();
        }else this.getAllPosts();
       
    }

    constructor(
        injector: Injector,
        private postsService: PostsService,
    ) {
        super(injector);

    }

    getAllPosts() {
        this.isBusy = true;
        this.postInput.status=1;
        this.postsService.getAllPost(this.postInput).subscribe(res => {
            this.isBusy = false;
            this.postList = res;
            this.totalPost=this.postList.length;
            (this.totalPost ==0) ? this.isEmpty=true:this.isEmpty=false;
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

    getPostByID(){
        this.isBusy = true;
        this.postsService.getAllPostByUserId(this.userID).subscribe(res => {
            this.isBusy = false;
            this.postList = res;
            this.totalPost=this.postList.length;
            (this.totalPost ==0) ? this.isEmpty=true:this.isEmpty=false;
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

    paginate(event) {
        var x = event.first;
        this.postsOfPage = [];
        if ((x + this.rows) > this.totalPost) {
            for (var i = x; i < this.totalPost; i++) {
                this.postsOfPage.push(this.postList[i]);
            }
        } else {
            for (var i = x; i < this.rows + x; i++) {
                this.postsOfPage.push(this.postList[i]);
            }
        }
    }

    addComment(event) {
        if (event.keyCode == 13) {
            this.content = null;
        }

    }

    showComment(index: number) {
        (this.indexShow!=index)? this.isShowComment=true:this.isShowComment = !this.isShowComment;
        this.indexShow = index;
        
    }
}
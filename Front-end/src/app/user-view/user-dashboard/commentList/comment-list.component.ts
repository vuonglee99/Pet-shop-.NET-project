import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { CommentsService, CommentViewModel, COMMENT} from '../../../shared/service-proxy.module';
import { Router,ActivatedRoute } from '@angular/router';



@Component({
    selector: 'app-comment-list',
    templateUrl: 'comment-list.component.html'
})
export class CommentListComponent extends AppComponentBase implements OnInit {

    //liên quan đến product
    @Input() productID:number=0;//id của cate hiện tại
    
    //comment
    commentList: CommentViewModel[] = [];
    totalComment:number=0;
    newCommentInput:COMMENT=new COMMENT();

    isBusy: boolean = false;
   isEmpty:boolean=true;
    
    ngOnInit() {
        this.getAllProductComments();
      }

    constructor(
        injector: Injector, 
        private route:ActivatedRoute,
        private commentsService: CommentsService,
    ) {
        super(injector);
        
    }

    getAllProductComments() {
        this.isBusy = true;
        this.commentsService.getAllByProductId(this.productID).subscribe(res => {
            this.isBusy = false;
            this.commentList = res;
            if (this.commentList.length == 0) {
                this.isEmpty = true;
            } else {
                this.isEmpty = false;
                this.totalComment=this.commentList.length;
            }
        })
    }
}

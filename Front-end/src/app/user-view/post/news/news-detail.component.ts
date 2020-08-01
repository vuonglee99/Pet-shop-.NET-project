import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { NEWS,NewsService,NewsViewModel, UserViewModel } from '../../../shared/service-proxy.module';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-news-detail',
    templateUrl: 'news-detail.component.html'
})
export class NewsDetailComponent extends AppComponentBase implements OnInit {

    currentUser: UserViewModel;
    newsInput: NEWS = new NEWS();
    currentNews:NewsViewModel;
    newsID:any=null;
    commentContent:string=null;
    
    isBusy: boolean;
    ngOnInit() {
        this.currentUser = this.sessionService.getItem("currentUser");
        this.newsID=this.route.snapshot.paramMap.get("news_id");
        this.titleService.setTitle("Chi tiết");
        this.getNewsByID();
    }

    constructor(
        injector: Injector,
        private newsService: NewsService,
        private route:ActivatedRoute,
    ) {
        super(injector);

    }

    getNewsByID() {
        this.isBusy = true;
        this.newsService.getById(this.newsID).subscribe(res => {
            this.isBusy = false;
            this.currentNews = res;
            
        });

    }

    addComment(event){
        if (event.keyCode == 13) {
            this.commentContent = null;
        }

    }

}
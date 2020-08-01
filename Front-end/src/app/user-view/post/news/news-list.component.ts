import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { NEWS,NewsService,NewsViewModel, UserViewModel } from '../../../shared/service-proxy.module';
import { Router } from '@angular/router';

@Component({
    selector: 'app-news-list',
    templateUrl: 'news-list.component.html'
})
export class NewsListComponent extends AppComponentBase implements OnInit {

    @Input() newsOnRow: string;
    @Input() rows: number = 12;
    @Input() sortBy: string = null;
    @Input() isPaging: boolean = true;

    currentUser: UserViewModel;
    newsList: NewsViewModel[] = [];
    newsInput: NEWS = new NEWS();

    newsOfPage: NewsViewModel[] = [];
    totalNews: number = 0;
    isBusy: boolean;
    indexShow: number = -1;

    content: string = null;

    isShowComment
    ngOnInit() {
        this.currentUser = this.sessionService.getItem("currentUser");
        this.titleService.setTitle("Tin tức");
        this.getAllNews();
    }

    constructor(
        injector: Injector,
        private newsService: NewsService,
    ) {
        super(injector);

    }

    getAllNews() {
        this.isBusy = true;
        this.newsService.getAll(this.newsInput).subscribe(res => {
            this.isBusy = false;
            this.newsList = res;
            this.totalNews=this.newsList.length;
            this.newsOfPage = [];
            if (this.totalNews > this.rows) {
                for (var i = 0; i < this.rows; i++) {
                    this.newsOfPage.push(this.newsList[i]);
                }
            } else {
                this.newsOfPage = this.newsList;
            }
        });

    }

    paginate(event) {
        var x = event.first;
        this.newsOfPage = [];
        if ((x + this.rows) > this.totalNews) {
            for (var i = x; i < this.totalNews; i++) {
                this.newsOfPage.push(this.newsList[i]);
            }
        } else {
            for (var i = x; i < this.rows + x; i++) {
                this.newsOfPage.push(this.newsList[i]);
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
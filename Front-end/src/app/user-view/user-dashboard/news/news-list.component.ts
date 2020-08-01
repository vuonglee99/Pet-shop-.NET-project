import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { NewsService, NewsViewModel,NEWS} from '../../../shared/service-proxy.module';
import { Router } from '@angular/router';

@Component({
    selector: 'app-news-list',
    templateUrl: 'news-list.component.html'
})
export class NewsListComponent extends AppComponentBase implements OnInit {

    @Input() dateCreated:any;
    newsInput:NEWS=new NEWS();
    newsList:NewsViewModel[]=[];

    isBusy: boolean = false;
   

    ngOnInit() {
        this.getAllNews();
    }

    constructor(
        injector: Injector, 
        private newsService:NewsService
    ) {
        super(injector);
        
    }
  

    getAllNews(){
        console.log(this.dateCreated);
        if(this.newsInput.dateCreated!=""){
            this.newsInput.dateCreated=this.dateCreated;
        }else{
            this.dateCreated=null;
        }
        this.isBusy=true;
        this.newsService.getAll(this.newsInput).subscribe(res =>{
            this.isBusy=false;
            this.newsList=res;
            console.log(this.newsList);
        });
    }
    

}

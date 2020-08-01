import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppComponentBase } from '../../shared/app-component-base';
import { UsersService, NewsService, NewsViewModel, NEWS } from '../../shared/service-proxy.module';
import { UserContextService } from '../../core/services/user-context.service';
import { Router } from '@angular/router'
import { LazyLoadEvent, SortEvent } from 'primeng/api';

@Component({
    selector: 'app-admin-news',
    templateUrl: 'admin-news.component.html'
})
export class AdminNewsComponent extends AppComponentBase implements OnInit {

    newsInput: NEWS = new NEWS();
    newsList: NewsViewModel[] = [];
    selectedNews: NewsViewModel;
    cols: any[];

    isBusy: boolean = false;
    totalNews:number=0;
    dateInput:any=null;
    ngOnInit() {
        this.cols = [
            { field: 'id', header: 'Mã bài thông báo' },
            { field: 'dateCreated', header: 'Ngày thông báo' },
            { field: 'tittle', header: 'Tiêu đề' },
        ];
        this.getAllNews();

    }

    constructor(
        injector: Injector,
        private userService: UsersService,
        private newsService: NewsService
    ) {
        super(injector);

    }

    getAllNews() {
        this.isBusy = true;
        this.newsInput.dateCreated=this.getDate(this.dateInput);
        this.newsService.getAll(this.newsInput).subscribe(res => {
            this.isBusy = false;
            this.newsList = res;
            this.totalNews=this.newsList.length;
        });
    }

    viewDetail() {
        if (typeof this.selectedNews !== 'undefined') {
            this.router.navigate(['/admin/news/' + this.selectedNews.id]);
        }
    }

    addNew(){
        this.router.navigate(['/admin/news/add']);
    }

    onRowSelect(event) {
        this.selectedNews = event.data;

    }
    customSort(event: SortEvent) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (event.order * result);
        });
    }

    deleteNews() {
        this.isBusy = true;
        this.newsService.delete(this.selectedNews.id).subscribe(res => {
            this.isBusy = false;
            this.getAllNews();
        });
    }

    confirm() {
        if (typeof this.selectedNews !== 'undefined') {
            this.confirmationService.confirm({
                message: 'Bạn có muốn xóa bài đăng đã chọn không?',
                accept: () => {
                    this.deleteNews();
                }
            });
        }
    }

    getDate(dateInput: any): string {
        if (dateInput != null) {
          let d = new Date(Date.parse(dateInput));
          var dd = (d.getDate() < 10) ? dd = '0' + d.getDate() : dd = d.getDate();
          var mm = ((d.getMonth() + 1) < 10) ? mm = '0' + (d.getMonth() + 1) : mm = (d.getMonth() + 1);
          var yyyy = d.getFullYear();
          let myDate = dd + "/" + mm + "/" + yyyy;
          return String(myDate);
        } else return "";
      }
}
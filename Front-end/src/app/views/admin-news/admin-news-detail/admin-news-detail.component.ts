import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppComponentBase } from '../../../shared/app-component-base';
import { NewsService, NewsViewModel, NEWS } from '../../../shared/service-proxy.module';
import { Router, ActivatedRoute } from '@angular/router'
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";

@Component({
    selector: 'app-admin-news-detail',
    templateUrl: 'admin-news-detail.component.html'
})
export class AdminNewsDetailComponent extends AppComponentBase implements OnInit {

    newsInput: NEWS = new NEWS();
    news: NewsViewModel;
    newsForm: FormGroup;
    image: any = null;
    title = "cloudsSorage";
    selectedFile: File = null;
    downloadURL: Observable<string>;
    editNewsInput: NEWS = new NEWS();

    isBusy: boolean = false;
    displayModal: boolean = false;
    imgURL: any;
    isEdit: boolean = false;
    ngOnInit() {
        this.newsInput.id = parseInt(this.route.snapshot.paramMap.get("news_id"));
        this.getNewsByID();
    }

    constructor(
        injector: Injector,
        private newsService: NewsService,
        private storage: AngularFireStorage,
        private route: ActivatedRoute,
    ) {
        super(injector);
        this.newsForm = this.formBuilder.group({
            'tittle': new FormControl('', [Validators.required, Validators.minLength(10)]),
            'content': new FormControl('', [Validators.required, Validators.minLength(10)]),
        });
    }

    getNewsByID() {
        this.isBusy = true;
        this.newsService.getById(this.newsInput.id).subscribe(res => {
            this.isBusy = false;
            this.news = res;
            for (var property in this.news) {
                this.editNewsInput[property] = this.news[property];
            }
        });
    }

    updateNews() {
        this.isBusy = true;
        if (this.image != null) {
            var n = Date.now();
            const filePath = `news/${n}`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(`news/${n}`, this.image);
            task
                .snapshotChanges()
                .pipe(
                    finalize(() => {
                        this.downloadURL = fileRef.getDownloadURL();
                        this.downloadURL.subscribe(url => {
                            if (url) {
                                this.editNewsInput.imageURL = url;
                                this.newsService.update(this.editNewsInput).subscribe(res => {
                                    this.isBusy = false;
                                    if (res != null) {
                                        this.toastService.addSingle('success', '', 'Đăng bài thành công!');
                                        this.getNewsByID();
                                    } else {
                                        this.toastService.addSingle('error', '', 'Đăng bài thất bại!')
                                    }
                                });
                            }
                        });
                    })
                )
                .subscribe(url => {
                    if (url) {
                        this.imgURL = url;
                    }
                });
        } else {
            console.log(this.editNewsInput);
            this.newsService.update(this.editNewsInput).subscribe(res => {
                this.isBusy = false;
                if (res != null) {
                    this.toastService.addSingle('success', '', 'Đăng bài thành công!');
                    this.getNewsByID();
                } else {
                    this.toastService.addSingle('error', '', 'Đăng bài thất bại!')
                }
            });
        }
    }

    confirm() {
        if (this.newsForm.valid) {
            this.confirmationService.confirm({
                message: 'Bạn chắc muốn lưu thay đổi không?',
                accept: () => {
                    this.updateNews();
                }
            });
        } else this.displayModal = true;
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

    onFileSelected(event) {
        for (let file of event.files) {
            this.image = file;
        }
    }

    refresh() {
        this.editNewsInput = new NEWS();
        this.isEdit = false;
    }

    editorInit(event) {
        const quill = event.editor;
        const toolbar = quill.getModule('toolbar');
        toolbar.addHandler('image', () => {
            const range = quill.getSelection();
            const value = prompt('What is the image URL');

            quill.insertEmbed(range.index, 'image', value, '');
        });
    }

    deleteNews() {
        this.isBusy = true;
        this.newsService.delete(this.news.id).subscribe(res => {
            this.isBusy = false;
            if (res == true) {
                this.router.navigate(['/admin/news/']);
            }
        })
    }

    checkEdit() {
        this.isEdit = true;
        for (var property in this.news) {
            this.editNewsInput[property] = this.news[property];
        }
    }
}
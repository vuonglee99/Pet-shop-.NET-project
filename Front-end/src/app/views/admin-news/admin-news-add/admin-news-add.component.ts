import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppComponentBase } from '../../../shared/app-component-base';
import { UsersService, NewsService, NewsViewModel, NEWS } from '../../../shared/service-proxy.module';
import { UserContextService } from '../../../core/services/user-context.service';
import { Router } from '@angular/router'
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";

@Component({
  selector: 'app-admin-news-add',
  templateUrl: 'admin-news-add.component.html'
})
export class AdminNewsAddComponent extends AppComponentBase implements OnInit {

  newsInput: NEWS = new NEWS();
  newsForm: FormGroup;
  image: any = null;
  title = "cloudsSorage";
  selectedFile: File = null;
  downloadURL: Observable<string>;

  isBusy: boolean = false;
  displayModal: boolean = false;
  imgURL: any;
  ngOnInit() {


  }

  constructor(
    injector: Injector,
    private userService: UsersService,
    private newsService: NewsService,
    private storage: AngularFireStorage
  ) {
    super(injector);
    this.newsForm = this.formBuilder.group({
      'tittle': new FormControl('', [Validators.required, Validators.minLength(10)]),
      'content': new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }

  addNews() {
    this.isBusy = true;
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
              let date = new Date();
              this.newsInput.dateCreated = this.getDate(date);
              this.newsInput.imageURL = url;
              console.log(this.newsInput);
              this.newsService.create(this.newsInput).subscribe(res => {
                this.isBusy = false;
                if (res != null) {
                  this.toastService.addSingle('success', '', 'Đăng bài thành công!');
                } else {
                  this.toastService.addSingle('error', '', 'Đăng bài thất bại!')
                }
              })
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          this.imgURL = url;
        }
      });
  }

  confirm() {
    if (this.newsForm.valid && this.image!=null) {
      this.confirmationService.confirm({
        message: 'Bạn có muốn thêm thông báo mới không?',
        accept: () => {
          this.addNews();
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
    this.newsInput = new NEWS();
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
}
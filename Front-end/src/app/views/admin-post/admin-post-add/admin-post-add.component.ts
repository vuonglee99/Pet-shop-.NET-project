import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppComponentBase } from '../../../shared/app-component-base';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService, PostViewModel, POST, NotificationsService, NOTIFICATION,UserViewModel } from '../../../shared/service-proxy.module';
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
    selector: 'app-admin-post-add',
    templateUrl: 'admin-post-add.component.html'
})
export class AdminPostAddComponent extends AppComponentBase implements OnInit {

    newPostForm: FormGroup;
    newPostInput:POST=new POST();
    image: any = null;
    title = "cloudsSorage";
    selectedFile: File = null;
    downloadURL: Observable<string>;
    currentUser:UserViewModel;

    isBusy: boolean = false;
    imgURL: any;
    displayModal:boolean=false;
    ngOnInit() {
        this.currentUser=this.sessionService.getItem("currentUser");
        console.log(this.currentUser);
        var date=new Date();
        this.newPostInput.createdTime=this.getDate(date);
        this.newPostInput.userId=this.currentUser.id;
        this.newPostInput.status=1;
    }

    constructor(
        injector: Injector,
        private postService: PostsService,
        private notificationService: NotificationsService,
        private route: ActivatedRoute,
        private storage: AngularFireStorage

    ) {
        super(injector);
        this.newPostForm=this.formBuilder.group({
            'tittle':new FormControl('',[Validators.required,Validators.minLength(10)]),
            'content':new FormControl('',[Validators.required,Validators.minLength(10)]),
        })
    }


   addNewPost(){
    if (this.newPostForm.valid && this.image!=null) {
        this.isBusy = true;
        var n = Date.now();
        const filePath = `posts/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`posts/${n}`, this.image);
        task
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    this.downloadURL = fileRef.getDownloadURL();
                    this.downloadURL.subscribe(url => {
                        if (url) {
                            let date=new Date();
                            this.newPostInput.createdTime=this.getDate(date);
                            this.newPostInput.imageURL = url;
                            console.log(this.newPostInput);
                            this.postService.create(this.newPostInput).subscribe(res => {
                                this.isBusy = false;
                                if (res !=null) {
                                    this.toastService.addSingle('success','','Đăng bài thành công!');
                                }else{
                                    this.toastService.addSingle('error','','Đăng bài thất bại!')
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

    confirm() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc muốn thêm mới bài đăng không?',
            accept: () => {
                this.addNewPost();
            }
        });
    }
    
    onFileSelected(event) {
        for (let file of event.files) {
            this.image = file;
        }
    }

    refresh(){
        this.newPostInput=new POST();
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

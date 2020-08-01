import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppComponentBase } from '../../../shared/app-component-base';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService, PostViewModel, POST, NotificationsService, NOTIFICATION, UserViewModel } from '../../../shared/service-proxy.module';
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";


@Component({
    selector: 'app-admin-post-detail',
    templateUrl: 'admin-post-detail.component.html'
})
export class AdminPostDetailComponent extends AppComponentBase implements OnInit {

    postInput: POST = new POST();
    notificationForm: FormGroup;
    editPostForm:FormGroup;
    notificationInput: NOTIFICATION = new NOTIFICATION();
    post: PostViewModel = new PostViewModel();
    currentUser: UserViewModel;
    editPostInput:POST=new POST();
    image: any = null;
    title = "cloudsSorage";
    selectedFile: File = null;
    downloadURL: Observable<string>;
    imgURL:any=null;

    isBusy: boolean = false;
    displayModal: boolean = false;
    isEdit: boolean = false;
    isMaker: boolean = false;
    isUnActivate:boolean=false;
    ngOnInit() {
        this.currentUser = this.sessionService.getItem("currentUser");
        this.postInput.id = parseInt(this.route.snapshot.paramMap.get("post_id"));
        this.getPostByID();
    }

    constructor(
        injector: Injector,
        private postService: PostsService,
        private notificationService: NotificationsService,
        private route: ActivatedRoute,
        private storage: AngularFireStorage

    ) {
        super(injector);
        this.notificationForm = this.formBuilder.group({
            'tittle': new FormControl('', [Validators.required, Validators.minLength(5)]),
            'message': new FormControl('', [Validators.required, Validators.minLength(10)]),
        });
        this.editPostForm=this.formBuilder.group({
            'tittle':new FormControl('',[Validators.required,Validators.minLength(10)]),
            'content':new FormControl('',[Validators.required,Validators.minLength(10)]),
        })
    }


    getPostByID() {
        this.isBusy = true;
        this.postService.getById(this.postInput.id).subscribe(res => {
            this.isBusy = false;
            this.post = res;
            for(var property in this.post){
                this.editPostInput[property]=this.post[property];
            }

            if (this.post.userId == this.currentUser.id) this.isMaker = true;
            if(this.post.status==0) this.isUnActivate=true;
            else this.isUnActivate=false;
        })
    }

    activePost() {
        this.isBusy = true;
        this.postService.activePost(this.post.id).subscribe(res => {
            this.isBusy = false;
            if (res == true) {
                this.getPostByID();
            }
        })
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
            message: 'Bạn có muốn xóa bài đăng đã chọn không?',
            accept: () => {
                this.addNotification();
            }
        });
    }

    setNewNotification() {
        this.notificationInput.status = 0;
        this.notificationInput.from = this.currentUser.id;
        let date = new Date();
        this.notificationInput.dateCreated = this.getDate(date);
        this.notificationInput.message = "";
        this.notificationInput.tittle = "";
        this.notificationInput.to = "";
    }

    addNotification() {
        this.isBusy = true;
        this.notificationService.create(this.notificationInput).subscribe(res => {
            this.isBusy = false;
            if (res != null) {
                this.setNewNotification();
                this.deletePost();
            }
        })
    }

    checkDelete() {
        if (this.isMaker == false) {
            this.displayModal = true;
            this.setNewNotification();
            this.notificationInput.to = this.post.userId;
        } else this.deletePost();

    }

    deletePost() {
        this.isBusy = true;
        this.postService.delete(this.post.id).subscribe(res => {
            this.isBusy = false;
            this.router.navigate(['admin/post/']);
        });
    }

    refresh(){
        this.isEdit=false;
        this.editPostInput=new POST();
        for(var property in this.post){
            this.editPostInput[property]=this.post[property];
        }
    }

    onFileSelected(event) {
        for (let file of event.files) {
            this.image = file;
        }
    }

    updateProduct() {
        this.isBusy = true;
        var n = Date.now();
        const filePath = `posts/${n}`;
        const fileRef = this.storage.ref(filePath);
       
        if (this.image != null) {
            if (this.editPostInput.imageURL) {
                this.deleteImage(this.editPostInput.imageURL);
            }
            const task = this.storage.upload(`posts/${n}`, this.image);
            task
                .snapshotChanges()
                .pipe(
                    finalize(() => {
                        this.downloadURL = fileRef.getDownloadURL();
                        this.downloadURL.subscribe(url => {
                            if (url) {
                                this.editPostInput.imageURL = url;
                                console.log(this.editPostInput.imageURL);
                                console.log(this.editPostInput);
                                this.postService.update(this.editPostInput).subscribe(res => {
                                    this.isBusy = false;
                                    if (res == true) {
                                        this.image = null;
                                        this.getPostByID();
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
        }else
        {
            this.postService.update(this.editPostInput).subscribe(res => {
                this.isBusy = false;
                if (res == true) {
                    this.image = null;
                    this.getPostByID();
                }
            })
        }
    }

    deleteImage(url) {
        return this.storage.storage.refFromURL(url).delete();
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

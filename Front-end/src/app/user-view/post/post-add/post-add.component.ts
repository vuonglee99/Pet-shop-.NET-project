import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { POST, PostViewModel, PostsService, UserViewModel } from '../../../shared/service-proxy.module';
import { Router } from '@angular/router';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-post-add',
    templateUrl: 'post-add.component.html'
})
export class PostAddComponent extends AppComponentBase implements OnInit {

    newPostForm: FormGroup;
    currentUser: UserViewModel;
    newPostInput: POST = new POST();
    image: any = null;
    title = "cloudsSorage";
    selectedFile: File = null;
    downloadURL: Observable<string>;

    isBusy: boolean;
    imgURL: any;

    ngOnInit() {
        this.currentUser = this.sessionService.getItem("currentUser");
        this.newPostInput.createdTime = this.getDate(new Date());
        this.newPostInput.userId = this.currentUser.id;
        this.newPostInput.status = 0;
        this.titleService.setTitle("Đăng bài");
    }

    constructor(
        injector: Injector,
        private postsService: PostsService,
        private storage: AngularFireStorage
    ) {
        super(injector);
        this.newPostForm = this.formBuilder.group({
            'tittle': new FormControl('', [Validators.required, Validators.minLength(10)]),
            'content': new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(4000)]),
        });

    }

    addNewPost() {
        if (this.newPostForm.valid && this.image != null) {
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
                                let date = new Date();
                                this.newPostInput.createdTime = this.getDate(date);
                                this.newPostInput.imageURL = url;
                                console.log(this.newPostInput);
                                this.postsService.create(this.newPostInput).subscribe(res => {
                                    this.isBusy = false;
                                    if (res != null) {
                                        this.toastService.addSingle('success', '', 'Đăng bài thành công!');
                                        this.redirectTo('/post/','');
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
    }

    onFileSelected(event) {
        for (let file of event.files) {
            this.image = file;
        }
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
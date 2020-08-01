import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { POST, PostViewModel, PostsService, UserViewModel } from '../../../shared/service-proxy.module';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-post',
    templateUrl: 'my-post.component.html'
})
export class MyPostComponent extends AppComponentBase implements OnInit {
    currentUser: UserViewModel;

    isBusy: boolean;
    ngOnInit() {
        this.currentUser = this.sessionService.getItem("currentUser");
        this.titleService.setTitle("Bài đăng của tôi")
    }

    constructor(
        injector: Injector,
        private postsService: PostsService,
    ) {
        super(injector);

    }
}
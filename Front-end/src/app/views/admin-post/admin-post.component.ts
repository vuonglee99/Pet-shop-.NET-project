import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppComponentBase } from '../../shared/app-component-base';
import { LoginRequest, UsersService, NotificationsService, NOTIFICATION,UserViewModel } from '../../shared/service-proxy.module';
import { UserContextService } from '../../core/services/user-context.service';
import { Router } from '@angular/router';
import { PostsService, PostViewModel, POST } from '../../shared/service-proxy.module';
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-admin-post',
  templateUrl: 'admin-post.component.html'
})
export class AdminPostComponent extends AppComponentBase implements OnInit {

  postInput: POST = new POST();
  postList: PostViewModel[] = [];
  selectedPost: PostViewModel;
  cols: any[];
  dateInput: any = null;
  notificationInput: NOTIFICATION = new NOTIFICATION();
  notificationForm: FormGroup;
  currentUser:UserViewModel;


  isBusy: boolean = false;
  displayModal: boolean = false;
  totalPosts: number = 0;
  status: any = null;
  ngOnInit() {
    this.currentUser=this.sessionService.getItem("currentUser");
    this.cols = [
      { field: 'id', header: 'Mã bài đăng' },
      { field: 'tittle', header: 'Tiêu đề' },
      { field: 'createdTime', header: 'Thời gian tạo' },
      { field: 'viewCount', header: 'Số lượt xem' },
      { field: 'status', header: 'Trạng thái' },
    ];
    this.getAllPosts();
    this.setNewNotification();
  }

  constructor(
    injector: Injector,
    private postService: PostsService,
    private notificationService: NotificationsService

  ) {
    super(injector);
    this.notificationForm = this.formBuilder.group({
      'tittle': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'message': new FormControl('', [Validators.required, Validators.minLength(10)]),
    })
  }

  viewDetail() {
    if (typeof this.selectedPost !== 'undefined') {
      this.router.navigate(['/admin/post/' + this.selectedPost.id]);
    }
  }

  addNew() {
    this.router.navigate(['/admin/post/add']);
  }

  deletePost() {
    this.isBusy = true;
    this.postService.delete(this.selectedPost.id).subscribe(res => {
      this.isBusy = false;
    })
  }

  getAllPosts() {
    this.isBusy = true;
    switch (this.status) {
      case '1':
        this.postInput.status = 1;
        break;
      case '0':
        this.postInput.status = 0;
        break;
      default:
        this.postInput.status = null;
        break
    }
    this.postInput.createdTime = this.getDate(this.dateInput);
    this.postService.getAllPost(this.postInput).subscribe(res => {
      this.isBusy = false;
      this.postList = res;
      this.totalPosts = this.postList.length;
    })
  }

  onRowSelect(event) {
    this.selectedPost = event.data;
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
    this.notificationInput.to=this.selectedPost.userId;
    this.notificationService.create(this.notificationInput).subscribe(res => {
      this.isBusy = false;
      if (res != null) {
        this.setNewNotification();
        this.deletePost();
      }
    })
  }

  checkDelete() {

    if (typeof this.selectedPost !== 'undefined') {
      this.displayModal = true;
      this.setNewNotification();
      this.notificationInput.to = this.selectedPost.userId;
    }
  }


}

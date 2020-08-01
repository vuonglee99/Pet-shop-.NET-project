import { Component,OnInit,Injector,ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {AppComponentBase} from  '../../../shared/app-component-base';
import {UsersService,APPUSER,UserViewModel,OrdersService,OrderViewModel,
    PostsService,PostViewModel,NotificationsService, NOTIFICATION} from '../../../shared/service-proxy.module';
import { UserContextService } from '../../../core/services/user-context.service';
import {Router} from '@angular/router'
import { LazyLoadEvent,SortEvent } from 'primeng/api';
import { Route, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-user-detail',
  templateUrl: 'admin-user-detail.component.html'
})
export class AdminUserDetailComponent extends AppComponentBase implements OnInit {

    userID:any;
    user:UserViewModel;
    orderList:OrderViewModel[]=[];
    userAvatar:any="https://visualpharm.com/assets/387/Person-595b40b75ba036ed117da139.svg";
    notificationInput: NOTIFICATION = new NOTIFICATION();
    notificationForm: FormGroup;
    currentUser:UserViewModel;

    isBusy:boolean=false;
    isNoOrder:boolean=false;
    totalOrder:number=0;
    orderRevenue:number=0;
    totalPost:number=0;
    displayModal:boolean=false;
    ngOnInit(){
        this.currentUser=this.sessionService.getItem("currentUser");
        this.userID = this.route.snapshot.paramMap.get("user_id");
        this.getUserById();
        this.getAllOrdersByUserId();
        this.getAllPostsByUserID();
        this.setNewNotification();
    }

    constructor(
        injector:Injector,
        private userService:UsersService,
        private userContextService:UserContextService,
        private route: ActivatedRoute,
        private orderService:OrdersService,
        private postService:PostsService,
        private notificationService:NotificationsService
      ){
        super(injector);
        this.notificationForm = this.formBuilder.group({
            'tittle': new FormControl('', [Validators.required, Validators.minLength(5)]),
            'message': new FormControl('', [Validators.required, Validators.minLength(10)]),
          });
        
    }

    getUserById(){

        this.isBusy=true;
        this.userService.getById(this.userID).subscribe(res =>{
            this.isBusy=false;
            this.user=res;
            if(this.user.avartar!=null) this.userAvatar=this.user.avartar;
            this.notificationInput.to = this.user.id;
        })
    }

    sendNotification(){
        
    }

    getAllOrdersByUserId(){
        this.isBusy=true;
        this.orderService.getAllByUserId(this.userID).subscribe(res =>{
            this.isBusy=false;
            this.orderList=res;
            if(this.orderList.length!=0) 
            {
                this.totalOrder=this.orderList.length;
                for(var i=0;i<this.orderList.length;i++){
                    this.orderRevenue+=this.orderList[i].total;
                }
            }

        });
    }

    getAllPostsByUserID(){
        this.isBusy=true;
        this.postService.getAllPostByUserId(this.userID).subscribe(res =>{
            this.isBusy=false;
            this.totalPost=res.length;
        })
    }

    setNewNotification() {
        this.notificationInput.status = 0;
        this.notificationInput.from = this.currentUser.id;
        let date = new Date();
        this.notificationInput.dateCreated = this.getDate(date);
        this.notificationInput.message = "";
        this.notificationInput.tittle = "";
        
      }
    
      addNotification() {
        this.isBusy = true;
        this.notificationService.create(this.notificationInput).subscribe(res => {
          this.isBusy = false;
          if (res != null) {
            this.setNewNotification();
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
}
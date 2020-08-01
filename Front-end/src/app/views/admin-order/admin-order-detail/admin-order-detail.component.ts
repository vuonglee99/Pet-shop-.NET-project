import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppComponentBase } from '../../../shared/app-component-base';
import { LoginRequest, UsersService, OrderDetailViewModel, NotificationsService, NOTIFICATION, UserViewModel } from '../../../shared/service-proxy.module';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService, ORDER, OrderViewModel } from '../../../shared/service-proxy.module';
import { OrderStatus } from '../../../core/models/orderStatus';
import { SelectItem } from 'primeng/api';



@Component({
  selector: 'app-admin-order-detail',
  templateUrl: 'admin-order-detail.component.html'
})
export class AdminOrderDetailComponent extends AppComponentBase implements OnInit {

  orderInput: ORDER = new ORDER();
  order: OrderViewModel;
  orderDetailList: OrderDetailViewModel[] = [];
  typeItems: SelectItem[] = [];
  notificationForm: FormGroup;
  notificationInput: NOTIFICATION = new NOTIFICATION();
  currentUser: UserViewModel;

  totalProducts: number = 0;
  isBusy: boolean = false;
  isCancel: boolean = false;
  orderFinalTotal: number = 0;
  displayModal2:boolean=false;
  orderProcessing:number=0;
  isEditOrder:boolean=false;
  displayModal:boolean=false;
  isSuccess:boolean=false;
  displayModal3:boolean=false;
  ngOnInit() {
    for (var enumMember in OrderStatus) {
      var isValueProperty = parseInt(enumMember, 10) >= 0
      if (isValueProperty) {
        this.typeItems.push({ label: OrderStatus[enumMember], value: OrderStatus[enumMember] });
      }
    };
    console.log(this.typeItems);
    this.currentUser = this.sessionService.getItem("currentUser");
    this.orderInput.id = parseInt(this.route.snapshot.paramMap.get("order_id"));
    this.getOrderById();
    this.getOrderDetail();
    this.setNewNotification();
    
  }

  constructor(
    injector: Injector,
    private userService: UsersService,
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private notificationService: NotificationsService
  ) {
    super(injector);
    this.notificationForm = this.formBuilder.group({
      'tittle': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'message': new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }

  getOrderById() {
    this.isBusy = true;
    this.orderService.getById(this.orderInput.id).subscribe(res => {
      this.isBusy = false;
      this.order = res;
      this.orderFinalTotal = this.order.total + 20000;
      this.notificationInput.to=this.order.userId;
      for(var i=0;i<this.typeItems.length;i++){
        if(this.order.status==this.typeItems[i].label){
          this.orderProcessing=(i+1)*25;
        }
      }
      if(this.order.status==this.typeItems[this.typeItems.length-1].label) {
        this.isCancel=true;
      }else if(this.order.status==this.typeItems[this.typeItems.length-2].label){
        this.isSuccess=true;
      }
      else this.isCancel=false;
      this.typeItems.pop();
    });
  }

  getOrderDetail() {
    this.isBusy = true;
    this.orderService.getDetails(this.orderInput.id).subscribe(res => {
      this.isBusy = false;
      this.orderDetailList = res;
      this.totalProducts = this.orderDetailList.length;
    });
  }

  updateOrder() {
    if (this.isCancel == false) {
      this.isBusy = true;
      this.orderService.updateStatus(this.orderInput).subscribe(res => {
        this.isBusy = false;
        if (res == true) {
          this.getOrderById();
          this.getOrderDetail();
        }
      });
    }else this.displayModal2=true;
  }

  confirm() {
    this.displayModal=false;
    this.confirmationService.confirm({
      message: 'Bạn có muốn hủy đơn hàng đã chọn không?',
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
  cancelOrder() {
    if (this.isCancel == false) {
      this.isBusy = true;
      this.orderInput.status = this.typeItems.pop().value;
      this.orderService.updateStatus(this.orderInput).subscribe(res => {
        this.isBusy = false;
        if (res == true) {
          this.isCancel = true;
          this.getOrderById();
        }
      });
    }else this.displayModal2=true;
  }

  addNotification() {
    this.isBusy = true;
    this.notificationService.create(this.notificationInput).subscribe(res => {
      this.isBusy = false;
      if (res != null) {
        this.cancelOrder();
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

  setOrderProcessing(event){
    this.orderProcessing=0;
    for(var i=0;i<this.typeItems.length;i++){
      if(event.value==this.typeItems[i].label){
        this.orderProcessing=(i+1)*25;
      }
    }
  }

  checkEdit(){
    if(this.isCancel==false&&this.isSuccess==false){
      this.isEditOrder=true;
    }else if(this.isCancel==true) this.displayModal2=true;
    else this.displayModal3=true;
   
    
  }
}

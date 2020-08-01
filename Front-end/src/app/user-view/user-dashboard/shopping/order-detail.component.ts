import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import {UserViewModel,ORDER,OrdersService, OrderViewModel,OrderDetailViewModel,
NOTIFICATION,NotificationsService} from '../../../shared/service-proxy.module';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {OrderStatus} from '../../../core/models/orderStatus';
import { SelectItem } from 'primeng/api';



@Component({
    selector: 'app-order-detail',
    templateUrl: 'order-detail.component.html'
})
export class OrderDetailComponent extends AppComponentBase implements OnInit {

   orderInput:ORDER=new ORDER();
   orderProductList:OrderDetailViewModel[]=[];
   currentUser:UserViewModel;
    orderID:any;
    currentOrder:OrderViewModel;
    notificationForm:FormGroup;
    notificationInput:NOTIFICATION=new NOTIFICATION();
    orderProcessing:number=0;
    orderStatusList: SelectItem[] = [];

    isBusy: boolean = false;
    totalOrders:number=0;
    totalCurrentOrders:number=0;
    isEmpty:boolean=true;
    displayModal:boolean=false;
    isFinish:boolean=false;
    ngOnInit() {
        for (var enumMember in OrderStatus) {
            var isValueProperty = parseInt(enumMember, 10) >= 0
            if (isValueProperty) {
              this.orderStatusList.push({ label: OrderStatus[enumMember], value: OrderStatus[enumMember] });
            }
          };
        this.titleService.setTitle("Chi tiết đơn hàng");
        this.currentUser=this.sessionService.getItem("currentUser");
        this.orderID=this.route.snapshot.paramMap.get("order_id");
        this.getOrder();
        this.getAllProductsInOrder();
        this.setNewNotification();
    }

    constructor(
        injector: Injector, 
        private ordersService:OrdersService,
        private route :ActivatedRoute,
        private notificationsService:NotificationsService
    ) {
        super(injector);
        this.notificationForm = this.formBuilder.group({
            'tittle': new FormControl('', [Validators.required, Validators.minLength(5)]),
            'message': new FormControl('', [Validators.required, Validators.minLength(10)]),
          });
    }

   getOrder(){
       this.isBusy=true;
       this.ordersService.getById(this.orderID).subscribe(res =>{
           this.isBusy=false;
           this.currentOrder=res;
           for(var i=0;i<this.orderStatusList.length;i++){
            if(this.currentOrder.status==this.orderStatusList[i].label){
              this.orderProcessing=(i+1)*25;
            }
          }
          if(this.currentOrder.status==this.orderStatusList[this.orderStatusList.length-1].label ||
            this.currentOrder.status==this.orderStatusList[this.orderStatusList.length-2].label) {
            this.isFinish=true;
          }
       });
   }
    
   getAllProductsInOrder(){
       this.isBusy=true;
       this.ordersService.getDetails(this.orderID).subscribe(res =>{
           this.isBusy=false;
           this.orderProductList=res;
       });
   }
    
   redirectTo(uri:string,cate_id:any){
    uri+="/"+cate_id;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }


  setNewNotification() {
    this.notificationInput.status = 0;
    this.notificationInput.from = this.currentUser.id;
    this.notificationInput.dateCreated = this.getDate(new Date());
    this.notificationInput.message = "";
    this.notificationInput.tittle = "";
    this.notificationInput.to = "69BD714F-9576-45BA-B5B7-F00649BE00DE";
  }

  cancelOrder() {
      this.isBusy = true;
      //this.currentOrder.status = "Đã hủy";
      this.currentOrder.status = this.orderStatusList.pop().value;
      this.ordersService.updateStatus(this.currentOrder).subscribe(res => {
        this.isBusy = false;
        if (res == true) {
            this.redirectTo('/home/order/',this.orderID);

        }
      });
    
  }

  addNotification() {
    this.isBusy = true;
    this.notificationsService.create(this.notificationInput).subscribe(res => {
      this.isBusy = false;
      //if (res != null) {
        this.cancelOrder(); 
      //}
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
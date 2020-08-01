import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import {UserViewModel,ORDER,OrdersService, OrderViewModel} from '../../../shared/service-proxy.module';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {OrderStatus} from '../../../core/models/orderStatus';


@Component({
    selector: 'app-order-list',
    templateUrl: 'order-list.component.html'
})
export class OrderListComponent extends AppComponentBase implements OnInit {

   orderInput:ORDER=new ORDER();
   orderList:OrderViewModel[]=[];
   oldOrderList:OrderViewModel[]=[];
   currentOrderList:OrderViewModel[]=[];
   currentUser:UserViewModel;

    isBusy: boolean = false;
    totalOrders:number=0;
    totalCurrentOrders:number=0;
    isEmpty:boolean=true;
    ngOnInit() {
        this.titleService.setTitle("Danh sách đơn hàng");
        this.currentUser=this.sessionService.getItem("currentUser");
        this.getAllOrders();
    }

    constructor(
        injector: Injector, 
        private ordersService:OrdersService
    ) {
        super(injector);
    }

    getAllOrders(){
        this.isBusy=true;
        this.ordersService.getAllByUserId(this.currentUser.id).subscribe(res =>{
            this.isBusy=false;
            this.orderList=res;
            for(var i=0;i<this.orderList.length;i++){
                if(this.orderList[i].status==OrderStatus[3]||this.orderList[i].status==OrderStatus[4] ){
                    this.oldOrderList.push(this.orderList[i]);
                }else this.currentOrderList.push(this.orderList[i]);
            }
            console.log(this.currentOrderList);
            this.totalCurrentOrders=this.currentOrderList.length;
        });

    }

}
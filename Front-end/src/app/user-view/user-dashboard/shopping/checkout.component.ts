import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { CART, CartViewModel,CartsService,UserViewModel,ORDER,OrdersService} from '../../../shared/service-proxy.module';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {OrderStatus} from '../../../core/models/orderStatus';


@Component({
    selector: 'app-checkout',
    templateUrl: 'checkout.component.html'
})
export class CheckoutComponent extends AppComponentBase implements OnInit {

    
    cartInput:CART=new CART();
    productsInCart:CartViewModel[]=[];
    currentUser:UserViewModel;
    newOrderInput:ORDER=new ORDER();
    newOrderForm:FormGroup;
    phoneNumberInput:number;
   
    isBusy: boolean = false;
    totalProducts:number=0;
    isEmpty:boolean=true;
    payment:string='Option 1';

    totalCartTmp:number=0;
    finalTotal:number=0;

    ngOnInit() {
        this.titleService.setTitle("Thủ tục đặt hàng");
        this.currentUser=this.sessionService.getItem("currentUser");
        this.getAllProductsInCart();
        this.setNewOrder();
    }

    constructor(
        injector: Injector, 
        private cartsService:CartsService,
        private ordersService:OrdersService
    ) {
        super(injector);
        this.newOrderForm=this.formBuilder.group({
            'shipName':new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]),
            'shipEmail':new FormControl('',[Validators.required,Validators.email]),
            'shipPhoneNumber':new FormControl(Number,[Validators.required]),
            'shipAddress':new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(200)])
        })
    }

    getAllProductsInCart(){
        this.isBusy=true;
        this.cartsService.getAllByUserId(this.currentUser.id).subscribe(res =>{
            this.isBusy=false;
            this.productsInCart=res;
            this.totalProducts=res.length;
            (this.totalProducts ==0)?(this.redirectTo('/home/cart','')):(this.finalTotal=this.totalCartTmp+20000);
            for(var i=0;i<this.productsInCart.length;i++){
                this.totalCartTmp+=this.productsInCart[i].total;
            }
            this.finalTotal+=this.totalCartTmp;
        });
    }

    
    redirectTo(uri:string,id:any){
        uri+="/"+id;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate([uri]));
     }

     deleteProductFromCart(cart:CART){
         this.isBusy=true;
         this.cartsService.deleteByCartId(cart.id).subscribe(res =>{
             this.isBusy=false;
             if(res !=null){
                 window.location.reload();
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

    setNewOrder(){
        this.newOrderInput.userId=this.currentUser.id;
        this.newOrderInput.shipPhoneNumber=this.currentUser.phoneNumber;
        this.phoneNumberInput=parseInt(this.currentUser.phoneNumber);
        console.log(typeof this.phoneNumberInput,this.phoneNumberInput,this.currentUser.phoneNumber);
        this.newOrderInput.shipName=this.currentUser.userName;
        this.newOrderInput.total=this.finalTotal;
        this.newOrderInput.orderDate=this.getDate(new Date());
        this.newOrderInput.status=OrderStatus[0];
        this.newOrderInput.shipEmail=this.currentUser.email;
    }

    createNewOrder(){
        this.isBusy=true;
        this.newOrderInput.shipPhoneNumber='0'+String(this.phoneNumberInput);
        this.newOrderInput.total+=20000;
        console.log(this.newOrderInput);
        this.ordersService.create(this.newOrderInput).subscribe(res =>{
            this.isBusy=false;
            if(res !=null){
                this.redirectTo('/home/order/',res);
            }
        })
    }
}
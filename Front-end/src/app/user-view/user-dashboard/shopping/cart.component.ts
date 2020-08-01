import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { CART, CartViewModel,CartsService,UserViewModel} from '../../../shared/service-proxy.module';
import { Router } from '@angular/router';


@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html'
})
export class CartComponent extends AppComponentBase implements OnInit {

    
    cartInput:CART=new CART();
    productsInCart:CartViewModel[]=[];
    currentUser:UserViewModel;
   
    isBusy: boolean = false;
    totalProducts:number=0;
    isEmpty:boolean=true;

    totalCartTmp:number=0;
    finalTotal:number=0;

    ngOnInit() {
        this.titleService.setTitle("Giỏ hàng");
        this.currentUser=this.sessionService.getItem("currentUser");
        this.getAllProductsInCart();
    }

    constructor(
        injector: Injector, 
        private cartsService:CartsService
    ) {
        super(injector);
        
    }

    getAllProductsInCart(){
        this.isBusy=true;
        this.cartsService.getAllByUserId(this.currentUser.id).subscribe(res =>{
            this.isBusy=false;
            this.productsInCart=res;
            this.totalProducts=res.length;
            (this.totalProducts ==0)?(this.isEmpty=true):(this.isEmpty=false,this.finalTotal=this.totalCartTmp+20000);
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

     updateCart(cart:CART,quantity:number){
         this.isBusy=true;
        cart.quantity+=quantity;
        this.cartsService.updateQuantity(cart).subscribe(res =>{
            if(res !=null){
                this.redirectTo('/home/cart/','');
                this.toastService.addSingle('success','','Thay đổi thành công!');
            }else{
                cart.quantity+=quantity;
            }
            this.isBusy=false;
        })
     }


     deleteProductFromCart(cart:CART){
        this.isBusy=true;
        this.cartsService.deleteByCartId(cart.id).subscribe(res =>{
            this.isBusy=false;
            if(res !=null){
                this.redirectTo('/home/cart/','');
            }
        })
    }
}
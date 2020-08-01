import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { CategoriesService, CategoryViewModel, CATEGORY,ProductsService,ProductViewModel,PRODUCT,
    CommentsService, CommentViewModel, COMMENT,UserViewModel,CartsService,CART} from '../../../shared/service-proxy.module';
import { Router,ActivatedRoute } from '@angular/router';
import { IfStmt } from '@angular/compiler';
import {FormGroup,Validators, FormControl} from '@angular/forms';

@Component({
    selector: 'app-product-detail',
    templateUrl: 'product-detail.component.html'
})
export class ProductDetailComponent extends AppComponentBase implements OnInit {

    //liên quan đến product
    productID:number=0;//id của cate hiện tại
    productInput:PRODUCT=new PRODUCT();
    currentProduct:ProductViewModel;
    quantityPurchased:number=0;

    //comment
    commentList: CommentViewModel[] = [];
    totalComment:number=0;
    newCommentInput:COMMENT=new COMMENT();
    newCommentForm:FormGroup;
    currentUser:UserViewModel;

    //cart 
    cartInput:CART=new CART();

    isBusy: boolean = false;
   isRootCate:boolean=false;
   isDisplay:boolean=false;
   isEmpty:boolean=true;
    
    ngOnInit() {
        this.productID=parseInt(this.route.snapshot.paramMap.get("product_id"));
        this.currentUser=this.sessionService.getItem("currentUser");
        this.setNewComment();
        this.addViewCount();
        this.getCurrentProductByID();
        this.getAllProductComments();
        this.setNewCart();
        
      }

    constructor(
        injector: Injector, 
        private productService:ProductsService,
        private categoriesService:CategoriesService,
        private route:ActivatedRoute,
        private commentsService: CommentsService,
        private cartsService:CartsService
    ) {
        super(injector);
        this.newCommentForm=this.formBuilder.group({
            'tittle':new FormControl('',[Validators.required]),
            'content':new FormControl('',[Validators.required,Validators.maxLength(200)])
        });
        
    }

    getCurrentProductByID(){
        this.isBusy=true;
        this.productService.getById(this.productID).subscribe(res =>{
            this.currentProduct=res;
            this.titleService.setTitle(res.name);
            this.isBusy=false;
        });
    }

    getAllProductComments() {
        this.isBusy = true;
        this.commentsService.getAllByProductId(this.productID).subscribe(res => {
            this.isBusy = false;
            this.commentList = res;
            if (this.commentList.length == 0) {
                this.isEmpty = true;
            } else {
                this.isEmpty = false;
                this.totalComment=this.commentList.length;
            }
        })
    }

    addViewCount(){
        this.isBusy=true;
        this.productService.addViewCount(this.productID).subscribe(res =>{
            this.isBusy=false;
        })
    }

    setNewComment(){
        this.newCommentInput.productId=this.productID;
        this.newCommentInput.userId=this.currentUser.id;
        this.newCommentInput.star=1;
        var today=new Date();
        this.newCommentInput.createdTime=this.getDate(today);
        this.newCommentInput.tittle="";
        this.newCommentInput.content="";
    }

    addNewComment(){
       this.isBusy=true;
        this.commentsService.create(this.newCommentInput).subscribe(res =>{
            if(res !=null){
                this.setNewComment();
                this.redirectTo('/home/product/detail/',this.productID);
            }
            this.isBusy=false;
            
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

    updateQuantityPurchased(quantity:number){
        this.quantityPurchased+=quantity;
        this.currentProduct.stock-=quantity;
    }

    addToCart(){
        this.isBusy=true;
        this.cartInput.quantity=this.quantityPurchased;
        this.cartsService.create(this.cartInput).subscribe(res =>{
            this.isBusy=false;
            if(res !=null){
                this.redirectTo('/home/product/detail/',this.productID);
            }
        })
    }

    setNewCart(){
        this.cartInput.productId=this.productID;
        this.cartInput.userId=this.currentUser.id;
        this.cartInput.dateCreated=this.getDate(new Date());
    }

    redirectTo(uri:string,cate_id:any){
        uri+="/"+cate_id;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate([uri]));
     }
}

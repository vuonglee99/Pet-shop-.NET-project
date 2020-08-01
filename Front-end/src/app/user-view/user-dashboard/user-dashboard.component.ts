import { Component, OnInit, Injector, ViewEncapsulation ,OnDestroy,ViewChild} from '@angular/core';
import { AppComponentBase } from '../../shared/app-component-base';
import { CategoriesService, CategoryViewModel, CATEGORY, ProductsService, ProductViewModel, PRODUCT,
CART, CartsService,UserViewModel } from '../../shared/service-proxy.module';
import { Router } from '@angular/router';
import { combineAll } from 'rxjs/operators';
import {Subscription} from 'rxjs';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: 'user-dashboard.component.html'
})
export class UserDashboardComponent extends AppComponentBase implements OnInit,OnDestroy {

    @ViewChild('nav') slider: NgImageSliderComponent;
    prevImageClick() {
        this.slider.prev();
    }
    
    nextImageClick() {
        this.slider.next();
    }

    cateInput: CATEGORY = new CATEGORY();
    isDisplay: boolean = false;
    rootCateList: CategoryViewModel[] = [];
    productInput: PRODUCT = new PRODUCT();
    subcription1:Subscription;
    mainCateList:CategoryViewModel[]=[];
    cateList:CategoryViewModel[][]=new Array();

    //cart
    cartInput:CART=new CART();
    

    isBusy: boolean = false;
    content: string = null;
    activeCateName:string=null;

    //Input productList
    categoryId: number = 0;
    star: number = 0;

    imageObject: Array<object> = [{
        image: 'https://www.petcity.vn/media/banner/13_Mar06f7cf87791fd1e0336e2ddbb75d4ae3.png',
        thumbImage: 'https://www.petcity.vn/media/banner/13_Mar06f7cf87791fd1e0336e2ddbb75d4ae3.png',
        alt: 'alt of image',
    }, {
        image: 'https://www.petcity.vn/media/banner/28_May5ebe8bf57467d59581bf4557129832b8.png', // Support base64 image
        thumbImage: 'https://www.petcity.vn/media/banner/28_May5ebe8bf57467d59581bf4557129832b8.png', // Support base64 image
        alt: 'Image alt' //Optional: You can use this key if want to show image with alt
    },
    {
        image: 'https://www.petcity.vn/media/banner/28_May2e90472343f033d3f05cec87f5075d20.png', // Support base64 image
        thumbImage: 'https://www.petcity.vn/media/banner/28_May2e90472343f033d3f05cec87f5075d20.png', // Support base64 image
        alt: 'Image alt' //Optional: You can use this key if want to show image with alt
    },
    {
        image: 'assets/img/image_cover_3.jpg', // Support base64 image
        thumbImage: 'assets/img/image_cover_3.jpg', // Support base64 image
        alt: 'Image alt' //Optional: You can use this key if want to show image with alt
    }
];



    ngOnInit() {
        this.getAllRootCate();
    }

    constructor(
        injector: Injector,
        private categoriesService: CategoriesService,
        private cartsService:CartsService
    ) {
        super(injector);
        this.titleService.setTitle("Trang chủ");
    }
    mySlideOptions = { items: 1, dots: true, nav: true };
    myCarouselOptions = { items: 3, dots: true, nav: true };

    onOver(index: any) {
        this.mainCateList=this.cateList[index];
        this.isDisplay = true;

    }
    onleave() {
        this.isDisplay = false;

    }

    getAllRootCate() {
        this.isBusy = true;
        this.cateInput.parentID = 0;
        this.categoriesService.getAllCategory(this.cateInput).subscribe(res => {
            this.isBusy = false;
            this.rootCateList = res;
            for (var i = 0; i < this.rootCateList.length; i++) {
                this.getChildrenCate(this.rootCateList[i].id,i);  
            }
        })
        
    }

    change() {
        this.categoryId = 1;
    }

    getChildrenCate(parrentID: number,index:number) {
        this.cateInput.parentID = parrentID;
        this.isBusy = true;
        this.subcription1=this.categoriesService.getAllCategory(this.cateInput).subscribe(res=>{
            this.isBusy=false;
            this.cateList[index]=res;
        })
    }

    ngOnDestroy(){
        this.subcription1.unsubscribe();
    }

    searchProduct(cateID:any){
        this.router.navigate(['/home/product/'+cateID]);
    }

}

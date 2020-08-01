import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { CategoriesService, CategoryViewModel, CATEGORY,ProductsService,ProductViewModel,PRODUCT } from '../../../shared/service-proxy.module';
import { Router,ActivatedRoute } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
    selector: 'app-product-search',
    templateUrl: 'product-search.component.html'
})
export class ProductSearchComponent extends AppComponentBase implements OnInit {

    cateInput:CATEGORY=new CATEGORY();//dùng để tìm kiếm
    cateRelativeList:CategoryViewModel[]=[];//lưu các loại liên quan đến loại hiện tại
    cateID:number=0;//id của cate hiện tại
    currentCate:CategoryViewModel;//loại hiện tại
    rootCateList: CategoryViewModel[] = [];//menu gốc các loại
    cateLevel1List:CategoryViewModel[][]=new Array();//mảng lưu các con bậc 1 của menu gốc
    mainCateList:CategoryViewModel[]=[];//menu con bậc 1 được hiển thị
    parrentCate:CategoryViewModel[]=[];//loại cha của nó
    name:string=null;//tên của menu hiện tại(tên = loại hiện tại nếu có loại con)
    productInput:PRODUCT=new PRODUCT();
    productList:ProductViewModel[]=[];
    

    isBusy: boolean = false;
   isRootCate:boolean=false;
   isDisplay:boolean=false;
    isNoChildren:boolean=false;
    ngOnInit() {
        this.cateID=parseInt(this.route.snapshot.paramMap.get("cate_id"));
        this.getCurrentCateByID();
        this.getAllRelativeCates();
        this.getAllRootCate();
        this.getAllProducts();
        
      }

    constructor(
        injector: Injector, 
        private productService:ProductsService,
        private categoriesService:CategoriesService,
        private route:ActivatedRoute
    ) {
        super(injector);
        
    }

    getCurrentCateByID(){
        this.isBusy=true;
        this.categoriesService.getById(this.cateID).subscribe(res =>{
            this.isBusy=false;
            this.currentCate=res;
            this.name=this.currentCate.name;
            this.titleService.setTitle(this.name);
        });
    }

    getAllRelativeCates(){
        this.isBusy=true;
        this.cateInput.parentID=this.cateID;
        this.categoriesService.getAllCategory(this.cateInput).subscribe(res =>{
            this.isBusy=false;
            this.cateRelativeList=res;
            if(this.cateRelativeList.length==0) {
                this.getAllSameLevelCates();
                this.getParrentCate();
            }
        })
    }
    
    onOver(index: any) {
        this.mainCateList=this.cateLevel1List[index];
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

    getChildrenCate(parrentID: number,index:number) {
        this.cateInput.parentID = parrentID;
        this.isBusy = true;
        this.categoriesService.getAllCategory(this.cateInput).subscribe(res=>{
            this.isBusy=false;
            this.cateLevel1List[index]=res;
        })
    }

     getAllSameLevelCates(){
        this.isBusy=true;
        this.cateInput.parentID=this.currentCate.parentID;
        this.categoriesService.getAllCategory(this.cateInput).subscribe(res =>{
            this.isBusy=false;
            this.cateRelativeList=res;
        })
     }

     getParrentCate(){
         this.isBusy=true;
         this.categoriesService.getById(this.currentCate.parentID).subscribe(res =>{
             this.isBusy=false;
             this.name=res.name;
         })
    }

    getAllProducts(){
        this.isBusy=true;
        this.productInput.categoryId=this.cateID;
        this.productService.getAllProduct(this.productInput).subscribe(res => {
            this.isBusy=false;
            this.productList=res;
        })
    }

    sortProduct(){
        console.log("sort");
    }
}

import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import {
    CategoriesService, CategoryViewModel, CATEGORY, ProductsService, ProductViewModel, PRODUCT,
    CommentsService, CommentViewModel
} from '../../../shared/service-proxy.module';
import { Router, ActivatedRoute } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
    selector: 'app-top-menu',
    templateUrl: 'top-menu.component.html'
})
export class TopMenuComponent extends AppComponentBase implements OnInit {

    //liên quan đến top menu
    rootCateList: CategoryViewModel[] = [];//menu gốc các loại
    cateLevel1List: CategoryViewModel[][] = new Array();//mảng lưu các con bậc 1 của menu gốc
    mainCateList: CategoryViewModel[] = [];//menu con bậc 1 được hiển thị

    cateInput: CATEGORY = new CATEGORY();//dùng để tìm kiếm
    cateRelativeList: CategoryViewModel[] = [];//lưu các loại liên quan đến loại hiện tại

    isBusy: boolean = false;
    isDisplay: boolean = false;

    ngOnInit() {
        this.getAllRootCate();

    }

    constructor(
        injector: Injector,
        private productService: ProductsService,
        private categoriesService: CategoriesService,
        private route: ActivatedRoute,
        private commentsService: CommentsService,
    ) {
        super(injector);

    }

    //hiển thị top menu, không đụng đến
    onOver(index: any) {
        this.mainCateList = this.cateLevel1List[index];
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
                this.getChildrenCate(this.rootCateList[i].id, i);
            }
            console.log(this.cateLevel1List);
        })

    }

    getChildrenCate(parrentID: number, index: number) {
        this.cateInput.parentID = parrentID;
        this.isBusy = true;
        this.categoriesService.getAllCategory(this.cateInput).subscribe(res => {
            this.isBusy = false;
            this.cateLevel1List[index] = res;
        })
    }

    searchProduct(cateID:any){
        this.router.navigate(['/home/product/'+cateID]);
    }
}
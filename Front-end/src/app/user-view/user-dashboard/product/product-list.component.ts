import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import {
    CategoriesService, CategoryViewModel, CATEGORY, ProductsService, ProductViewModel, PRODUCT,
    UserViewModel, CartsService, CART
} from '../../../shared/service-proxy.module';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: 'product-list.component.html'
})
export class ProductListComponent extends AppComponentBase implements OnInit {

    @Input() categoryId: number;
    @Input() star: number;
    @Input() parrentID: number;
    @Input() viewCount: number;
    @Input() sortBy: string;
    @Input() numProductOnRow: string;
    @Input() rows: number = 12;
    @Input() isPaging: boolean = true;
    @Input() isMinToMax:boolean=false;

    class: string = "col-2";

    productInput: PRODUCT = new PRODUCT();
    productList: ProductViewModel[] = [];

    isBusy: boolean = false;
    productsOfPage: ProductViewModel[] = [];
    currentUser: UserViewModel;
    totalProduct: number = 0;
    isEmpty: boolean = true;
    cartInput: CART = new CART();

    ngOnInit() {
        this.currentUser = this.sessionService.getItem("currentUser");
        this.getAllProduct();
    }

    constructor(
        injector: Injector,
        private productService: ProductsService,
        private cartsService: CartsService
    ) {
        super(injector);

    }

    getAllProduct() {
        if (this.categoryId != -1) {
            this.productInput.categoryId = this.categoryId;
        }
        if (this.star != -1) {
            this.productInput.star = this.star;
        }
        if (this.viewCount != -1) {
            this.productInput.viewCount = this.viewCount;
        }
        this.isBusy = true;
        this.productService.getAllProduct(this.productInput).subscribe(res => {
            this.isBusy = false;
            this.productList = res;
            this.totalProduct = this.productList.length;
            (this.totalProduct == 0) ? this.isEmpty = true : this.isEmpty = false;
            for (var i = 0; i < this.totalProduct; i++) {
                for (var j = i + 1; j < this.totalProduct; j++) {
                    if(this.isMinToMax==false){
                        if (this.productList[i][this.sortBy] < this.productList[j][this.sortBy]) {

                            let product: ProductViewModel = this.productList[i];
                            this.productList[i] = this.productList[j];
                            this.productList[j] = product;
                        }
                    }else{
                        if (this.productList[i][this.sortBy] > this.productList[j][this.sortBy]) {

                            let product: ProductViewModel = this.productList[i];
                            this.productList[i] = this.productList[j];
                            this.productList[j] = product;
                        }
                    }
                   
                }
            }
            this.productsOfPage = [];
            if (this.totalProduct > this.rows) {
                for (var i = 0; i < this.rows; i++) {
                    this.productsOfPage.push(this.productList[i]);
                }
            } else {
                this.productsOfPage = this.productList;
            }
        });
    }

    paginate(event) {
        var x = event.first;
        this.productsOfPage = [];
        if ((x + this.rows) > this.totalProduct) {
            for (var i = x; i < this.totalProduct; i++) {
                this.productsOfPage.push(this.productList[i]);
            }
        } else {
            for (var i = x; i < this.rows + x; i++) {
                this.productsOfPage.push(this.productList[i]);
            }
        }
    }

    addToCart(id: any) {
        this.isBusy = true;
        this.cartInput.quantity = 1;
        this.cartInput.productId = id;
        this.cartInput.userId = this.currentUser.id;
        this.cartInput.dateCreated = this.getDate(new Date());
        this.cartsService.create(this.cartInput).subscribe(res => {
            if (res != null) {
                window.location.reload();
            }
            this.isBusy = false;
        });
    }

}

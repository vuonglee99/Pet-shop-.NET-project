import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppComponentBase } from '../../shared/app-component-base';
import { PRODUCT, ProductViewModel, ProductsService, CategoriesService, CategoryViewModel, CATEGORY } from '../../shared/service-proxy.module';
import { Router } from '@angular/router';
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-admin-product',
  templateUrl: 'admin-product.component.html'
})
export class AdminProductComponent extends AppComponentBase implements OnInit {

  loginForm: FormGroup;
  productInput: PRODUCT = new PRODUCT();
  productList: ProductViewModel[] = [];
  selectedProduct: PRODUCT;
  cols: any[];
  dateInput: string = null;
  cateInput: CATEGORY = new CATEGORY();
  cateList: CategoryViewModel[] = [];
  typeItems: SelectItem[] = [];

  isBusy: boolean = false;
  ngOnInit() {
    this.productInput.dateCreated
    this.cols = [
      { field: 'name', header: 'Tên sản phẩm' },
      { field: 'price', header: 'Giá' },
      { field: 'stock', header: 'Số lượng còn lại' },
      { field: 'dateCreated', header: 'Ngày tạo' },
      { field: 'viewCount', header: 'Lượt xem' }
    ];
    this.cateInput.parentID=-1;
    this.getAllProducts();
    this.getAllCategory();
  }

  constructor(
    injector: Injector,
    private productService: ProductsService,
    private categoriesService: CategoriesService
  ) {
    super(injector);
  }

  getAllProducts() {

    this.isBusy = true;
    this.productService.getAllProduct(this.productInput).subscribe(res => {
      this.isBusy = false;
      this.productList = res;
      console.log(res);
    })
  }

  viewDetail() {
    if (typeof this.selectedProduct !== 'undefined') {
      this.router.navigate(['/admin/product/' + this.selectedProduct.id]);
    }

  }

  addNew() {
    this.router.navigate(['/admin/product/add']);
  }

  getAllCategory() {
    this.isBusy = true;
    this.categoriesService.getAllCategory(this.cateInput).subscribe(res => {
      this.isBusy = false;
      this.cateList = res;
      this.typeItems.push({ label: "--Tất cả--", value: "'0'" });
      for (var i = 0; i < this.cateList.length; i++) {
        this.typeItems.push({ label: this.cateList[i].name, value: this.cateList[i].id })
      }
    })
  }

  onRowSelect(event) {
    this.selectedProduct = event.data;

  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }

  getDate(): string {
    if (this.dateInput != null) {
      let d = new Date(Date.parse(this.dateInput));
      var dd = (d.getDate() < 10) ? dd = '0' + d.getDate() : dd = d.getDate();
      var mm = ((d.getMonth() + 1) < 10) ? mm = '0' + (d.getMonth() + 1) : mm = (d.getMonth() + 1);
      var yyyy = d.getFullYear();
      let myDate = dd + "/" + mm + "/" + yyyy;
      return String(myDate);
    } else return "";
  }

  deleteProduct() {
    this.isBusy = true;
    this.productService.delete(this.selectedProduct.id).subscribe(res => {
      this.isBusy = false;
      if (res == true) {
        this.getAllProducts();
      }
    })
  }

  confirm() {
    if (typeof this.selectedProduct !== 'undefined') {
      this.confirmationService.confirm({
        message: 'Bạn có muốn xóa sản phẩm đã chọn không?',
        accept: () => {
          this.deleteProduct();
        }
      });
    }
  }

  addNewCate(){
    this.router.navigate(['/admin/product/cate-add']);
  }
}
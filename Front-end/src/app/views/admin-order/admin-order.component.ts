import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppComponentBase } from '../../shared/app-component-base';
import { OrdersService, ORDER, OrderViewModel } from '../../shared/service-proxy.module';
import { OrderStatus } from '../../core/models/orderStatus';
import { UserContextService } from '../../core/services/user-context.service';
import { Router } from '@angular/router';
import { LazyLoadEvent, SortEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-admin-order',
  templateUrl: 'admin-order.component.html'
})

export class AdminOrderComponent extends AppComponentBase implements OnInit {

  orderInput: ORDER = new ORDER();
  orderList: OrderViewModel[] = [];
  selectedOrder: ORDER;
  cols: any[];
  orderDateInput: any = null;

  typeItems: SelectItem[] = [];
  isBusy: boolean = false;
  totalOrder: number = 0;
  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'Mã đơn hàng' },
      { field: 'orderDate', header: 'Ngày đặt hàng' },
      { field: 'total', header: 'Trị giá' },
      { field: 'status', header: 'Trạng thái' }
    ];
    this.typeItems.push({ label: "--Tất cả--", value: "" });
    for (var enumMember in OrderStatus) {
      var isValueProperty = parseInt(enumMember, 10) >= 0
      if (isValueProperty) {
        this.typeItems.push({ label: OrderStatus[enumMember], value: OrderStatus[enumMember] });
      }
    };
    this.getAllOrders();
  }

  constructor(
    injector: Injector,
    private orderService: OrdersService
  ) {
    super(injector);

  }


  getAllOrders() {
    this.isBusy = true;
    this.orderInput.orderDate=this.getDate(this.orderDateInput);
    this.orderService.getAllOrder(this.orderInput).subscribe(res => {
      this.isBusy = false;
      this.orderList = res;
    })
  }

  viewDetail() {
    if (typeof this.selectedOrder !== 'undefined') {
      this.router.navigate(['/admin/order/' + this.selectedOrder.id]);
    }

  }

  onRowSelect(event) {
    this.selectedOrder = event.data;
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

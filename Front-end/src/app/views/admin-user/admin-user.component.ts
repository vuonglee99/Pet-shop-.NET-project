import { Component,OnInit,Injector,ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {AppComponentBase} from  '../../shared/app-component-base';
import {UsersService,APPUSER,UserViewModel} from '../../shared/service-proxy.module';
import { UserContextService } from '../../core/services/user-context.service';
import {Router} from '@angular/router'
import { LazyLoadEvent,SortEvent } from 'primeng/api';

@Component({
  selector: 'app-admin-user',
  templateUrl: 'admin-user.component.html'
})
export class AdminUserComponent extends AppComponentBase implements OnInit {

  userInput:APPUSER=new APPUSER();
  userList:UserViewModel[]=[];
  selectedUser:UserViewModel;
  cols:any[];

  isBusy:boolean=false;

  ngOnInit(){
    this.cols=[
      { field: 'id', header: 'Mã người dùng' },
      { field: 'userName', header: 'Tên đăng nhập' },
      { field: 'phoneNumber', header: 'Số điện thoại' },
      { field: 'email', header: 'Địa chỉ email' },
    ];
    this.getAllUsers();
  }
  
  constructor(
    injector:Injector,
    private userService:UsersService,
    private userContextService:UserContextService,
  ){
    super(injector);
    
  }

  getAllUsers(){
    this.isBusy=true;
    this.userService.getAllUser(this.userInput).subscribe(res =>{
      this.isBusy=false;
      this.userList=res;
    })
  }

  viewDetail(){
    if (typeof this.selectedUser !== 'undefined') {
      this.router.navigate(['/admin/user/' + this.selectedUser.id]);
    }

  }


  onRowSelect(event) {
    this.selectedUser = event.data;

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
}

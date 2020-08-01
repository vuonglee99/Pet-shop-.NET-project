import { Component,OnInit,Injector,ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {AppComponentBase} from  '../../shared/app-component-base';
import {UserViewModel,LoginRequest,UsersService} from '../../shared/service-proxy.module';
import { UserContextService } from '../../core/services/user-context.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent extends AppComponentBase implements OnInit {

  loginForm:FormGroup;
  userLogin:LoginRequest=new LoginRequest()
  currentUser:UserViewModel;
  isBusy:boolean=false;
  ngOnInit(){
    this.titleService.setTitle("Đăng nhập tài khoản");
  }
  
  constructor(
    injector:Injector,
    private userService:UsersService,
    private userContextService:UserContextService,
  ){
    super(injector);
    this.loginForm=this.formBuilder.group({
      'USERNAME':new FormControl('',[Validators.required]),
      'PASSWORD':new FormControl('',[Validators.required])
    })
  }

  login(){
    this.isBusy=true;
    this.userLogin.rememberMe=true;
    this.userService.authenticate(this.userLogin).subscribe(res =>{
      this.isBusy=false;
      if(res!="-1"){
        console.log("right"); 
       this.getUserbyId(res);
       
     }
    console.log(res);
    })
  }

  getUserbyId(userID:any){
    this.isBusy=true;
    this.userService.getById(userID).subscribe(res =>{
      this.isBusy=false;
      this.currentUser=res;
      this.userContextService.setUser(this.currentUser);
      if(this.currentUser.role=="admin"){
        this.router.navigate(["/dashboard"]);
       }else {
        this.router.navigate(["/home"]);
       }
    })
  }

  


}

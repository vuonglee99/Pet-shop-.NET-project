import { Component,OnInit,Injector,ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {AppComponentBase} from  '../../shared/app-component-base';
import {APPUSER,UsersService} from '../../shared/service-proxy.module';
import { UserContextService } from '../../core/services/user-context.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styles:[
    `
   
    `
  ]
})
export class RegisterComponent extends AppComponentBase implements OnInit {

  registerForm:FormGroup;
  newUser:APPUSER=new APPUSER();

  isBusy:boolean=false;
  ngOnInit(){
    this.titleService.setTitle("Đăng kí tài khoản");

  }
  
  constructor(
    injector:Injector,
    private userService:UsersService,
    private userContextService:UserContextService,
  ){
    super(injector);
    this.registerForm=this.formBuilder.group({
      'firstName':new FormControl('',[Validators.required]),
      'lastName':new FormControl('',[Validators.required]),
      'dob':new FormControl('',[Validators.required]),
      'email':new FormControl('',[Validators.required,Validators.email]),
      'phoneNumber':new FormControl('',[Validators.required]),
      'userName':new FormControl('',[Validators.required]),
      'password':new FormControl('',[Validators.required]),
      'confirmPassword':new FormControl('',[Validators.required])
    })
  }

  register(){
    this.isBusy=true;
    this.newUser.avatar="assets/img/user-icon.png";
    this.userService.register(this.newUser).subscribe(res =>{
      this.isBusy=false;
      this.newUser=new APPUSER();
      this.redirectTo('/login','');
    })
  }

  login(){
    this.router.navigate(["/login"]);
  }

  


}

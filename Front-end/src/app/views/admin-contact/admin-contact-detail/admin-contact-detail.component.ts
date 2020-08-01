import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppComponentBase } from '../../../shared/app-component-base';
import { UsersService, ContactsService,ContactViewModel,CONTACT } from '../../../shared/service-proxy.module';
import { UserContextService } from '../../../core/services/user-context.service';
import { Router,ActivatedRoute } from '@angular/router'
import { LazyLoadEvent, SortEvent } from 'primeng/api';

@Component({
    selector: 'app-admin-contact-detail',
    templateUrl: 'admin-contact-detail.component.html'
})
export class AdminContactDetailComponent extends AppComponentBase implements OnInit {

    contactInput: CONTACT = new CONTACT();
    contact: ContactViewModel;

    isBusy: boolean = false;
    dateInput:any=null;
    isSupported:boolean=false;
    ngOnInit() {
        this.contactInput.id=parseInt(this.route.snapshot.paramMap.get("contact_id"));
        this.getContactByID();

    }

    constructor(
        injector: Injector,
        private userService: UsersService,
        private contactService: ContactsService,
        private route: ActivatedRoute,
    ) {
        super(injector);

    }

    getContactByID() {
        this.isBusy = true;
        this.contactService.getById(this.contactInput.id).subscribe(res => {
            this.isBusy = false;
            this.contact = res;
            for(var property in this.contact){
                this.contactInput[property]=this.contact[property];
            }
            if(this.contact.status==0){
                this.isSupported=false;
            }else
            {
                this.isSupported=true;
            }
        });
    }

    answerContact(){
        this.isBusy=true;
        this.contactInput.status=1;
        this.contactService.updateStatus(this.contactInput).subscribe(res =>{
            this.isBusy=false;
            this.isSupported=true;
        })
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
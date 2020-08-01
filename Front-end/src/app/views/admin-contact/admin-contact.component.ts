import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppComponentBase } from '../../shared/app-component-base';
import { UsersService, ContactsService,ContactViewModel,CONTACT } from '../../shared/service-proxy.module';
import { UserContextService } from '../../core/services/user-context.service';
import { Router } from '@angular/router'
import { LazyLoadEvent, SortEvent } from 'primeng/api';

@Component({
    selector: 'app-admin-contact',
    templateUrl: 'admin-contact.component.html'
})
export class AdminContactComponent extends AppComponentBase implements OnInit {

    contactInput: CONTACT = new CONTACT();
    contactList: ContactViewModel[] = [];
    selectedContact: ContactViewModel;
    cols: any[];

    isBusy: boolean = false;
    totalContacts:number=0;
    dateInput:any=null;
    ngOnInit() {
        this.cols = [
            { field: 'id', header: 'Mã hỗ trợ' },
            { field: 'createdTime', header: 'Ngày gửi' },
            { field: 'name', header: 'Họ tên' },
            { field: 'email', header: 'Email' },
        ];
        this.getAllContacts();

    }

    constructor(
        injector: Injector,
        private userService: UsersService,
        private contactService: ContactsService
    ) {
        super(injector);

    }

    getAllContacts() {
        this.isBusy = true;
        this.contactInput.createdTime=this.getDate(this.dateInput);
        this.contactService.getAllContact(this.contactInput).subscribe(res => {
            this.isBusy = false;
            this.contactList = res;
            this.totalContacts=this.contactList.length;
        });
    }

    viewDetail() {
        if (typeof this.selectedContact !== 'undefined') {
            this.router.navigate(['/admin/contact/' + this.selectedContact.id]);
        }
    }

    onRowSelect(event) {
        this.selectedContact = event.data;

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
import {SessionService} from '../core/services/session.service';
import {RouteStateService} from '../core/services/route-state.service';
import {ToastService} from '../core//services/toast.service';
import { Injector } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Route,Router,ActivatedRoute} from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import {Title} from "@angular/platform-browser";

export abstract class AppComponentBase{

    toastService:ToastService;
    routeStateService:RouteStateService;
    sessionService:SessionService;
    formBuilder:FormBuilder;
    router:Router;
    confirmationService:ConfirmationService;
    titleService:Title;

    constructor(injector:Injector){
        this.toastService=injector.get(ToastService);
        this.sessionService=injector.get(SessionService);
        this.toastService=injector.get(ToastService);
        this.formBuilder=injector.get(FormBuilder);
        this.router=injector.get(Router);
        this.confirmationService=injector.get(ConfirmationService);
        this.titleService=injector.get(Title);
    }

    public getDate(dateInput: any): string {
        if (dateInput != null) {
            let d = new Date(Date.parse(dateInput));
            var dd = (d.getDate() < 10) ? dd = '0' + d.getDate() : dd = d.getDate();
            var mm = ((d.getMonth() + 1) < 10) ? mm = '0' + (d.getMonth() + 1) : mm = (d.getMonth() + 1);
            var yyyy = d.getFullYear();
            let myDate = dd + "/" + mm + "/" + yyyy;
            return String(myDate);
        } else return "";
    }

    redirectTo(uri: string, cate_id: any) {
        uri += "/" + cate_id;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate([uri]));
    }

    public strToDate(dateInput: string): Date {
        let arr = dateInput.split("/", 3);
        var dd = parseInt(arr[0]);
        var mm = parseInt(arr[1]);
        var yyyy = parseInt(arr[2]);

        let date = new Date(yyyy, mm - 1, dd);
        return date;
    }
}
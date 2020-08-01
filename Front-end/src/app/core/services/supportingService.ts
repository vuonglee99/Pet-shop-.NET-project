import { Injectable } from '@angular/core';
import { element } from 'protractor';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Notice} from 'src/app/core/models/notice.module';

@Injectable({
    providedIn: 'root',
})
export class SupportingService {

    public server:string='http://localhost:5000/api/supporting/';
    constructor(private httpClient: HttpClient) {
       
    }

    getAllNotices(USER_ID:string){
        const formData:FormData =new FormData();
        formData.append("USER_ID",USER_ID);

        return this.httpClient.post<any>(this.server+"getAllNotices",formData);
    }

    addNotice(notice:Notice){
        let content = JSON.stringify({ notice });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
  
        return this.httpClient.post<any>(this.server+"addNotice",data);
    }

    deleteNotice(NOTICE_ID:string){
        const formData:FormData =new FormData();
        formData.append("NOTICE_ID",NOTICE_ID);

        return this.httpClient.post<any>(this.server+"deleteNotice",formData);
    }
}
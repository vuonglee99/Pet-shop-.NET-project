import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { element } from 'protractor';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
/**
 * user service class
 */
export class UserDataService {

    public server:string='http://localhost:5000/api/user/';
    httpOptions:any;
    
    constructor(private httpClient: HttpClient) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': 'http://localhost:4200', // -->Add this line
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
    }

    login(USER_NAME: string, USER_PASSWORD: string) {
        const formData: FormData=new FormData();
        formData.append("USER_NAME",USER_NAME);
        formData.append("USER_PASSWORD",USER_PASSWORD);
        return this.httpClient.post<User>(this.server+'login',formData);
    }

    register(user: User){
        let content = JSON.stringify({ user });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server +'register',data);
    }

    update(user:User){
        let content = JSON.stringify({ user });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server +'update',data);
    }

    getUserById(user_id:string){
        return this.httpClient.get<any>(this.server+`singleUser/${user_id}`);
    }

    addAvatar(USER_ID:string,image:any){
        const formData:FormData =new FormData();
        formData.append("USER_AVATAR",image[0],image["filename"]);
        formData.append("USER_ID",USER_ID);

        return this.httpClient.post<any>(this.server+"add-avatar",formData);
    }

    getAllUser(user:User){
        let content = JSON.stringify({ user });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server +'getAllUser',data);
    }
}
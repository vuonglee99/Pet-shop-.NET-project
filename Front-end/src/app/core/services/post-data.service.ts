import { Injectable } from '@angular/core';
import { Post } from  '../models/post.model';
import { element } from 'protractor';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Tip} from '../models/tip.model';

@Injectable({
    providedIn: 'root',
})

export class PostDataService {

    public server:string='http://localhost:5000/api/post/';
    constructor(private httpClient: HttpClient) {
       
    }


    getPostId(){
        return this.httpClient.get<any>(this.server+"makeID");
    }
    insert(post:Post){
        
        let content = JSON.stringify({ post });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
  
        return this.httpClient.post<any>(this.server+"add",data);
    }

    addAvatar(POST_ID:string,image:any){
        const formData:FormData =new FormData();
        formData.append("POST_AVATAR",image[0],image["filename"]);
        formData.append("POST_ID",POST_ID);

        return this.httpClient.post<any>(this.server+"add-avatar",formData);
    }

    getAllPosts(post:Post){
        let content = JSON.stringify({ post });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"allposts",data);
    }

    getPost(POST_ID:string){
        return this.httpClient.get<Post>(this.server+`singlePost/${POST_ID}`);
    }

    checkPost(POST_ID:string){
        const formData:FormData =new FormData();
        formData.append("POST_ID",POST_ID);

        return this.httpClient.post<any>(this.server+"checkPost",formData);
    }

    deletePost(POST_ID:string){
        const formData:FormData =new FormData();
        formData.append("POST_ID",POST_ID);

        return this.httpClient.post<any>(this.server+"deletePost",formData);
    }

    getAllTips(tip:Tip){
        let content = JSON.stringify({ tip });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"allTips",data);
    }

    addTip(tip:Tip){
        let content = JSON.stringify({ tip });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"addTip",data);
    }

    addTipAvatar(TIP_ID:string,image:any){
        const formData:FormData =new FormData();
        formData.append("TIP_AVATAR",image[0],image["filename"]);
        formData.append("TIP_ID",TIP_ID);

        return this.httpClient.post<any>(this.server+"addTipAvatar",formData);
    }

    updateTip(tip:Tip){
        let content = JSON.stringify({ tip });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"updateTip",data);
    }

    deleteTip(TIP_ID:string){
        const formData:FormData =new FormData();
        formData.append("TIP_ID",TIP_ID);

        return this.httpClient.post<any>(this.server+"deleteTip",formData);
    }
}
import { Injectable } from '@angular/core';
import { element } from 'protractor';
import {HttpClient,HttpHeaders} from '@angular/common/http';

import {SkinTest} from 'src/app/core/models/skin-test.model';
import {TestResult} from 'src/app/core/models/test-result.model';
import {Routine} from 'src/app/core/models/routine.module';
import { AdminRoutine } from 'src/app/core/models/admin-routine.model';
import  {SkinType} from 'src/app/core/models/skin-type.model';

@Injectable({
    providedIn: 'root',
})

export class SkincareDataService{

    public server:string='http://localhost:5000/api/skincare/';
    constructor(private httpClient: HttpClient) {
       
    }

    //skintest 
    getSkinTests(skintest: SkinTest ){
        let content = JSON.stringify({ skintest });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.httpClient.post<any>(this.server +"skintests",data);
    }

    addSkinTest(skintest: SkinTest){
        let content = JSON.stringify({ skintest });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.httpClient.post<any>(this.server +"addSkinTest",data);
    }

    
    updateSkinTest(skintest: SkinTest){
        let content = JSON.stringify({ skintest });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.httpClient.post<any>(this.server +"updateSkinTest",data);
    }

    deleteSkinTest(SKINTEST_ID:string){
        const formData=new FormData();
        formData.append("SKINTEST_ID",SKINTEST_ID);
        return this.httpClient.post<any>(this.server +"deleteSkinTest",formData);
    }

    submitTestResult(testResult:TestResult){
        let content = JSON.stringify({ testResult });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.httpClient.post<any>(this.server+ "testResult",data);
    }

    getSkinInfo(userId:string){
        const formData=new FormData();
        formData.append("USER_ID",userId);
        return this.httpClient.post<any>(this.server +"skinInfo",formData); 
    }

    getSkinRoutine(userId:string){
        const formData=new FormData();
        formData.append("USER_ID",userId);

        return this.httpClient.post<any>(this.server +"routineInfo",formData); 

    }

    //Admin routine
    getAllAdminRoutines(routine:AdminRoutine){
        let content = JSON.stringify({ routine });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.httpClient.post<any>(this.server+ "getAllAdminRoutines",data);
    }

    updateAdminRoutine(routine:AdminRoutine){
        let content = JSON.stringify({ routine });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.httpClient.post<any>(this.server+ "updateAdminRoutine",data);

    }

    updateAdminRoutineImage(ROUTINE_ID:string,newImage:any,oldImage:string){
        const formData:FormData =new FormData();
        formData.append("newImage",newImage[0],newImage["filename"]);
        formData.append("ROUTINE_ID",ROUTINE_ID);

        return this.httpClient.post<any>(this.server +"updateAdminRoutineImage",formData);

    }

    //User routine
    updateRoutine(routine:Routine){
        let content = JSON.stringify({ routine });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.httpClient.post<any>(this.server+ "routineUpdate",data);
    }

    updateRoutineImage(USER_ROUTINE_ID:string,newImage:any,oldImage:string){
        const formData:FormData =new FormData();
        formData.append("newImage",newImage[0],newImage["filename"]);
        formData.append("USER_ROUTINE_ID",USER_ROUTINE_ID);

        return this.httpClient.post<any>(this.server +"routineUpdateImage",formData);

    }

    deleteRoutine(USER_ROUTINE_ID:string){
        const formData:FormData =new FormData();
        formData.append("USER_ROUTINE_ID",USER_ROUTINE_ID);

        return this.httpClient.post<any>(this.server +"deleteRoutine",formData);
    }

    //skin type
    getAllSkinTypes(skinType:SkinType){
        let content = JSON.stringify({ skinType });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.httpClient.post<any>(this.server+ "getAllSkinTypes",data);
    }
    
    updateSkinType(skinType:SkinType){
        let content = JSON.stringify({ skinType });            
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.httpClient.post<any>(this.server+ "updateSkinType",data);
    }
}
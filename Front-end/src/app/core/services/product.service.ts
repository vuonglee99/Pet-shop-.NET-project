import { Injectable } from '@angular/core';
import { ProductType } from 'src/app/core/models/product-type.model'
import { element } from 'protractor';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import {Product} from 'src/app/core/models/product.model';
import { Question } from '../models/question.model';
import {Cart} from 'src/app/core/models/cart.model';
import {Order} from 'src/app/core/models/order.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {OrderStatus} from 'src/app/core/models/order-status.model';

@Injectable({
    providedIn: 'root',
})

export class ProductService{

    public server:string='http://localhost:5000/api/product/';
    constructor(private httpClient: HttpClient) {
       
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      };

    getAllProductType(prodType: ProductType ){
        const formData:FormData=new FormData();
        formData.append("PRODTYPE_NAME",prodType.PRODTYPE_NAME);

        return this.httpClient.post<any>(this.server +"allproductTypes",formData)
    }

    addProductType(productType:ProductType){
        const formData:FormData=new FormData();
        formData.append("PRODTYPE_ID",productType.PRODTYPE_ID);
        formData.append("PRODTYPE_NAME",productType.PRODTYPE_NAME);

        return this.httpClient.post<any>(this.server +"addProductType",formData)
    }

    updateProductType(productType:ProductType){
        const formData:FormData=new FormData();
        formData.append("PRODTYPE_ID",productType.PRODTYPE_ID);
        formData.append("PRODTYPE_NAME",productType.PRODTYPE_NAME);

        return this.httpClient.post<any>(this.server +"updateProductType",formData)
    }

    deleteProductType(PRODTYPE_ID:string){
        const formData:FormData=new FormData();
        formData.append("PRODTYPE_ID",PRODTYPE_ID);
        
        return this.httpClient.post<any>(this.server +"deleteProductType",formData)
    }

    getAllProducts(product:Product){
        let content = JSON.stringify({ product });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"allProducts",data);
    }

    addProduct(product:Product){
        let content = JSON.stringify({ product });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"addProduct",data).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
          );
    }

    addProductAvatar(PRODUCT_ID:string,image:any){
        const formData:FormData =new FormData();
        formData.append("PRODUCT_IMAGE",image,image["name"]);
        formData.append("PRODUCT_ID",PRODUCT_ID);

        return this.httpClient.post<any>(this.server+"addProductAvatar",formData).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
          );
    }

    deleteProduct(PRODUCT_ID:string){
        return this.httpClient.get<Product>(this.server+`deleteProduct/${PRODUCT_ID}`);
    }
    getProductDetail(PRODUCT_ID:string){
        return this.httpClient.get<Product>(this.server+`productDetail/${PRODUCT_ID}`);
    }

    updateProduct(product:Product){
        let content = JSON.stringify({ product });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"updateProduct",data);
    }


    getProductQuestion(PRODUCT_ID:string){
        const formData:FormData=new FormData();
        formData.append("PRODUCT_ID",PRODUCT_ID);
        return this.httpClient.post<Question>(this.server +"productQuestion",formData)
    }

    addQuestion(question:Question){
        let content = JSON.stringify({ question });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"addQuestion",data);
    }

    updateQuestion(question:Question){
        let content = JSON.stringify({ question });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"updateQuestion",data);
    }

    deleteQuestion(QUESTION_ID:string){
        const formData:FormData=new FormData();
        formData.append("QUESTION_ID",QUESTION_ID);
        return this.httpClient.post<any>(this.server+"deleteQuestion",formData);
    }
    addToCart(cart:Cart){
        let content = JSON.stringify({ cart });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"addToCart",data);
    }

    getCart(USER_ID:string){
        const formData:FormData=new FormData();
        formData.append("USER_ID",USER_ID);
        return this.httpClient.post<any>(this.server+"getCart",formData);
    }

    updateCart(cart:Cart){
        let content = JSON.stringify({ cart });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"updateCart",data);
    }

    deleteCart(cart:Cart){
        let content = JSON.stringify({ cart });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"deleteCart",data);
    }

    deleteCartById(cartList:Cart[]){
        let content = JSON.stringify({ cartList });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"deleteCartById",data);
    }

    getOrder(order:Order){
        let content = JSON.stringify({ order });          
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"getOrder",data);
    }

    addOrder(orderList:Order[]){
        let content = JSON.stringify({ orderList }); 
         
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"addOrder",data);
    }

    cancelOrder(orderID:string){
        const formData:FormData=new FormData();
        formData.append("ORDER_ID",orderID);
        return this.httpClient.post<any>(this.server+"cancelOrder",formData);
    }

    //order status
    getOrderStatus(orderStatus:OrderStatus){
        let content = JSON.stringify({ orderStatus }); 
         
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"getOrderStatus",data);
    }

    updateOrderStatus(orderStatus:OrderStatus){
        let content = JSON.stringify({ orderStatus }); 
         
        let data : any = {
            body: content,
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };
        return this.httpClient.post<any>(this.server+"updateOrderStatus",data);    
    }
}
import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { CategoriesService, CategoryViewModel, CATEGORY } from '../../../shared/service-proxy.module';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-admin-cate-add',
    templateUrl: 'cate-add.component.html'
})
export class AdminCateAddComponent extends AppComponentBase implements OnInit {

   cateInput:CATEGORY =new CATEGORY();
   cateList:CategoryViewModel[]=[];
   typeItems: SelectItem[] = [];
    cateParrentIDInput:any=0;
    newCateInput:CATEGORY=new CATEGORY();

    isBusy: boolean = false;
   

    ngOnInit() {
        this.getAllCategories();
    }

    constructor(
        injector: Injector,
        private categoriesService:CategoriesService,

    ) {
        super(injector);
        
    }
  

    getAllCategories(){
        this.isBusy=true;
        this.cateInput.parentID=-1;
        this.categoriesService.getAllCategory(this.cateInput).subscribe(res =>{
            this.isBusy=false;
            this.cateList=res;
            this.typeItems.push({ label: "Gốc", value: "'0'" });
            for (var i = 0; i < this.cateList.length; i++) {
                this.typeItems.push({ label: this.cateList[i].name, value: this.cateList[i].id })
              }
        });
    }
    
    addNew(){
        this.isBusy=true;
        this.newCateInput.parentID=parseInt(this.cateParrentIDInput);
        this.categoriesService.create(this.newCateInput).subscribe(res =>{
            this.isBusy=false;
            if(res !=null){
                //thành công
            }
        })
    }

    refresh(){
        this.typeItems=[];
        this.getAllCategories();
        this.newCateInput=new CATEGORY();
    }


}

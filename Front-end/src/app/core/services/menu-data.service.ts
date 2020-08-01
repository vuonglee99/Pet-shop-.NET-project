import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../models/menu.model';

@Injectable({
    providedIn: 'root',
})
/**
 * menu data service
 */
export class MenuDataService {

    getMenuList():MenuItem[] {
        return [
            {
                label:'Bảng tin',icon:'<span class="icon-feedback1"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>',link:""
            },
            {
                label:'Đăng bài',icon:'<span class="icon-edit-11"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span></span>',link:""
            },
            {
                label:'Tin tức',icon:'<span class="icon-idea1"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span></span>',link:''
            }
        ]
    }
}
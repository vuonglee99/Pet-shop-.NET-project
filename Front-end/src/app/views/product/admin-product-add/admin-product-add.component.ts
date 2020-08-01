import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppComponentBase } from '../../../shared/app-component-base';
import {
    PRODUCT, ProductViewModel, ProductsService, CommentsService, CommentViewModel,
    CategoriesService, CategoryViewModel, CATEGORY
} from '../../../shared/service-proxy.module';
import { Route, ActivatedRoute } from '@angular/router';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";
import { SelectItem } from 'primeng/api';



@Component({
    selector: 'app-admin-product-add',
    templateUrl: 'admin-product-add.component.html'
})


export class AdminProductAddComponent extends AppComponentBase implements OnInit {

    product: ProductViewModel;
    commentList: CommentViewModel[] = [];
    image: any = null;
    newProductForm: FormGroup;
    newProductInput: PRODUCT = new PRODUCT();
    title = "cloudsSorage";
    selectedFile: File = null;
    downloadURL: Observable<string>;
    cateInput: CATEGORY = new CATEGORY();
    cateList: CategoryViewModel[] = [];
    typeItems: SelectItem[] = [];

    isBusy: boolean = false;
    displayModal: boolean = false;
    imgURL: any;
    content: string;
    ngOnInit() {
        this.newProductInput.price = 0;
        this.newProductInput.star = 0;
        this.newProductInput.stock = 0;
        this.getAllCategories();
    }

    constructor(
        injector: Injector,
        private productService: ProductsService,
        private route: ActivatedRoute,
        private commentsService: CommentsService,
        private storage: AngularFireStorage,
        private categoriesService: CategoriesService,
    ) {
        super(injector);
        this.newProductForm = this.formBuilder.group({
            'name': new FormControl('', [Validators.required]),
            'price': new FormControl(Number, [Validators.required]),
            'stock': new FormControl(Number, [Validators.required]),
            'details': new FormControl(Number, [Validators.required])
        });
    }




    addProduct() {
        console.log(this.newProductInput);
        console.log(this.content);
        if (this.newProductForm.valid &&this.newProductInput.categoryId!=null) {
            this.isBusy = true;
            var n = Date.now();
            const filePath = `products/${n}`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(`products/${n}`, this.image);
            task
                .snapshotChanges()
                .pipe(
                    finalize(() => {
                        this.downloadURL = fileRef.getDownloadURL();
                        this.downloadURL.subscribe(url => {
                            if (url) {
                                this.newProductInput.imageURL = url;
                                var date = new Date();
                                this.newProductInput.dateCreated = this.getDate(date);
                                this.productService.create(this.newProductInput).subscribe(res => {
                                    this.isBusy = false;
                                    // if (res == true) {
                                    // }
                                })
                            }
                        });
                    })
                )
                .subscribe(url => {
                    if (url) {
                        this.imgURL = url;
                    }
                });
        } else this.displayModal = true;
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

    confirm() {
        if (this.newProductForm.valid) {
            this.confirmationService.confirm({
                message: 'Bạn có muốn thêm mới sản phẩm không?',
                accept: () => {
                    this.addProduct();
                }
            });
        } else this.displayModal = true;

    }

    refresh() {
        this.newProductInput = new PRODUCT();
    }

    onFileSelected(event) {
        for (let file of event.files) {
            this.image = file;
        }
    }

    editorInit(event) {
        const quill = event.editor;
        const toolbar = quill.getModule('toolbar');
        toolbar.addHandler('image', () => {
            const range = quill.getSelection();
            const value = prompt('What is the image URL');

            quill.insertEmbed(range.index, 'image', value, '');
        });
    }

    getAllCategories() {
        this.isBusy = true;
        this.cateInput.parentID = -1;
        this.categoriesService.getAllCategory(this.cateInput).subscribe(res => {
            this.isBusy = false;
            this.cateList = res;
            for (var i = 0; i < this.cateList.length; i++) {
                this.typeItems.push({ label: this.cateList[i].name, value: this.cateList[i].id })
            }
        });
    }
}



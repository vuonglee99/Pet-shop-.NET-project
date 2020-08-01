import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppComponentBase } from '../../../shared/app-component-base';
import { PRODUCT, ProductViewModel, ProductsService, CommentsService, CommentViewModel } from '../../../shared/service-proxy.module';
import { Route, ActivatedRoute } from '@angular/router';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";



@Component({
    selector: 'app-admin-product-detail',
    templateUrl: 'admin-product-detail.component.html'
})


export class AdminProductDetailComponent extends AppComponentBase implements OnInit {


    productID: number;
    product: ProductViewModel;
    commentList: CommentViewModel[] = [];
    image: any = null;
    editProductForm: FormGroup;
    editProductInput: PRODUCT = new PRODUCT();
    title = "cloudsSorage";
    selectedFile: File = null;
    downloadURL: Observable<string>;

    isEdit: boolean = false;
    isBusy: boolean = false;
    isEmpty: boolean = false;
    displayModal: boolean = false;
    imgURL: any;
    ngOnInit() {
        this.productID = parseInt(this.route.snapshot.paramMap.get("product_id"));
        console.log(this.productID);
        this.getProductByID();
        this.getAllProductComments();

    }

    constructor(
        injector: Injector,
        private productService: ProductsService,
        private route: ActivatedRoute,
        private commentsService: CommentsService,
        private storage: AngularFireStorage
    ) {
        super(injector);
        this.editProductForm = this.formBuilder.group({
            'name': new FormControl('', [Validators.required]),
            'price': new FormControl(Number, [Validators.required]),
            'stock': new FormControl(Number, [Validators.required]),
            'details': new FormControl(Number, [Validators.required])
        });
    }


    getProductByID() {
        this.isBusy = true;
        this.productService.getById(this.productID).subscribe(res => {
            this.isBusy = false;
            this.product = res;
            for (var property in this.product) {
                this.editProductInput[property] = this.product[property];
            }

        })
    }

    getAllProductComments() {
        this.isBusy = true;
        this.commentsService.getAllByProductId(this.productID).subscribe(res => {
            this.isBusy = false;
            this.commentList = res;
            if (this.commentList.length == 0) {
                this.isEmpty = true;
            } else this.isEmpty = false;
        })
    }


    uploadAvatar(file: any) {
        if (this.image != null) {
            this.isBusy = true;
            this.productService.uploadImage(this.productID, file).subscribe(res => {
                this.isBusy = false;
                if (res == true) {
                    console.log("xx");
                }
                console.log(res);
            })
        }
    }

    // updateProduct() {
    //     this.isBusy = true;
    //     this.uploadImage();
    //     console.log(this.imgURL);
    //     
    // }


    confirm() {
        if (this.editProductForm.valid) {
            this.confirmationService.confirm({
                message: 'Bạn có muốn lưu thông tin chỉnh sửa  không?',
                accept: () => {
                    this.updateProduct();
                }
            });
        } else this.displayModal = true;

    }

    refresh() {
        for (var property in this.product) {
            this.editProductInput[property] = this.product[property];
        }
        this.isEdit = false;
    }


    onFileSelected(event) {
        for (let file of event.files) {
            this.image = file;

        }
    }

    updateProduct() {
        this.isBusy = true;


        if (this.image != null) {
            if (this.editProductInput.imageURL) {
                this.deleteImage(this.editProductInput.imageURL);
            }
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
                                this.editProductInput.imageURL = url;
                                console.log(this.editProductInput.imageURL);
                                console.log(this.editProductInput);
                                this.productService.update(this.editProductInput).subscribe(res => {
                                    this.isBusy = false;
                                    if (res == true) {
                                        this.image = null;
                                        this.getProductByID();
                                    }
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
        } else {
            console.log(this.editProductInput.details);
            this.productService.update(this.editProductInput).subscribe(res => {
                this.isBusy = false;
                if (res == true) {
                    this.image = null;
                    this.getProductByID();
                }
            })
        }
    }

    deleteImage(url) {
        return this.storage.storage.refFromURL(url).delete();
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
}



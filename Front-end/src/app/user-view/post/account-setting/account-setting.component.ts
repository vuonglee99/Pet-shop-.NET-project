import { Component, OnInit, Injector, Input } from '@angular/core';
import { AppComponentBase } from '../../../shared/app-component-base';
import { UsersService, APPUSER, UserViewModel } from '../../../shared/service-proxy.module';
import { Router } from '@angular/router';
import { UserContextService } from '../../../core/services/user-context.service';
import { FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";



@Component({
    selector: 'app-account-setting',
    templateUrl: 'account-setting.component.html'
})
export class AccountSettingComponent extends AppComponentBase implements OnInit {

    editUserForm: FormGroup;
    currentUser: UserViewModel;
    user: UserViewModel;
    editUser: APPUSER = new APPUSER();
    dobInput: any = null;
    image: any = null;
    title = "cloudsSorage";
    selectedFile: File = null;
    downloadURL: Observable<string>;

    imgURL: any;
    public message: string;
    isBusy: boolean;
    ngOnInit() {
        this.currentUser = this.sessionService.getItem("currentUser");
        for (var property in this.currentUser) {
            this.editUser[property] = this.currentUser[property];
        }
        this.dobInput = this.strToDate(this.editUser.dob);
        this.imgURL = this.currentUser.avartar;
        this.titleService.setTitle("Tài khoản");
    }

    constructor(
        injector: Injector,
        private usersService: UsersService,
        private userContextService: UserContextService,
        private storage: AngularFireStorage

    ) {
        super(injector);
        this.editUserForm = this.formBuilder.group({
            'firstName': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            'lastName': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            'phoneNumber': new FormControl(Number, [Validators.required]),
            'userName': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            'email': new FormControl('', [Validators.required, Validators.email]),
        });
    }

    updateUser() {
        this.isBusy = true;
        if (this.image != null) {
            var n = Date.now();
            const filePath = `avatars/${n}`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(`avatars/${n}`, this.image[0]);
            task
                .snapshotChanges()
                .pipe(
                    finalize(() => {
                        this.downloadURL = fileRef.getDownloadURL();
                        this.downloadURL.subscribe(url => {
                            if (url) {
                                this.editUser.avatar = url;
                                this.editUser.dob = this.getDate(this.dobInput);
                                this.usersService.update(this.editUser).subscribe(res => {
                                    this.isBusy = false;
                                    if (res == true) {
                                        this.getUserByID();
                                    }
                                });
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
            this.editUser.dob = this.getDate(this.dobInput);
            this.usersService.update(this.editUser).subscribe(res => {
                this.isBusy = false;
                if (res == true) {
                    this.getUserByID();
                }
            });
        }

    }

    preview(files) {
        if (files.length === 0)
            return;

        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }

        var reader = new FileReader();
        this.image = files;
        console.log(this.image);
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
        }
    }

    getUserByID() {
        this.isBusy = true;
        this.usersService.getById(this.currentUser.id).subscribe(res => {
            this.isBusy = false;
            this.userContextService.setUser(res);
            this.redirectTo('/post/account', '');
        })
    }
}
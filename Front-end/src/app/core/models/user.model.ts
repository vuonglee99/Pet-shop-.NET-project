export class User {
    USER_ID :string;
	USER_NAME :string;
	USER_PASSWORD :string;
	USER_GENDER:string;
	USER_BIRTHDAY:Date;
	USER_EMAIL :string;
	USER_ADDRESS :string;
	USER_PHONENUMBER :string;
	USER_AVATAR:string;
	USER_ROLE:string;
   
	constructor(){
		this.USER_ID =null;
		this.USER_NAME =null;
		this.USER_PASSWORD =null;
		this.USER_GENDER=null;
		this.USER_BIRTHDAY=null;
		this.USER_EMAIL =null;
		this.USER_ADDRESS =null;
		this.USER_PHONENUMBER =null;
		this.USER_AVATAR="assets/images/avatar_2x.png";
		this.USER_ROLE=null;
	}
}
export class Routine{
    USER_ROUTINE_ID :string;
    USER_ID :string;
    SKINTYPE_NAME:string;
    ROUTINE_NUMBER:number;
	ROUTINE_NAME :string;
	ROUTINE_PRODUCT :string;
	ROUTINE_IMAGE :string;
    ROUTINE_NOTE :string;
    ROUTINE_RATING:number;

    constructor(){
        this.USER_ROUTINE_ID =null;
        this.USER_ID =null;
        this.SKINTYPE_NAME=null;
        this.ROUTINE_NUMBER=null;
	    this.ROUTINE_NAME =null;
	    this.ROUTINE_PRODUCT =null;
	    this.ROUTINE_IMAGE =null;
        this.ROUTINE_NOTE =null;
        this.ROUTINE_RATING=null;
    }
}
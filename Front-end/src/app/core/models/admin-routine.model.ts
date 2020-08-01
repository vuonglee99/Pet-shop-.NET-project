export class AdminRoutine{
    ROUTINE_ID:string;
    SKINTYPE_NAME:string;
    ROUTINE_NUMBER:number;
	ROUTINE_NAME :string;
	ROUTINE_PRODUCT :string;
	ROUTINE_IMAGE :string;
    ROUTINE_NOTE :string;
    ROUTINE_RATING:number;

    constructor(){
        this.ROUTINE_ID="";
        this.SKINTYPE_NAME=null;
        this.ROUTINE_NUMBER=null;
	    this.ROUTINE_NAME =null;
	    this.ROUTINE_PRODUCT =null;
	    this.ROUTINE_IMAGE =null;
        this.ROUTINE_NOTE =null;
        this.ROUTINE_RATING=null;
    }
}
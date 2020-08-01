export class Tip{
    TIP_ID:string;
    TIP_TITLE:string;
    TIP_META_CONTENT:string;
    TIP_CONTENT:string;
    TIP_AVATAR:string;
    TIP_DATE:string;
    TIP_STATUS:string;

    constructor(){
        this.TIP_ID=null;
        this.TIP_TITLE=null;
        this.TIP_META_CONTENT=null;
        this.TIP_CONTENT=null;
        this.TIP_AVATAR=null;
        this.TIP_DATE=null;
        this.TIP_STATUS="1";
    }
}
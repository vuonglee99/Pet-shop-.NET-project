export class Order{
    ORDER_ID:string;
    USER_ID:string;
    USER_NAME:string;
    ORDER_PAYMENT:string;
    USER_ADDRESS:string;
    USER_PHONENUMBER:number;
    ORDER_MAKEDATE:string;
    ORDER_DATE:string;
    DISCOUNT_ID:string;
    ORDER_TOTALTMP:number;
    ORDER_TOTAL:number;
    ORDER_STATUS:string;
    ORDER_NOTE:string;
    PRODUCT_ID:string;
    PRODUCT_NAME:string;
    PRODUCT_PRICE:number;
    PRODUCT_IMAGE:string;
    PRODUCT_AMOUNT:number;
    RECORD_STATUS:string;
    ORDER_PROCESSING:number

    constructor(){
        this.ORDER_ID="";
        this.USER_ID=null;
        this.USER_NAME=null;
        this.ORDER_PAYMENT="Thanh toán tiền mặt khi nhận hàng";
        this.USER_ADDRESS=null;
        this.USER_PHONENUMBER=null;
        this.ORDER_MAKEDATE=null;
        this.ORDER_DATE=null;
        this.DISCOUNT_ID="";
        this.ORDER_TOTALTMP=0;
        this.ORDER_TOTAL=null;
        this.ORDER_STATUS="Đã tiếp nhận đơn hàng";
        this.ORDER_NOTE="";
        this.PRODUCT_ID=null;
        this.PRODUCT_NAME=null;
        this.PRODUCT_PRICE=null;
        this.PRODUCT_IMAGE=null;
        this.PRODUCT_AMOUNT=0;
        this.RECORD_STATUS='1';
        this.ORDER_PROCESSING=25;
    }
}
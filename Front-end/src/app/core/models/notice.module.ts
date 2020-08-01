export class Notice {
    NOTICE_ID: string;
    NOTICE_FROM: string;
    USER_ID: string;
    NOTICE_TITLE: string;
    NOTICE_CONTENT: string;
    NOTICE_DATE: string;
    NOTICE_STATUS: string;
    RECORD_STATUS: string;

    constructor() {
        this.NOTICE_ID = "";
        this.NOTICE_FROM = null;
        this.USER_ID = null;
        this.NOTICE_TITLE = null;
        this.NOTICE_CONTENT = null;
        this.NOTICE_DATE = null;
        this.NOTICE_STATUS = '0'
        this.RECORD_STATUS = '1'
    }
}
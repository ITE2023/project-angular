export class MerchantListItem {
    public id?: number;
    public name?: string;
    public representer?: string;
    public phone?: string;
    public status?: string;
    public datecreated?: string;
    public children?: MerchantListItem[];
    public showChildren?: boolean;
    public invisible?: boolean;
    public parentId?:number; 
}
export class MerchantSearchItem {
    public name?: string;
    public representer?: string;
    public phone?: string;
    public status?: number;
}
export class MerchantStaffListItem {
    public staff_code?: number;
    public staff_name?: string;
    public phone?: string;
    public birthday?: string;
    public identity?:string; 
}
export class MerchantStaffSearchItem {
    public name?: string;
    public phone?: string;
    public identity?: string;
}
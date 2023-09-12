export class PaidTranInfoModel {
    id: string;
    merchant: string;
    tranCode: string;
    partner: string;
    bank: string;
    invoiceNumber: string;
    traceNumber: string;
    amount: number;
    detail: string;
    status: string;
    status_code: string;
    dateCreate: string;
}

// export class TranSearchModel {
//     dateFrom?: string;
//     dateTo?: string;
//     merchant?: number;
//     bank?: number;
//     bankType?: string;
//     status?: string;
//     partner?: number;
//     refundStatus?: RefundStatus;
//     refundType?: RefundType;
//     textSearch?: string;
// }

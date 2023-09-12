export class db_transation {
    public total_transaction: number;
    public total_amount: number;
}

export class db_refund {
    public total_refund: number;
    public total_amount: number;
}

export class db_revenue_yesterday {
    public value: string;
    public type: number;
}
export class db_revenue_month {
    public value: string;
    public type: number;
}

export class db_statistic {
    public transation: db_transation;
    public refund: db_refund;
    public revenue_yesterday: db_revenue_yesterday;
    public revenue_month: db_revenue_month;
}

export class db_transactions {
    public merchant_code: string;
    public transaction_ref: string;
    public transaction_id: string;
    public transaction_time: string;
    public status_name: string;
    public transaction_amount: string;
    public currency: string;
}

export class db_chart {
    public unit: number;
    public transaction: number;
    public revenue: number;
}
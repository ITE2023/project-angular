export const MockTransactionAmount = [
  {
    merchant_info: { id: "101204", name: "Chè bốn mùa", bizname: "CheBonMua", mcc: "4815", agency_id: 100521, activated_day: "20/10/2020" },
    transaction_success: 31
  }
];

export const MockTransactionValue = [
  {
    merchant_info: { id: "101204", name: "Chè bốn mùa", bizname: "CheBonMua", mcc: "4815", agency_id: 100521, activated_day: "20/10/2020" },
    amount_transaction_success: 31
  }
];

export const MockMerchantStatus = [{ status: "active", merchant_count: 35, ratio: 69 }, { status: "wait", merchant_count: 16, ratio: 31 }];

export const MockMerchantRevenue = [{
  "amount_transaction_success": 552000,
  "transaction_success": 4,
  "statistic_day": "23/12/2020"
}];

export const MockPaymentTransaction = [
  { transaction_status: "wait", quantity: 10, amount: 0, ratio: 50 },
  { transaction_status: "success", quantity: 10, amount: 0, ratio: 50 }
];

export const MockRefundTransaction = [
  { transaction_status: "02", quantity: 1, amount: 1, ratio: 50 },
  { transaction_status: "01", quantity: 1, amount: 1, ratio: 50 }
];

export const MockErrorCode = [
  { response_code: "00", quantity: 58, ratio: 50 },
  { response_code: "01", quantity: 58, ratio: 50 }
];

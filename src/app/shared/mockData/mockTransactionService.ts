export const MockMasterMerchants = [
  { value: 100730, desc: "Shop Mỹ Phẩm 123" },
  { value: 101185, desc: "Nem nướng" }
];

export const MockSubMerchants = [
  {
    merchant_biz_name: "Me Nam",
    merchant_id: 101945,
    merchant_name: "Shop mẹ Nấm cơ sở 2",
  },
  {
    merchant_biz_name: "Me Nam 2",
    merchant_id: 101946,
    merchant_name: "Shop mẹ Nấm cơ sở 22",
  },
];

export const MockTransactionStatus = [
  { value: "00", desc: "Success" },
  { value: "01", desc: "wait_pay" },
  { value: "02", desc: "cancel" },
  { value: "03", desc: "Fail" },
  { value: "04", desc: "wait_otp" },
  { value: "05", desc: "otp_fail" },
];

export const MockTransactionPaymentMethod = [
  { value: 182, desc: "Viettel pay" },
  { value: 561, desc: "Thẻ nội địa số 1" },
  { value: 101, desc: "Momo" }
];

export const MockIssuerTransaction = [
  { value: "970407", desc: "Ngân hàng TMCP Kỹ thương" },
  { value: "9399393", desc: "abc34333" },
  { value: "12344444", desc: "abc3" }
];

export const MockTransactionChannel = [
  { channel_code: "123", channel_name: "Kênh giao dịch mới" },
  { channel_code: "online", channel_name: "Online" },
  { channel_code: "00100", channel_name: "kênh testabc" }
];

export const MockTransactionPaymentList = [
  { id: "30c273eaa27ab70a2ba6444bf440b10a", transNumber: "220000002", transChannel: "qr" },
  { id: "ebd61aef5efb5d71b9c564182063143e", transNumber: "220000001", transChannel: "qr" },
  { id: "a9513447f5fa0b339904174813a29f42", transNumber: "210000001", transChannel: "online" },
  { id: "bcc51f9764c8fda5f405239538ca50c9", transNumber: "180000004", transChannel: "qr" },
  { id: "a5b6188049a476e536de8ceba9731307", transNumber: "180000003", transChannel: "online" },
  { id: "fdfc75ddd283e57bb6ffad854df9cb69", transNumber: "180000002", transChannel: "online" },
  { id: "50e30b9ff34df82dc5017008e7e83b72", transNumber: "180000001", transChannel: "online" },
];

export const MockRefundReason = [
  { value: "customer_request", desc: "Theo yêu cầu khách hàng" },
  { value: "error_product", desc: "Hàng lỗi/hỏng/đổi trả" },
  { value: "not_support", desc: "Không có SPDV cung cấp" },
  { value: "other", desc: "Khác" }
];

export const MockIssuerRefundMethod = [
  { value: "api", desc: "API" },
  { value: "file", desc: "File" },
  { value: "manual", desc: "Thủ công" }
];

export const MockRefundStatusCode = [
  { value: "00", desc: "success" },
  { value: "01", desc: "merchant_request_refund" },
  { value: "02", desc: "send_to_issuer" },
  { value: "03", desc: "fail_at_issuer" },
  { value: "04", desc: "issuer_received" },
  { value: "05", desc: "n/a" },
];

export const MockTransactionRefundList = [
  {
    Id: "5ff68d19b4f46b6f1962fe17",
    createdAt: "Jan 7, 2021 11:24:56 AM",
    creatorId: 0,
    creatorVia: "MA",
    currency: 704,
    desc: "Theo yêu cầu khách hàng",
    issuerId: "970415",
    issuerInfo: { id: 606, code: "970415", name: "Ngân hàng TMCP Ngoại Thương Việt Nam", bin: ["970415"], },
    issuerJobId: 0,
    merchantId: "101942",
    merchantInfo: { id: "101942", name: "Thế giới di động", bizname: "Thế giới di động", mcc: "4815", agency_id: 100521, },
    activated_day: "06/01/2021",
    agency_id: 100521,
    bizname: "Thế giới di động",
    id: "101942",
    mcc: "4815",
    name: "Thế giới di động",
    merchantJobId: 0,
    merchantRefundFee: [{ id: 2, code: "handling", desc: "Phí xử lý giao dịch", fixed_value: 0, percent_value: 0 },],
    methodId: 0,
    refundNumber: "700000001",
    refundType: "full",
    reqAmount: 15000,
    requestTime: "Jan 7, 2021 11:24:54 AM",
    statusCode: "01",
    stt: 0,
    transactionReferenceId: "b14c0ed52f57259112a9eb2e249b66d8",
    txnAmount: 0,
    updaterId: 0,
  },
  {
    Id: "5ff68d19b4f46b6f1962fe18",
    createdAt: "Jan 7, 2021 11:24:56 AM",
    creatorId: 0,
    creatorVia: "MA",
    currency: 704,
    desc: "Theo yêu cầu khách hàng",
    issuerId: "970415",
    issuerInfo: { id: 606, code: "970415", name: "Ngân hàng TMCP Ngoại Thương Việt Nam", bin: ["970415"], },
    issuerJobId: 0,
    merchantId: "101942",
    merchantInfo: { id: "101942", name: "Thế giới di động", bizname: "Thế giới di động", mcc: "4815", agency_id: 100521, },
    activated_day: "06/01/2021",
    agency_id: 100521,
    bizname: "Thế giới di động",
    id: "101942",
    mcc: "4815",
    name: "Thế giới di động",
    merchantJobId: 0,
    merchantRefundFee: [{ id: 2, code: "handling", desc: "Phí xử lý giao dịch", fixed_value: 0, percent_value: 0 },],
    methodId: 0,
    refundNumber: "700000001",
    refundType: "full",
    reqAmount: 15000,
    requestTime: "Jan 7, 2021 11:24:54 AM",
    statusCode: "01",
    stt: 0,
    transactionReferenceId: "b14c0ed52f57259112a9eb2e249b66d8",
    txnAmount: 0,
    updaterId: 0,
  }
]

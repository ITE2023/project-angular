export const MockIssuerStatus = [
  { value: "active", desc: "Active" },
  { value: "locked", desc: "Inactive" },
  { value: "wait", desc: "PendingApproval" },
  { value: "reject", desc: "Rejected" }
];

export const MockIssuerLists = [
  {
    agent_email: "vietcombank@gmail.com",
    agent_identity: null,
    agent_name: "Nguyễn Văn A",
    agent_phone: "0978451236",
    banks_connected: [{ bank_bin: null, bank_name: null }],
    bin_code: [{ bin: "970436" }],
    connected_at: "21/12/2020",
    contract: { sign_date: "12/01/2021", expire_date: "12/01/2021", activated_date: null,
    contract_image: ["http://35.223.25.100:8008/vtl-pg/mm/media/issuer/contract/D840C42A421958F111C9198A13957718-0.pdf"] },
    expired_at: "23/12/2020",
    is_confirm_enable: null,
    issuer_biz_name: "VCB",
    issuer_code: "11111",
    issuer_id: 583,
    issuer_name: "Vietcombank",
    logo: "http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/66F7BF9E5FE1752C8AC2D2ACF7BE9CB9.jpg",
    maximum_value: null,
    minimum_confirm_value: null,
    minimum_value: null,
    payment_method: [{ method_id: 321, payment_method_name: "Thẻ ATM nội địa", activated: 1, fee_method_code: "end_session", }],
    status: "wait",
    status_name: "PendingApproval"
  },
  {
    agent_email: "vietcombank@gmail.com",
    agent_identity: null,
    agent_name: "Nguyễn Văn A",
    agent_phone: "0978451236",
    banks_connected: [{ bank_bin: null, bank_name: null }],
    bin_code: [{ bin: "970436" }],
    connected_at: "21/12/2020",
    contract: { sign_date: "12/01/2021", expire_date: "12/01/2021", activated_date: null },
    expired_at: "23/12/2020",
    is_confirm_enable: null,
    issuer_biz_name: "VCB",
    issuer_code: "11111",
    issuer_id: 555,
    issuer_name: "Vietcombank",
    logo: "http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/66F7BF9E5FE1752C8AC2D2ACF7BE9CB9.jpg",
    maximum_value: null,
    minimum_confirm_value: null,
    minimum_value: null,
    payment_method: [{ method_id: 321, payment_method_name: "Thẻ ATM nội địa", activated: 1, fee_method_code: "end_session", }],
    status: "wait",
    status_name: "PendingApproval"
  },
];

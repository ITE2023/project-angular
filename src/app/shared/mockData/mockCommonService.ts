import { CommonService } from "@core/services";
import { Observable, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
export const MockRole = [{
  value: 4,
  desc: 'BQT - Quản lý',
},
{
  value: 5,
  desc: 'BQT - Nhân viên',
},
{
  value: 6,
  desc: 'Sản phẩm - Quản lý',
},
{
  value: 7,
  desc: 'Sản phẩm - Nhân viên',
},
{
  value: 8,
  desc: 'Kinh doanh - Quản lý',
},
{
  value: 9,
  desc: 'Kinh doanh - Nhân viên',
},]
export const MockOutputUsers = [
  {
    id: 402,
    fullName: 'Trần Văn Thành',
    account: 'thanh',
    phone: '0975588771',
    department: 'Full quyền',
    departmentId: 201,
    email: 'qhacvkxh@zeroe.ml',
    address: undefined,
    createdDate: undefined,
    role: undefined,
    status: 1,
    statusName: 'Active',
    avatar: null,
  },
  {
    id: 395,
    fullName: 'Lê Ngọc Anh',
    account: 'ngocanhle',
    phone: '0988771147',
    department: 'Phòng Sản Phẩm',
    departmentId: 61,
    email: 'gbfzscuh@laste.ml',
    status: 1,
    statusName: 'Active',
    avatar: null,
    address: undefined,
    createdDate: undefined,
    role: undefined,
  },
  {
    id: 394,
    fullName: 'Nguyễn Văn Anh',
    account: 'anhnv',
    phone: '0987477569',
    department: 'Full quyền',
    departmentId: 201,
    email: 'anhnv@gmail.com',
    status: 1,
    statusName: 'Active',
    avatar: null,
    address: undefined,
    createdDate: undefined,
    role: undefined,
  },
  {
    id: 393,
    fullName: 'Nhân viên Sản phẩm',
    account: 'nvsanpham',
    phone: '0987654328',
    department: 'Phòng Sản Phẩm',
    departmentId: 61,
    email: 'ecidaavwc@emltmp.com',
    status: 1,
    statusName: 'Active',
    avatar: null,
    address: undefined,
    createdDate: undefined,
    role: undefined,
  },
  {
    id: 392,
    fullName: 'Nhân viên Sản phẩm',
    account: 'nvsp',
    phone: '0973824589',
    department: 'Phòng Sản Phẩm',
    departmentId: 61,
    email: 'nvsanpham@gmail.com',
    status: 2,
    statusName: 'PendingApproval',
    avatar: null,
    address: undefined,
    createdDate: undefined,
    role: undefined,
  },
  {
    id: 382,
    fullName: 'Sản phẩm Nhân viên',
    account: 'yqwjajwodolt@dropmail.me',
    phone: '02435324422',
    department: 'Full quyền',
    departmentId: 201,
    email: 'yqwjajwodolt@dropmail.me',
    status: 1,
    statusName: 'Active',
    avatar: null,
    address: undefined,
    createdDate: undefined,
    role: undefined,
  },
  {
    id: 372,
    fullName: 'trần ngô kim ngân',
    account: 'ngokimngan',
    phone: '0912003475',
    department: 'Full quyền',
    departmentId: 201,
    email: 'xafankrl@yomail.info',
    status: 1,
    statusName: 'Active',
    avatar: null,
    address: undefined,
    createdDate: undefined,
    role: undefined,
  },
  {
    id: 362,
    fullName: 'Phạm Thị Thanh Huyền',
    account: 'huyenQL',
    phone: '0367977066',
    department: 'TK Test',
    departmentId: 101,
    email: 'wdejbkbv@yomail.info',
    status: 1,
    statusName: 'Active',
    avatar: null,
    address: undefined,
    createdDate: undefined,
    role: undefined,
  },
  {
    id: 353,
    fullName: 'Test Quản Lý',
    account: 'test_ql',
    phone: '0988589125',
    department: 'TK Test',
    departmentId: 101,
    email: 'hfldyqhwc@emltmp.com',
    status: 1,
    statusName: 'Active',
    avatar: null,
    address: undefined,
    createdDate: undefined,
    role: undefined,
  },
  {
    id: 352,
    fullName: 'Test Nhân Viên',
    account: 'test_nv',
    phone: '0988589124',
    department: 'TK Test',
    departmentId: 101,
    email: 'yxdeekpe@10mail.org',
    status: 1,
    statusName: 'Active',
    avatar: null,
    address: undefined,
    createdDate: undefined,
    role: undefined,
  },
]
export const MockUsers = [
  {
    fullname: "Trần Văn Thành",
    user_id: 402,
    username: "thanh",
    phone: "0975588771",
    email: "qhacvkxh@zeroe.ml",
    created_date: "17/08/2020",
    role: "TCĐS -Nhân viên",
    last_login: "17/08/2020 15:58",
    avatar: null,
    role_id: 10,
    centre_id: 201,
    centre_name: "Full quyền",
    language: "vi",
    status: 1,
    status_name: "Active",
  },
  {
    fullname: "Lê Ngọc Anh",
    user_id: 395,
    username: "ngocanhle",
    phone: "0988771147",
    email: "gbfzscuh@laste.ml",
    created_date: "11/08/2020",
    role: "Sản phẩm - Quản lý",
    last_login: "11/08/2020 13:58",
    avatar: null,
    role_id: 6,
    centre_id: 61,
    centre_name: "Phòng Sản Phẩm",
    language: "vi",
    status: 1,
    status_name: "Active",
  },
  {
    fullname: "Nguyễn Văn Anh",
    user_id: 394,
    username: "anhnv",
    phone: "0987477569",
    email: "anhnv@gmail.com",
    created_date: "11/08/2020",
    role: "Quản trị hệ thống",
    last_login: null,
    avatar: null,
    role_id: 1,
    centre_id: 201,
    centre_name: "Full quyền",
    language: "vi",
    status: 1,
    status_name: "Active",
  },
  {
    fullname: "Nhân viên Sản phẩm",
    user_id: 393,
    username: "nvsanpham",
    phone: "0987654328",
    email: "ecidaavwc@emltmp.com",
    created_date: "11/08/2020",
    role: "Sản phẩm - Nhân viên",
    last_login: "14/08/2020 11:33",
    avatar: null,
    role_id: 7,
    centre_id: 61,
    centre_name: "Phòng Sản Phẩm",
    language: "vi",
    status: 1,
    status_name: "Active",
  },
  {
    fullname: "Nhân viên Sản phẩm",
    user_id: 392,
    username: "nvsp",
    phone: "0973824589",
    email: "nvsanpham@gmail.com",
    created_date: "11/08/2020",
    role: "Sản phẩm - Nhân viên",
    last_login: null,
    avatar: null,
    role_id: 7,
    centre_id: 61,
    centre_name: "Phòng Sản Phẩm",
    language: "vi",
    status: 2,
    status_name: "PendingApproval",
  },
  {
    fullname: "Sản phẩm Nhân viên",
    user_id: 382,
    username: "yqwjajwodolt@dropmail.me",
    phone: "02435324422",
    email: "yqwjajwodolt@dropmail.me",
    created_date: "05/08/2020",
    role: "Sản phẩm - Nhân viên",
    last_login: "05/08/2020 13:42",
    avatar: null,
    role_id: 7,
    centre_id: 201,
    centre_name: "Full quyền",
    language: "vi",
    status: 1,
    status_name: "Active",
  },
  {
    fullname: "trần ngô kim ngân",
    user_id: 372,
    username: "ngokimngan",
    phone: "0912003475",
    email: "xafankrl@yomail.info",
    created_date: "03/08/2020",
    role: "Quản trị hệ thống",
    last_login: "03/08/2020 10:21",
    avatar: null,
    role_id: 1,
    centre_id: 201,
    centre_name: "Full quyền",
    language: "vi",
    status: 1,
    status_name: "Active",
  },
  {
    fullname: "Phạm Thị Thanh Huyền",
    user_id: 362,
    username: "huyenQL",
    phone: "0367977066",
    email: "wdejbkbv@yomail.info",
    created_date: "22/07/2020",
    role: "Quản trị hệ thống <Test>",
    last_login: null,
    avatar: null,
    role_id: 2,
    centre_id: 101,
    centre_name: "TK Test",
    language: "vi",
    status: 1,
    status_name: "Active",
  },
  {
    fullname: "Test Quản Lý",
    user_id: 353,
    username: "test_ql",
    phone: "0988589125",
    email: "hfldyqhwc@emltmp.com",
    created_date: "20/07/2020",
    role: "Quản trị hệ thống <Test>",
    last_login: "22/07/2020 15:15",
    avatar: null,
    role_id: 2,
    centre_id: 101,
    centre_name: "TK Test",
    language: "vi",
    status: 1,
    status_name: "Active",
  },
  {
    fullname: "Test Nhân Viên",
    user_id: 352,
    username: "test_nv",
    phone: "0988589124",
    email: "yxdeekpe@10mail.org",
    created_date: "20/07/2020",
    role: "Nhân viên hệ thống <Test>",
    last_login: "23/07/2020 15:13",
    avatar: null,
    role_id: 3,
    centre_id: 101,
    centre_name: "TK Test",
    language: "vi",
    status: 1,
    status_name: "Active",
  },
];
export const MockUnit = [
  {
    centre_id: 231,
    centre_name: "CANIFA",
    email: "thinhnv@gmail.com",
    status: 1,
    status_name: "Hoạt động",
    created_date: "11/08/2020",
    roles: [
      {
        role_id: 4,
        role_name: "BQT - Quản lý",
      },
      {
        role_id: 1,
        role_name: "Quản trị hệ thống",
      },
      {
        role_id: 11,
        role_name: "Nhân viên CSKH",
      },
      {
        role_id: 9,
        role_name: "Kinh doanh - Nhân viên",
      },
      {
        role_id: 8,
        role_name: "Kinh doanh - Quản lý",
      },
      {
        role_id: 7,
        role_name: "Sản phẩm - Nhân viên",
      },
      {
        role_id: 6,
        role_name: "Sản phẩm - Quản lý",
      },
      {
        role_id: 5,
        role_name: "BQT - Nhân viên",
      },
    ],
  },
  {
    centre_id: 221,
    centre_name: "Sản phẩm",
    email: "sanpham@gmail.com",
    status: 1,
    status_name: "Hoạt động",
    created_date: "20/07/2020",
    roles: [
      {
        role_id: 10,
        role_name: "TCĐS -Nhân viên",
      },
      {
        role_id: 1,
        role_name: "Quản trị hệ thống",
      },
      {
        role_id: 11,
        role_name: "Nhân viên CSKH",
      },
    ],
  },
  {
    centre_id: 211,
    centre_name: "PB Test",
    email: "admin@gmail.com",
    status: 1,
    status_name: "Hoạt động",
    created_date: "15/07/2020",
    roles: [
      {
        role_id: 4,
        role_name: "BQT - Quản lý",
      },
      {
        role_id: 5,
        role_name: "BQT - Nhân viên",
      },
    ],
  },
  {
    centre_id: 202,
    centre_name: "ĐV01",
    email: "dv01@gmail.com",
    status: 1,
    status_name: "Hoạt động",
    created_date: "09/07/2020",
    roles: [
      {
        role_id: null,
        role_name: null,
      },
    ],
  },
  {
    centre_id: 201,
    centre_name: "Full quyền",
    email: "tranthom.ptit252@gmail.com",
    status: 1,
    status_name: "Hoạt động",
    created_date: "09/07/2020",
    roles: [
      {
        role_id: 4,
        role_name: "BQT - Quản lý",
      },
      {
        role_id: 1,
        role_name: "Quản trị hệ thống",
      },
      {
        role_id: 11,
        role_name: "Nhân viên CSKH",
      },
      {
        role_id: 10,
        role_name: "TCĐS -Nhân viên",
      },
      {
        role_id: 9,
        role_name: "Kinh doanh - Nhân viên",
      },
      {
        role_id: 8,
        role_name: "Kinh doanh - Quản lý",
      },
      {
        role_id: 7,
        role_name: "Sản phẩm - Nhân viên",
      },
      {
        role_id: 6,
        role_name: "Sản phẩm - Quản lý",
      },
      {
        role_id: 5,
        role_name: "BQT - Nhân viên",
      },
    ],
  },
  {
    centre_id: 191,
    centre_name: "Đơn vị hành chính",
    email: "dvhc@gmail.com",
    status: 0,
    status_name: "Không hoạt động",
    created_date: "08/07/2020",
    roles: [
      {
        role_id: null,
        role_name: null,
      },
    ],
  },
  {
    centre_id: 184,
    centre_name: "How you like that",
    email: "hylt@gmail.com",
    status: 0,
    status_name: "Không hoạt động",
    created_date: "07/07/2020",
    roles: [
      {
        role_id: 4,
        role_name: "BQT - Quản lý",
      },
      {
        role_id: 2,
        role_name: "Quản trị hệ thống <Test>",
      },
    ],
  },
  {
    centre_id: 183,
    centre_name: "Phản ứng chậm",
    email: "puc@viettel.com.vn",
    status: 0,
    status_name: "Không hoạt động",
    created_date: "07/07/2020",
    roles: [
      {
        role_id: 9,
        role_name: "Kinh doanh - Nhân viên",
      },
      {
        role_id: 3,
        role_name: "Nhân viên hệ thống <Test>",
      },
      {
        role_id: 1,
        role_name: "Quản trị hệ thống",
      },
      {
        role_id: 11,
        role_name: "Nhân viên CSKH",
      },
    ],
  },
  {
    centre_id: 182,
    centre_name: "Phản ứng nhanh",
    email: "pun@viettel.com.vn",
    status: 1,
    status_name: "Hoạt động",
    created_date: "07/07/2020",
    roles: [
      {
        role_id: 3,
        role_name: "Nhân viên hệ thống <Test>",
      },
    ],
  },
  {
    centre_id: 181,
    centre_name: "Phòng cháy chữa cháy",
    email: "pccc@viettel.com.vn",
    status: 0,
    status_name: "Không hoạt động",
    created_date: "07/07/2020",
    roles: [
      {
        role_id: 5,
        role_name: "BQT - Nhân viên",
      },
    ],
  },
];
export const MockTrans = [
  {
    transaction_id: "d982de0808ad5ec112e35bf415287ea4",
    master_id: null,
    merchant_id: "100631",
    merchant_name: "Cửa hàng cấp 1 của Dứa",
    order_reference: "2020081294445269044",
    amount: 200000,
    status: "Success",
    payment_method: null,
    channel: "Web",
    transaction_number: "225000010",
    trans_time: "12/08/2020 15:09:15",
  },
  {
    transaction_id: "40060fac25d9352b1d1429301964c95e",
    master_id: null,
    merchant_id: "100631",
    merchant_name: "Cửa hàng cấp 1 của Dứa",
    order_reference: "2020081275290278408",
    amount: 200000,
    status: "Idle",
    payment_method: null,
    channel: "Web",
    transaction_number: "225000009",
    trans_time: "12/08/2020 15:07:23",
  },
  {
    transaction_id: "09fc45975e2317627ea859988cc08a6d",
    master_id: null,
    merchant_id: "100631",
    merchant_name: "Cửa hàng cấp 1 của Dứa",
    order_reference: "2020081234653565259",
    amount: 20000,
    status: "Idle",
    payment_method: null,
    channel: "Web",
    transaction_number: "225000008",
    trans_time: "12/08/2020 14:43:24",
  },
  {
    transaction_id: "d504a9083b67d403eb5c82109de90654",
    master_id: null,
    merchant_id: "100631",
    merchant_name: "Cửa hàng cấp 1 của Dứa",
    order_reference: "2020081236242264395",
    amount: 200000,
    status: "Idle",
    payment_method: null,
    channel: "Web",
    transaction_number: "225000007",
    trans_time: "12/08/2020 14:39:36",
  },
  {
    transaction_id: "8f3439dc33d691a96571694975d6813f",
    master_id: null,
    merchant_id: "100631",
    merchant_name: "Cửa hàng cấp 1 của Dứa",
    order_reference: "2020081266885511061",
    amount: 200000,
    status: "Idle",
    payment_method: null,
    channel: "Web",
    transaction_number: "225000006",
    trans_time: "12/08/2020 14:37:17",
  },
  {
    transaction_id: "f9681e84fbb60450c057e1cb80d95682",
    master_id: null,
    merchant_id: "100631",
    merchant_name: "Cửa hàng cấp 1 của Dứa",
    order_reference: "2020081286139627395",
    amount: 200000,
    status: "Idle",
    payment_method: null,
    channel: "Web",
    transaction_number: "225000005",
    trans_time: "12/08/2020 14:34:47",
  },
  {
    transaction_id: "68abbf80350fb425bd7147488b32725b",
    master_id: null,
    merchant_id: "100631",
    merchant_name: "Cửa hàng cấp 1 của Dứa",
    order_reference: "2020081275790759163",
    amount: 200000,
    status: "Idle",
    payment_method: null,
    channel: "Web",
    transaction_number: "225000004",
    trans_time: "12/08/2020 14:33:40",
  },
  {
    transaction_id: "38059a8f8f7033c9896094eb0d97b6d2",
    master_id: null,
    merchant_id: "100631",
    merchant_name: "Cửa hàng cấp 1 của Dứa",
    order_reference: "2020081226810757859",
    amount: 20000,
    status: "Idle",
    payment_method: null,
    channel: "Web",
    transaction_number: "225000003",
    trans_time: "12/08/2020 14:31:37",
  },
  {
    transaction_id: "a7e804f4c87c1fea03a1bb5a35756b1c",
    master_id: null,
    merchant_id: "100631",
    merchant_name: "Cửa hàng cấp 1 của Dứa",
    order_reference: "2020081283048406749",
    amount: 200000,
    status: "Idle",
    payment_method: null,
    channel: "Web",
    transaction_number: "225000002",
    trans_time: "12/08/2020 14:27:11",
  },
  {
    transaction_id: "c4c01088530d329f0008bd0d87f886d4",
    master_id: null,
    merchant_id: "100631",
    merchant_name: "Cửa hàng cấp 1 của Dứa",
    order_reference: "2020081258494553884",
    amount: 2000000,
    status: "Idle",
    payment_method: null,
    channel: "Web",
    transaction_number: "225000001",
    trans_time: "12/08/2020 14:22:11",
  },
];
export const MockMethod = [
  {
    value: "1",
    desc: "Ngày T + 1",
  },
  {
    value: "0",
    desc: "Ngày T",
  },
];
export const MockProfile = {
  fullname: "Phong Linh SS",
  user_id: 26,
  username: "viethoang01",
  phone: "0973824803",
  email: "phonglinh2608@gmail.com",
  created_date: "09/04/2020",
  role: "Nhân viên hệ thống <Test>",
  last_login: "17/08/2020 16:51",
  avatar:
    "http://35.223.25.100:8008/vtl-pg/mm/media/avatar/624ACFADFCDD48CEE21113FDF4C70C33.jpg",
  role_id: 3,
  centre_id: 1,
  centre_name: "Trung tâm R&D VT",
  language: "vi",
  status: 1,
  status_name: "Active",
};
export const MockHistory = [
  {
    action_time: "17/08/2020 16:51:32",
    username: "viethoang01",
    action_name: "Phong Linh SS Đã đăng nhập hệ thống",
  },
  {
    action_time: "17/08/2020 16:10:33",
    username: "viethoang01",
    action_name: "Phong Linh SS Đã đăng nhập hệ thống",
  },
  {
    action_time: "17/08/2020 09:54:26",
    username: "viethoang01",
    action_name: "Phong Linh SS Đã đăng nhập hệ thống",
  },
  {
    action_time: "17/08/2020 09:05:30",
    username: "viethoang01",
    action_name: "Phong Linh SS Đã đăng nhập hệ thống",
  },
  {
    action_time: "14/08/2020 13:49:56",
    username: "viethoang01",
    action_name: "Phong Linh SS Đã đăng nhập hệ thống",
  },
];
export const MockBank = [
  {
    value: "970415",
    desc: "Ngân hàng TMCP Công thương Việt Nam",
  },
  {
    value: "970416",
    desc: "Ngân hàng TMCP Á Châu",
  },
  {
    value: "970418",
    desc: "Ngân hàng Đầu tư và Phát triển Việt Nam",
  },
  {
    value: "970419",
    desc: "Ngân hàng TMCP Quốc dân",
  },
  {
    value: "970421",
    desc: "Ngân hàng liên doanh Việt Nga",
  },
  {
    value: "970422",
    desc: "Ngân hàng TMCP Quân Đội",
  },
  {
    value: "970423",
    desc: "Ngân hàng TMCP Tiên Phong",
  },
];
export const MockSettlement = [
  { value: "1", desc: "Ngày T + 1" },
  { value: "0", desc: "Ngày T" },
];

export const MockMasterMerchant = [
  {
    value: 100730,
    desc: "Shop Mỹ Phẩm 123",
  },
  {
    value: 100843,
    desc: "TRE",
  },
  {
    value: 100845,
    desc: "Merchant Test 04",
  },
  {
    value: 100848,
    desc: "Merchant Test 12",
  },
  {
    value: 100852,
    desc: "Merchant Test 13",
  },
  {
    value: 100901,
    desc: "CANIFA",
  },
  {
    value: 100862,
    desc: "Cơm gà",
  },
  {
    value: 100723,
    desc: "Dingtea",
  },
  {
    value: 100763,
    desc: "Cơm thố ",
  },
  {
    value: 100780,
    desc: "hihihi",
  },
  {
    value: 100681,
    desc: "Tên Viết Tắt",
  },
  {
    value: 100740,
    desc: "ĐN",
  },
  {
    value: 100781,
    desc: "Merchant Test1",
  },
  {
    value: 100661,
    desc: "SCTCHL2",
  },
  {
    value: 100761,
    desc: "Bibomart",
  },
];
export const MockAgency = [
  {
    value: 100010,
    desc: "Đại lý phát triển Merchant Hoàng Cầu",
  },
  {
    value: 100024,
    desc: "Đại lý 03",
  },
  {
    value: 100027,
    desc: "Đại lý 03",
  },
  {
    value: 100123,
    desc: "Đại số số 10",
  },
  {
    value: 100022,
    desc: "Đại lý 02",
  },
  {
    value: 100121,
    desc: "đại lý miền Bắc",
  },
  {
    value: 100162,
    desc: "Đại lý Hà Đông",
  },
  {
    value: 100204,
    desc: "Đại lý cấp 1",
  },
  {
    value: 100206,
    desc: "Đại lý cấp 1",
  },
  {
    value: 100181,
    desc: "Sapo",
  },
  {
    value: 100182,
    desc: "Đại lý vùng 1",
  },
  {
    value: 100184,
    desc: "Đại lý vùng 2",
  },
  {
    value: 100007,
    desc: "Đại lý phát triển Merchant Hoàng Cầu 04",
  },
  {
    value: 100008,
    desc: "Đại lý phát triển Merchant Hoàng Cầu 05",
  },
  {
    value: 100002,
    desc: "Đại lý phát triển Merchant Hoàng Cầu",
  },
  {
    value: 100004,
    desc: "Đại lý phát triển Merchant Hoàng Cầu 02",
  },
  {
    value: 100005,
    desc: "Đại lý phát triển Merchant Hoàng Cầu 02",
  },
  {
    value: 100006,
    desc: "Đại lý phát triển Merchant Hoàng Cầu 03",
  },
  {
    value: 100161,
    desc: "Đại lý cấp 1",
  },
  {
    value: 100062,
    desc: "1234",
  },
  {
    value: 100081,
    desc: "Đại lý 04",
  },
  {
    value: 100122,
    desc: "Đại lý 1",
  },
  {
    value: 100063,
    desc: "Kiot Việt",
  },
];
export const MockPaymenMethod = [
  {
    value: 182,
    desc: "Viettel pay",
    logo:
      "http://35.223.25.100:8008/vtl-pg/mm/media/payment_method/logo/411C98D5060412EC17BC0EFD4054C305.jpg",
  },
  {
    value: 101,
    desc: "Momo",
    logo:
      "http://35.223.25.100:8008/vtl-pg/mm/media/payment_method/logo/812368AA75C0C80C57F12F9674B022E9.jpg",
  },
  {
    value: 244,
    desc: "Vin ID",
    logo: null,
  },
  {
    value: 142,
    desc: "Payyoo",
    logo:
      "http://35.223.25.100:8008/vtl-pg/mm/media/payment_method/logo/CCCFA53DD9C3B78884D131074B47B239.jpg",
  },
  {
    value: 22,
    desc: "Thẻ quốc tế",
    logo:
      "http://35.223.25.100:8008/vtl-pg/mm/media/payment_method/logo/23B499F9487849C4BAFC1F214A8E9A1B.jpg",
  },
  {
    value: 82,
    desc: "VNPay QR",
    logo:
      "http://35.223.25.100:8008/vtl-pg/mm/media/payment_method/logo/FAB6A5B20AC1CBFA695676097EB9C5BA.jpg",
  },
];
export const MockBusinessType = [
  {
    value: "NN",
    desc: "Doanh nghiệp nhà nước",
  },
  {
    value: "DNTN",
    desc: "Doanh nghiệp tư nhân",
  },
  {
    value: "HKDCT",
    desc: "Hộ kinh Doanh cá thể",
  },
  {
    value: "CTCP",
    desc: "Công ty cổ phần",
  },
  {
    value: "TNHH",
    desc: "Công ty Trách nhiệm hữu hạn",
  },
  {
    value: "CTHD",
    desc: "Công ty hợp danh",
  },
  {
    value: "CTLD",
    desc: "Công ty Liên doanh",
  },
];
export const MockCompanyType = [
  {
    value: "NN",
    desc: "Doanh nghiệp nhà nước",
  },
  {
    value: "DNTN",
    desc: "Doanh nghiệp tư nhân",
  },
];
export const MockBusinessTypeTrue = [
  {
    value: 4815,
    desc: "4815-VisaPhone",
  },
  {
    value: 4821,
    desc: "4821-Telegraph services",
  },
  {
    value: 4829,
    desc: "4829-Money Orders - Wire Transfer",
  },
  {
    value: 4899,
    desc: "4899-Cable and other pay television (previously Cable Services)",
  },
  {
    value: 4900,
    desc: "4900-Electric, Gas, Sanitary and Water Utilities",
  },
];
@Injectable()
export class MockCommonService extends CommonService {
  GetListBoxData(requestData: string): Observable<any> {
    const result = {
      error_message: "success",
      error_code: "00",
      list_data: [
        {
          value: "active",
          desc: "Active",
        },
        {
          value: "locked",
          desc: "Inactive",
        },
        {
          value: "wait",
          desc: "PendingApproval",
        },
        {
          value: "reject",
          desc: "Rejected",
        },
      ],
    };
    return of(result);
  }
  getFileFromUrl(url: string): Observable<any> {
    if (url && url !== "") {
      return of(new ArrayBuffer(50));
    } else {
      return throwError({ status: "404" });
    }
  }
  getLocationData(key: string, id?: number): Observable<any> {
    return of({
      error_code: "00",
    });
  }

  getExtensionFile(fileName: string): string {
    return fileName?.split(".").pop();
  }
  convertFromArrayBufferToFile(
    arraybuffer: ArrayBuffer,
    fileType: string,
    fileName: string
  ) {
    const extent = this.getExtensionFile(fileName);
    const finalext = this.getfileTypeFromExtension(extent);
    const blob = new Blob([arraybuffer], { type: `${fileType}/${finalext}` });
    blob["name"] = fileName;
    blob["lastModifiedDate"] = new Date();
    let file = Object.assign(blob);
    return file;
  }
}

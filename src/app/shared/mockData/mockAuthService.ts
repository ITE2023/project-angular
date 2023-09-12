import { AuthenticationAndAuthorizationService } from "@core/services";
import { Injectable } from "@angular/core";
import { UserInformationModel } from '@core/models';
export const MockLeftMenuConfig = [
  {
    menu_id: 1,
    menu_title: 'Trang chủ',
    menu_icon: 'home',
    menu_level: 1,
    url: 'admin/trang-chu',
    mapped_url: [
      '/admin/dashboard',
    ],
    actions: [],
  },
  {
    menu_id: 2,
    menu_title: 'Quản lý giao dịch',
    menu_icon: 'attach_money',
    menu_level: 1,
    url: null,
    mapped_url: [],
    children: [
      {
        menu_id: 201,
        menu_title: 'Thanh toán',
        menu_icon: 'payment',
        menu_level: 2,
        menu_parent: 2,
        url: '/admin/giao-dich-thanh-toan',
        mapped_url: [
          '/admin/giao-dich-thanh-toan',
        ],
        actions: [
          {
            action_id: 20101,
            action_name: 'Tra cứu',
          },
          {
            action_id: 20102,
            action_name: 'Xem chi tiết',
          },
          {
            action_id: 20103,
            action_name: 'Xuất file',
          },
          {
            action_id: 20104,
            action_name: 'Hoàn trả',
          },
        ],
      },
      {
        menu_id: 202,
        menu_title: 'Hoàn trả',
        menu_icon: 'keyboard_return',
        menu_level: 2,
        menu_parent: 2,
        url: '/admin/giao-dich-hoan-tra',
        mapped_url: [
          '/admin/giao-dich-hoan-tra',
        ],
        actions: [
          {
            action_id: 20201,
            action_name: 'Tra cứu',
          },
          {
            action_id: 20202,
            action_name: 'Xem chi tiết',
          },
          {
            action_id: 20203,
            action_name: 'Xuất file',
          },
        ],
      },
    ],
  },
  {
    menu_id: 3,
    menu_title: 'Báo cáo tổng hợp',
    menu_icon: ' insert_chart_outlined',
    menu_level: 1,
    url: '/admin/bao-cao',
    mapped_url: [
      '/admin/bao-cao',
    ],
    actions: [],
  },
  {
    menu_id: 5,
    menu_title: 'Quản lý rủi ro',
    menu_icon: 'mood_bad',
    menu_level: 1,
    url: '/admin/quan-ly-rui-ro',
    mapped_url: [
      '/admin/quan-ly-rui-ro',
    ],
    children: [
      {
        menu_id: 501,
        menu_title: 'Tài khoản ví điện tử hạn chế',
        menu_icon: 'account_balance_wallet',
        menu_level: 2,
        menu_parent: 5,
        url: '/admin/qlrr/tai-khoan-vi-han-che',
        mapped_url: [
          '/admin/qlrr/tai-khoan-vi-han-che',
        ],
        actions: [
          {
            action_id: 50101,
            action_name: 'Tra cứu',
          },
          {
            action_id: 50102,
            action_name: 'Cập nhật',
          },
          {
            action_id: 50103,
            action_name: 'Thêm mới',
          },
          {
            action_id: 50105,
            action_name: 'Xem lịch sử cập nhật',
          },
        ],
      },
      {
        menu_id: 502,
        menu_title: 'Thẻ ngân hàng hạn chế',
        menu_icon: 'credit_card',
        menu_level: 2,
        menu_parent: 5,
        url: '/admin/qlrr/the-nh-han-che',
        mapped_url: [
          '/admin/qlrr/the-nh-han-che',
        ],
        actions: [
          {
            action_id: 50201,
            action_name: 'Tra cứu',
          },
          {
            action_id: 50202,
            action_name: 'Cập nhật',
          },
          {
            action_id: 50203,
            action_name: 'Thêm mới',
          },
          {
            action_id: 50205,
            action_name: 'Xem lịch sử cập nhật',
          },
        ],
      },
      {
        menu_id: 503,
        menu_title: 'Dải bin thẻ hạn chế',
        menu_icon: 'card_membership',
        menu_level: 2,
        menu_parent: 5,
        url: '/admin/qlrr/dai-bin-han-che',
        mapped_url: [
          '/admin/qlrr/dai-bin-han-che',
        ],
        actions: [
          {
            action_id: 50301,
            action_name: 'Tra cứu',
          },
          {
            action_id: 50302,
            action_name: 'Cập nhật',
          },
          {
            action_id: 50303,
            action_name: 'Thêm mới',
          },
          {
            action_id: 50305,
            action_name: 'Xem lịch sử cập nhật',
          },
        ],
      },
      {
        menu_id: 504,
        menu_title: 'Địa chỉ IP hạn chế',
        menu_icon: 'perm_scan_wifi',
        menu_level: 2,
        menu_parent: 5,
        url: '/admin/qlrr/ip-han-che',
        mapped_url: [
          '/admin/qlrr/ip-han-che',
        ],
        actions: [
          {
            action_id: 50401,
            action_name: 'Tra cứu',
          },
          {
            action_id: 50402,
            action_name: 'Cập nhật',
          },
          {
            action_id: 50403,
            action_name: 'Thêm mới',
          },
          {
            action_id: 50405,
            action_name: 'Xem lịch sử cập nhật',
          },
        ],
      },
      {
        menu_id: 505,
        menu_title: 'Loại hình dịch vụ hạn chế',
        menu_icon: 'remove_shopping_cart',
        menu_level: 2,
        menu_parent: 5,
        url: '/admin/qlrr/dich-vu-han-che',
        mapped_url: [
          '/admin/qlrr/dich-vu-han-che',
        ],
        actions: [
          {
            action_id: 50501,
            action_name: 'Tra cứu',
          },
          {
            action_id: 50502,
            action_name: 'Cập nhật',
          },
          {
            action_id: 50503,
            action_name: 'Thêm mới',
          },
          {
            action_id: 50505,
            action_name: 'Xem lịch sử cập nhật',
          },
        ],
      },
      {
        menu_id: 506,
        menu_title: 'Tra cứu giao dịch nghi ngờ',
        menu_icon: 'money_off',
        menu_level: 2,
        menu_parent: 5,
        url: '/admin/qlrr/giao-dich-nghi-ngo',
        mapped_url: [
          '/admin/qlrr/giao-dich-nghi-ngo',
        ],
        actions: [],
      },
    ],
  },
  {
    menu_id: 7,
    menu_title: 'Quản lý MCC',
    menu_icon: 'category',
    menu_level: 1,
    url: '/admin/quan-ly-nguoi-dung',
    mapped_url: [
      '/admin/quan-ly-nguoi-dung',
    ],
    actions: [
      {
        action_id: 701,
        action_name: 'Tra cứu MCC',
      },
      {
        action_id: 703,
        action_name: 'Tra cứu nhóm MCC',
      },
      {
        action_id: 704,
        action_name: 'Xem danh sách MCC',
      },
      {
        action_id: 705,
        action_name: 'Cập nhật nhóm MCC',
      },
      {
        action_id: 706,
        action_name: 'Thêm mới nhóm MCC',
      },
      {
        action_id: 709,
        action_name: 'Xóa MCC Trong Group MCC',
      },
      {
        action_id: 710,
        action_name: 'Thêm mới MCC trong Group',
      },
      {
        action_id: 711,
        action_name: 'View Danh sách MCC trong Group',
      },
      {
        action_id: 713,
        action_name: 'DropDow trạng thái MCC',
      },
    ],
  },
  {
    menu_id: 8,
    menu_title: 'Quản lý DVCNTT',
    menu_icon: 'location_city',
    menu_level: 1,
    url: '/admin/quan-ly-dvcntt',
    mapped_url: [
      '/admin/quan-ly-dvcntt',
    ],
    actions: [
      {
        action_id: 818,
        action_name: 'Kiểm tra trùng số điện thoại',
      },
      {
        action_id: 801,
        action_name: 'Tra cứu',
      },
      {
        action_id: 802,
        action_name: 'Xuất file',
      },
      {
        action_id: 803,
        action_name: 'Xem chi tiết',
      },
      {
        action_id: 804,
        action_name: 'Cập nhật thông tin cơ bản',
      },
      {
        action_id: 805,
        action_name: 'Cập nhật thông tin bổ sung',
      },
      {
        action_id: 806,
        action_name: 'Cập nhật thông tin hợp đồng',
      },
      {
        action_id: 807,
        action_name: 'Cập nhật phương thức thanh toán',
      },
      {
        action_id: 809,
        action_name: 'Cập nhật thông tin tài khoản',
      },
      {
        action_id: 810,
        action_name: 'Thêm mới',
      },
      {
        action_id: 814,
        action_name: 'Xem chi tiết Sub',
      },
      {
        action_id: 815,
        action_name: 'Tra cứu Sub',
      },
      {
        action_id: 816,
        action_name: 'Kiểm tra Email',
      },
      {
        action_id: 817,
        action_name: 'Xem danh sách QR',
      },
      {
        action_id: 813,
        action_name: 'Xem hợp đồng',
      },
    ],
  },
  {
    menu_id: 9,
    menu_title: 'Quản lý Người dùng',
    menu_icon: 'account_box',
    menu_level: 1,
    url: '/admin/quan-ly-nguoi-dung',
    mapped_url: [
      '/admin/quan-ly-nguoi-dung',
    ],
    actions: [
      {
        action_id: 901,
        action_name: 'Tra cứu',
      },
      {
        action_id: 902,
        action_name: 'Xuất file',
      },
      {
        action_id: 903,
        action_name: 'Xem chi tiết',
      },
      {
        action_id: 904,
        action_name: 'Cập nhật',
      },
      {
        action_id: 905,
        action_name: 'Thêm mới',
      },
    ],
  },
  {
    menu_id: 10,
    menu_title: 'Quản lý Đơn vị',
    menu_icon: 'add_location',
    menu_level: 1,
    url: '//admin/quan-ly-don-vi',
    mapped_url: [
      '/admin/quan-ly-don-vi',
    ],
    actions: [
      {
        action_id: 1001,
        action_name: 'Tra cứu',
      },
      {
        action_id: 1002,
        action_name: 'Xuất file',
      },
      {
        action_id: 1003,
        action_name: 'Xem chi tiết',
      },
      {
        action_id: 1004,
        action_name: 'Cập nhật',
      },
      {
        action_id: 1006,
        action_name: 'Thêm mới',
      },
    ],
  },
  {
    menu_id: 11,
    menu_title: 'Quản lý PTTT và DV GTGT',
    menu_icon: '360',
    menu_level: 1,
    url: '/admin/quan-ly-pttt',
    mapped_url: [
      '/admin/quan-ly-pttt',
    ],
    actions: [
      {
        action_id: 1101,
        action_name: 'Tra cứu',
      },
      {
        action_id: 1103,
        action_name: 'Xem chi tiết',
      },
      {
        action_id: 1104,
        action_name: 'Cập nhật',
      },
      {
        action_id: 1105,
        action_name: 'Thêm mới',
      },
      {
        action_id: 1108,
        action_name: 'Thay Logo',
      },
    ],
  },
  {
    menu_id: 14,
    menu_title: 'Quản lý TCPH',
    menu_icon: 'speaker_group',
    menu_level: 1,
    url: '/admin/quan-ly-tcph',
    mapped_url: [
      '/admin/quan-ly-tcph',
    ],
    actions: [],
  },
  {
    menu_id: 16,
    menu_title: 'Quản lý Đại lý',
    menu_icon: 'domain',
    menu_level: 1,
    url: '/admin/quan-ly-dai-ly',
    mapped_url: [
      '/admin/quan-ly-dai-ly',
    ],
    actions: [
      {
        action_id: 1601,
        action_name: 'Tra cứu',
      },
      {
        action_id: 1602,
        action_name: 'Xuất file',
      },
      {
        action_id: 1603,
        action_name: 'Xem chi tiết',
      },
      {
        action_id: 1604,
        action_name: 'Cập nhật thông tin cơ bản',
      },
      {
        action_id: 1605,
        action_name: 'Cập nhật thông tin hợp đồng',
      },
      {
        action_id: 1606,
        action_name: 'Cập nhật thông tin phí',
      },
      {
        action_id: 1607,
        action_name: 'Cập nhật thông tin tài khoản',
      },
      {
        action_id: 1608,
        action_name: 'Thêm mới',
      },
    ],
  },
];
export const MockLeftMenuConfig2 = [
  {
    menu_id: 2,
    menu_title: 'Quản lý giao dịch',
    menu_icon: 'attach_money',
    menu_level: 1,
    url: null,
    mapped_url: [],
    children: [
      {
        menu_id: 201,
        menu_title: 'Thanh toán',
        menu_icon: 'payment',
        menu_level: 2,
        menu_parent: 2,
        url: '/admin/giao-dich-thanh-toan',
        mapped_url: [
          '/admin/giao-dich-thanh-toan',
        ],
        actions: [
          {
            action_id: 20101,
            action_name: 'Tra cứu',
          },
          {
            action_id: 20102,
            action_name: 'Xem chi tiết',
          },
          {
            action_id: 20103,
            action_name: 'Xuất file',
          },
          {
            action_id: 20104,
            action_name: 'Hoàn trả',
          },
        ],
      },
      {
        menu_id: 202,
        menu_title: 'Hoàn trả',
        menu_icon: 'keyboard_return',
        menu_level: 2,
        menu_parent: 2,
        url: '/admin/giao-dich-hoan-tra',
        mapped_url: [
          '/admin/giao-dich-hoan-tra',
        ],
        actions: [
          {
            action_id: 20201,
            action_name: 'Tra cứu',
          },
          {
            action_id: 20202,
            action_name: 'Xem chi tiết',
          },
          {
            action_id: 20203,
            action_name: 'Xuất file',
          },
        ],
      },
    ],
  },
  {
    menu_id: 3,
    menu_title: 'Báo cáo tổng hợp',
    menu_icon: ' insert_chart_outlined',
    menu_level: 1,
    url: '/admin/bao-cao',
    mapped_url: [
      '/admin/bao-cao',
    ],
    actions: [],
  },
  {
    menu_id: 5,
    menu_title: 'Quản lý rủi ro',
    menu_icon: 'mood_bad',
    menu_level: 1,
    url: '/admin/quan-ly-rui-ro',
    mapped_url: [
      '/admin/quan-ly-rui-ro',
    ],
    children: [
      {
        menu_id: 501,
        menu_title: 'Tài khoản ví điện tử hạn chế',
        menu_icon: 'account_balance_wallet',
        menu_level: 2,
        menu_parent: 5,
        url: '/admin/qlrr/tai-khoan-vi-han-che',
        mapped_url: [
          '/admin/qlrr/tai-khoan-vi-han-che',
        ],
        actions: [
          {
            action_id: 50101,
            action_name: 'Tra cứu',
          },
          {
            action_id: 50102,
            action_name: 'Cập nhật',
          },
          {
            action_id: 50103,
            action_name: 'Thêm mới',
          },
          {
            action_id: 50105,
            action_name: 'Xem lịch sử cập nhật',
          },
        ],
      },
      {
        menu_id: 502,
        menu_title: 'Thẻ ngân hàng hạn chế',
        menu_icon: 'credit_card',
        menu_level: 2,
        menu_parent: 5,
        url: '/admin/qlrr/the-nh-han-che',
        mapped_url: [
          '/admin/qlrr/the-nh-han-che',
        ],
        actions: [
          {
            action_id: 50201,
            action_name: 'Tra cứu',
          },
          {
            action_id: 50202,
            action_name: 'Cập nhật',
          },
          {
            action_id: 50203,
            action_name: 'Thêm mới',
          },
          {
            action_id: 50205,
            action_name: 'Xem lịch sử cập nhật',
          },
        ],
      },
      {
        menu_id: 503,
        menu_title: 'Dải bin thẻ hạn chế',
        menu_icon: 'card_membership',
        menu_level: 2,
        menu_parent: 5,
        url: '/admin/qlrr/dai-bin-han-che',
        mapped_url: [
          '/admin/qlrr/dai-bin-han-che',
        ],
        actions: [
          {
            action_id: 50301,
            action_name: 'Tra cứu',
          },
          {
            action_id: 50302,
            action_name: 'Cập nhật',
          },
          {
            action_id: 50303,
            action_name: 'Thêm mới',
          },
          {
            action_id: 50305,
            action_name: 'Xem lịch sử cập nhật',
          },
        ],
      },
      {
        menu_id: 504,
        menu_title: 'Địa chỉ IP hạn chế',
        menu_icon: 'perm_scan_wifi',
        menu_level: 2,
        menu_parent: 5,
        url: '/admin/qlrr/ip-han-che',
        mapped_url: [
          '/admin/qlrr/ip-han-che',
        ],
        actions: [
          {
            action_id: 50401,
            action_name: 'Tra cứu',
          },
          {
            action_id: 50402,
            action_name: 'Cập nhật',
          },
          {
            action_id: 50403,
            action_name: 'Thêm mới',
          },
          {
            action_id: 50405,
            action_name: 'Xem lịch sử cập nhật',
          },
        ],
      },
      {
        menu_id: 505,
        menu_title: 'Loại hình dịch vụ hạn chế',
        menu_icon: 'remove_shopping_cart',
        menu_level: 2,
        menu_parent: 5,
        url: '/admin/qlrr/dich-vu-han-che',
        mapped_url: [
          '/admin/qlrr/dich-vu-han-che',
        ],
        actions: [
          {
            action_id: 50501,
            action_name: 'Tra cứu',
          },
          {
            action_id: 50502,
            action_name: 'Cập nhật',
          },
          {
            action_id: 50503,
            action_name: 'Thêm mới',
          },
          {
            action_id: 50505,
            action_name: 'Xem lịch sử cập nhật',
          },
        ],
      },
      {
        menu_id: 506,
        menu_title: 'Tra cứu giao dịch nghi ngờ',
        menu_icon: 'money_off',
        menu_level: 2,
        menu_parent: 5,
        url: '/admin/qlrr/giao-dich-nghi-ngo',
        mapped_url: [
          '/admin/qlrr/giao-dich-nghi-ngo',
        ],
        actions: [],
      },
    ],
  },
  {
    menu_id: 7,
    menu_title: 'Quản lý MCC',
    menu_icon: 'category',
    menu_level: 1,
    url: '/admin/quan-ly-nguoi-dung',
    mapped_url: [
      '/admin/quan-ly-nguoi-dung',
    ],
    actions: [
      {
        action_id: 701,
        action_name: 'Tra cứu MCC',
      },
      {
        action_id: 703,
        action_name: 'Tra cứu nhóm MCC',
      },
      {
        action_id: 704,
        action_name: 'Xem danh sách MCC',
      },
      {
        action_id: 705,
        action_name: 'Cập nhật nhóm MCC',
      },
      {
        action_id: 706,
        action_name: 'Thêm mới nhóm MCC',
      },
      {
        action_id: 709,
        action_name: 'Xóa MCC Trong Group MCC',
      },
      {
        action_id: 710,
        action_name: 'Thêm mới MCC trong Group',
      },
      {
        action_id: 711,
        action_name: 'View Danh sách MCC trong Group',
      },
      {
        action_id: 713,
        action_name: 'DropDow trạng thái MCC',
      },
    ],
  },
  {
    menu_id: 8,
    menu_title: 'Quản lý DVCNTT',
    menu_icon: 'location_city',
    menu_level: 1,
    url: '/admin/quan-ly-dvcntt',
    mapped_url: [
      '/admin/quan-ly-dvcntt',
    ],
    actions: [
      {
        action_id: 818,
        action_name: 'Kiểm tra trùng số điện thoại',
      },
      {
        action_id: 801,
        action_name: 'Tra cứu',
      },
      {
        action_id: 802,
        action_name: 'Xuất file',
      },
      {
        action_id: 803,
        action_name: 'Xem chi tiết',
      },
      {
        action_id: 804,
        action_name: 'Cập nhật thông tin cơ bản',
      },
      {
        action_id: 805,
        action_name: 'Cập nhật thông tin bổ sung',
      },
      {
        action_id: 806,
        action_name: 'Cập nhật thông tin hợp đồng',
      },
      {
        action_id: 807,
        action_name: 'Cập nhật phương thức thanh toán',
      },
      {
        action_id: 809,
        action_name: 'Cập nhật thông tin tài khoản',
      },
      {
        action_id: 810,
        action_name: 'Thêm mới',
      },
      {
        action_id: 814,
        action_name: 'Xem chi tiết Sub',
      },
      {
        action_id: 815,
        action_name: 'Tra cứu Sub',
      },
      {
        action_id: 816,
        action_name: 'Kiểm tra Email',
      },
      {
        action_id: 817,
        action_name: 'Xem danh sách QR',
      },
      {
        action_id: 813,
        action_name: 'Xem hợp đồng',
      },
    ],
  },
  {
    menu_id: 9,
    menu_title: 'Quản lý Người dùng',
    menu_icon: 'account_box',
    menu_level: 1,
    url: '/admin/quan-ly-nguoi-dung',
    mapped_url: [
      '/admin/quan-ly-nguoi-dung',
    ],
    actions: [
      {
        action_id: 901,
        action_name: 'Tra cứu',
      },
      {
        action_id: 902,
        action_name: 'Xuất file',
      },
      {
        action_id: 903,
        action_name: 'Xem chi tiết',
      },
      {
        action_id: 904,
        action_name: 'Cập nhật',
      },
      {
        action_id: 905,
        action_name: 'Thêm mới',
      },
    ],
  },
  {
    menu_id: 10,
    menu_title: 'Quản lý Đơn vị',
    menu_icon: 'add_location',
    menu_level: 1,
    url: '//admin/quan-ly-don-vi',
    mapped_url: [
      '/admin/quan-ly-don-vi',
    ],
    actions: [
      {
        action_id: 1001,
        action_name: 'Tra cứu',
      },
      {
        action_id: 1002,
        action_name: 'Xuất file',
      },
      {
        action_id: 1003,
        action_name: 'Xem chi tiết',
      },
      {
        action_id: 1004,
        action_name: 'Cập nhật',
      },
      {
        action_id: 1006,
        action_name: 'Thêm mới',
      },
    ],
  },
  {
    menu_id: 11,
    menu_title: 'Quản lý PTTT và DV GTGT',
    menu_icon: '360',
    menu_level: 1,
    url: '/admin/quan-ly-pttt',
    mapped_url: [
      '/admin/quan-ly-pttt',
    ],
    actions: [
      {
        action_id: 1101,
        action_name: 'Tra cứu',
      },
      {
        action_id: 1103,
        action_name: 'Xem chi tiết',
      },
      {
        action_id: 1104,
        action_name: 'Cập nhật',
      },
      {
        action_id: 1105,
        action_name: 'Thêm mới',
      },
      {
        action_id: 1108,
        action_name: 'Thay Logo',
      },
    ],
  },
  {
    menu_id: 14,
    menu_title: 'Quản lý TCPH',
    menu_icon: 'speaker_group',
    menu_level: 1,
    url: '/admin/quan-ly-tcph',
    mapped_url: [
      '/admin/quan-ly-tcph',
    ],
    actions: [],
  },
  {
    menu_id: 16,
    menu_title: 'Quản lý Đại lý',
    menu_icon: 'domain',
    menu_level: 1,
    url: '/admin/quan-ly-dai-ly',
    mapped_url: [
      '/admin/quan-ly-dai-ly',
    ],
    actions: [
      {
        action_id: 1601,
        action_name: 'Tra cứu',
      },
      {
        action_id: 1602,
        action_name: 'Xuất file',
      },
      {
        action_id: 1603,
        action_name: 'Xem chi tiết',
      },
      {
        action_id: 1604,
        action_name: 'Cập nhật thông tin cơ bản',
      },
      {
        action_id: 1605,
        action_name: 'Cập nhật thông tin hợp đồng',
      },
      {
        action_id: 1606,
        action_name: 'Cập nhật thông tin phí',
      },
      {
        action_id: 1607,
        action_name: 'Cập nhật thông tin tài khoản',
      },
      {
        action_id: 1608,
        action_name: 'Thêm mới',
      },
    ],
  },
];
export const MockUserInfo = {
  userInformation: 'Phong Linh SS',
  userName: 'viethoang01',
  displayName: 'Phong Linh SS',
  email: 'phonglinh2608@gmail.com',
  lastLoginDate: '2020-08-14T02:25:49.711Z',
  access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJpc0NoYW5nZVBhc3N3b3JkIjowLCJ1c2VyaWQiOjI2LCJpYXQiOjE1OTczNzE5NzEsImp0aSI6IjM0NEQxQzIxOUMzQkI2QTg5QzIzQkJFMUI3QTAwRjE4IiwiZXhwRGF0ZSI6MTU5NzM4NjM3MDAwMH0.T0Psg6d3XEhn6HHC-6Pay8SfYGx_3WjsbGpdvH5YdFs',
  userRole: 'Nhân viên hệ thống <Test>',
  thumbnailPhoto: 'http://35.223.25.100:8008/vtl-pg/mm/media/avatar/624ACFADFCDD48CEE21113FDF4C70C33.jpg',
  phone: '0973824803',
  is_change_password: 0,
  roleId: 3,
}
export const MockLoginUserInfo = {
  fullname: 'Phong Linh SS',
  user_id: 26,
  username: 'viethoang01',
  phone: '0973824803',
  email: 'phonglinh2608@gmail.com',
  created_date: '09/04/2020',
  role: 'Nhân viên hệ thống <Test>',
  last_login: '14/08/2020 09:26',
  avatar: 'http://35.223.25.100:8008/vtl-pg/mm/media/avatar/624ACFADFCDD48CEE21113FDF4C70C33.jpg',
  role_id: 3,
  centre_id: 1,
  centre_name: 'Trung tâm R&D VT',
  language: 'vi',
  status: 1,
  status_name: 'Active',
}
export const MockRights = [20101, 20102, 20103, 20104, 20201, 20202, 20203, 50101, 50102, 50103, 50105, 50201, 50202, 50203, 50205, 50301, 50302, 50303, 50305, 50401, 50402, 50403, 50405, 50501, 50502, 50503, 50505, 701, 703, 704, 705, 706, 709, 710, 711, 713, 818, 801, 802, 803, 804, 805, 806, 807, 809, 810, 814, 815, 816, 817, 813, 901, 902, 903, 904, 905, 1001, 1002, 1003, 1004, 1006, 1101, 1103, 1104, 1105, 1108, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608];
export const MockPermissionUrl = [
  '/admin/dashboard',
  '/admin/transaction',
  '/admin/transaction-payment',
  '/admin/transaction-refund',
  '/admin/bao-cao',
  '/admin/risks-blacklist',
  '/admin/risks-blacklist/account',
  '/admin/risks-blacklist/card',
  '/admin/risks-blacklist/bin',
  '/admin/risks-blacklist/ip',
  '/admin/risks-blacklist/business',
  '/admin/risks-blacklist/transaction',
  '/admin/mcc',
  '/admin/merchant',
  '/admin/user',
  '/admin/department',
  '/admin/payment-method',
  '/admin/issuer',
  '/admin/agency',
]
@Injectable()
export class MockAuthService extends AuthenticationAndAuthorizationService {
  public checkPermission(permissionId: any) {
    return true;
  }
  public checkPermissionUrl(permissionUrl: string) {
    return true;
  }
  public getUserInformation(): UserInformationModel {
    return new UserInformationModel(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      1,
      undefined,
      undefined,
    )
  }
}

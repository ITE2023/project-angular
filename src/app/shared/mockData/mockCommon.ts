import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NavigationEnd } from '@angular/router';

export const MockCentreListBox = [
    {
        value: 181,
        desc: 'Phòng cháy chữa cháy',
    },
    {
        value: 182,
        desc: 'Phản ứng nhanh',
    },
    {
        value: 183,
        desc: 'Phản ứng chậm',
    },
    {
        value: 184,
        desc: 'How you like that',
    },
    {
        value: 231,
        desc: 'CANIFA',
    }
]
export const MockNoti = [
    {
        id: 1088,
        subject: 'Phê duyệt cập nhật thông tin cơ bản của đại lý testv',
        content: 'Kinh doanh  Nhân viên thực hiện chỉnh sửa thông tin cơ bản Đại lý testv. Vui lòng kiểm tra thông tin và thực hiện phê duyệt.',
        status: 'read',
        target: 'AGENCY',
        target_id: 100245,
        send_date: '14/08 10:45',
    },
    {
        id: 1081,
        subject: 'Phê duyệt cập nhật thông tin cơ bản của đại lý dl0199883',
        content: 'Kinh doanh  Nhân viên thực hiện chỉnh sửa thông tin cơ bản Đại lý dl0199883. Vui lòng kiểm tra thông tin và thực hiện phê duyệt.',
        status: 'new',
        target: 'AGENCY',
        target_id: 100261,
        send_date: '14/08 10:44',
    },
    {
        id: 1068,
        subject: 'Phê duyệt cập nhật thông tin cơ bản của đại lý dl0199883',
        content: 'Kinh doanh  Nhân viên thực hiện chỉnh sửa thông tin cơ bản Đại lý dl0199883. Vui lòng kiểm tra thông tin và thực hiện phê duyệt.',
        status: 'read',
        target: 'AGENCY',
        target_id: 100261,
        send_date: '13/08 15:59',
    },
    {
        id: 1060,
        subject: 'Phê duyệt Thông tin cơ bản ĐVCNTT dv0004',
        content: 'Kinh doanh  Nhân viên đã thực hiện chỉnh sửa thông tin cơ bản ĐVCNTT dv0004. Vui lòng kiểm tra thông tin và thực hiện phê duyệt.',
        status: 'read',
        target: 'MERCHANT',
        target_id: 101081,
        send_date: '13/08 15:48',
    },
    {
        id: 1052,
        subject: 'Phê duyệt cập nhật thông tin cơ bản của đại lý dl0199883',
        content: 'Kinh doanh  Nhân viên thực hiện chỉnh sửa thông tin cơ bản Đại lý dl0199883. Vui lòng kiểm tra thông tin và thực hiện phê duyệt.',
        status: 'read',
        target: 'AGENCY',
        target_id: 100261,
        send_date: '13/08 15:47',
    },
]
export class MockEvent {
  public target: any;
  public keyCode: any
  stopPropagation() {
  }
  preventDefault() {

  }

  constructor() {
      return {
          target: {
              value: ''
          },
          keyCode: 0,
          stopPropagation() {
          },
          preventDefault() {

          }
      }
  }
}
export class MockRouter {
    navigateByUrl(url: string) { return url; }
    navigate(urlParams: string[], param: any) {
        return {
            urlParams,
            param
        }
    }
    routeReuseStrategy: {
      shouldReuseRoute()
    }
    getCurrentNavigation() {}
    paramMap() {}
    public ne = new NavigationEnd(
      0,
      "/pdp/project-details/4/edit",
      "/pdp/project-details/4/edit"
  );
  public events = new Observable((observer) => {
      observer.next(this.ne);
      observer.complete();
  });
}
export function MockRouterValue() {
    return {
        navigateByUrl(url: string) { return url; },
        navigate(urlParams2: string[], param2: any) {
            return {
                urlParams2,
                param2
            }
        },
        events: of(new NavigationEnd(0, '/admin/user', '/admin/user')),
        routerState: {},
        routeReuseStrategy: {
            shouldReuseRoute() {

            }
        },
        getCurrentNavigation() {}
    }
}
export const mockDialogRef = {
    close: jasmine.createSpy('close'),
    closeAll: jasmine.createSpy('closeAll'),
};
export function MockActivatedRouteValue(param: any, queryParams: any) {
    return {
        paramMap: param,
        queryParams
    }
}
export function MockActivatedRouteValueWithParam(param: any, queryParams: any) {
    return {
        params: param,
        queryParams
    }
}
@Injectable()
export class MockTranslateService extends TranslateService {
    instant(key: string) {
        return key;
    }
}
@Injectable()
export class MockTranslateLoader extends TranslateLoader {
    getTranslation(lang: string) {
        return of(lang);
    }
}
// export class MockToastService extends ToastrService {
//     success(message?: string, title?: string, override?: Partial<IndividualConfig>) {
//         return new ActiveToast<string>;
//     }
// }

export const MockLeftMenu = [
  {
    url: 'admin/trang-chu',
    menu_id: 1,
    menu_icon: 'home',
    mapped_url: '["/admin/dashboard"]',
    menu_level: 1,
    menu_title: 'Trang chủ',
  },
  {
    url: '/admin/giao-dich-hoan-tra',
    menu_id: 2,
    children: [
      {
        url: '/admin/giao-dich-thanh-toan',
        actions: [
          {
            action_id: 20104,
            action_name: 'Hoàn trả',
          },
          {
            action_id: 20103,
            action_name: 'Xuất file',
          },
          {
            action_id: 20102,
            action_name: 'Xem chi tiết',
          },
          {
            action_id: 20101,
            action_name: 'Tra cứu',
          },
        ],
        menu_id: 201,
        menu_icon: 'payment',
        mapped_url: '["/admin/giao-dich-thanh-toan"]',
        menu_level: 2,
        menu_title: 'Thanh toán',
        menu_parent: 2,
      },
      {
        url: '/admin/giao-dich-hoan-tra',
        actions: [
          {
            action_id: 20203,
            action_name: 'Xuất file',
          },
          {
            action_id: 20202,
            action_name: 'Xem chi tiết',
          },
          {
            action_id: 20201,
            action_name: 'Tra cứu',
          },
        ],
        menu_id: 202,
        menu_icon: 'keyboard_return',
        mapped_url: '["/admin/giao-dich-hoan-tra"]',
        menu_level: 2,
        menu_title: 'Hoàn trả',
        menu_parent: 2,
      },
    ],
    menu_icon: 'attach_money',
    mapped_url: '["/admin/giao-dich-hoan-tra"]',
    menu_level: 1,
    menu_title: 'Quản lý giao dịch',
  },
  {
    url: '/admin/bao-cao-tong-hop',
    menu_id: 3,
    children: [
      {
        url: '/admin/revenue-report',
        actions: [
          {
            action_id: 30101,
            action_name: 'Báo cáo doanh thu GD',
          },
        ],
        menu_id: 301,
        menu_icon: 'monetization_on',
        mapped_url: '["/admin/revenue-report"]',
        menu_level: 2,
        menu_title: 'Báo cáo doanh thu',
        menu_parent: 3,
      },
      {
        url: '/admin/money-transfer-report',
        actions: [
          {
            action_id: 30201,
            action_name: 'Báo cáo chuyển tiền',
          },
        ],
        menu_id: 302,
        menu_icon: 'forward',
        mapped_url: '["/admin/money-transfer-report"]',
        menu_level: 2,
        menu_title: 'Báo cáo chuyển tiền ĐVCNTT',
        menu_parent: 3,
      },
      {
        url: '/admin/finalization-report',
        actions: [
          {
            action_id: 30301,
            action_name: 'Báo cáo thanh quyết toán',
          },
        ],
        menu_id: 303,
        menu_icon: 'sync',
        mapped_url: '["/admin/finalization-report"]',
        menu_level: 2,
        menu_title: 'Báo cáo thanh quyết toán',
        menu_parent: 3,
      },
      {
        url: '/admin/fee-report',
        actions: [
          {
            action_id: 30401,
            action_name: 'Báo cáo phí',
          },
        ],
        menu_id: 304,
        menu_icon: 'money',
        mapped_url: '["/admin/fee-report"]',
        menu_level: 2,
        menu_title: 'Báo cáo phí',
        menu_parent: 3,
      },
    ],
    menu_icon: ' insert_chart_outlined',
    mapped_url: '["/admin/bao-cao-tong-hop"]',
    menu_level: 1,
    menu_title: 'Báo cáo tổng hợp',
  },
  {
    url: '/admin/quan-ly-thong-tin-dvcntt',
    menu_id: 5,
    children: [
      {
        url: '/admin/merchant-profile',
        actions: [
          {
            action_id: 50107,
            action_name: 'Hợp đồng ĐVCNTT',
          },
          {
            action_id: 50106,
            action_name: 'Cập nhật thông tin  phương thức thanh toán ĐVCNTT',
          },
          {
            action_id: 50105,
            action_name: 'Cập nhật (thông tin) ( tài khoản ) phương thức thanh toán ĐVCNTT',
          },
          {
            action_id: 50104,
            action_name: 'Cập nhật thông tin bổ sung ĐVCNTT',
          },
          {
            action_id: 50103,
            action_name: 'Cập nhật thông tin cơ bản ĐVCNTT',
          },
          {
            action_id: 50102,
            action_name: 'Xem chi tiết',
          },
          {
            action_id: 50101,
            action_name: 'Xuất file',
          },
        ],
        menu_id: 501,
        menu_icon: 'work',
        mapped_url: '["/admin/merchant-profile"]',
        menu_level: 2,
        menu_title: 'Hồ sơ ĐVCNTT',
        menu_parent: 5,
      },
      {
        url: '/admin/merchant-children',
        actions: [
          {
            action_id: 50208,
            action_name: 'Danh sách listbox',
          },
          {
            action_id: 50207,
            action_name: 'Cập nhập thêm mới thông tin',
          },
          {
            action_id: 50206,
            action_name: 'Cập nhập thông tin cơ bản',
          },
          {
            action_id: 50205,
            action_name: 'Khóa/ Kích hoạt',
          },
          {
            action_id: 50204,
            action_name: 'Xuất file',
          },
          {
            action_id: 50203,
            action_name: 'Tra cứu',
          },
          {
            action_id: 50202,
            action_name: 'Xem chi tiết',
          },
          {
            action_id: 50201,
            action_name: 'Thêm mới',
          },
        ],
        menu_id: 502,
        menu_icon: 'view_comfy',
        mapped_url: '["/admin/merchant-children"]',
        menu_level: 2,
        menu_title: 'Quản lý ĐVCNTT',
        menu_parent: 5,
      },
      {
        url: '/admin/merchant-qrcode',
        actions: [
          {
            action_id: 50309,
            action_name: 'get-staff',
          },
          {
            action_id: 50308,
            action_name: 'list-staff',
          },
          {
            action_id: 50307,
            action_name: 'Cập nhật mã QR',
          },
          {
            action_id: 50306,
            action_name: 'Xóa mã QR',
          },
          {
            action_id: 50305,
            action_name: 'In mã QR',
          },
          {
            action_id: 50304,
            action_name: 'Xuất file',
          },
          {
            action_id: 50303,
            action_name: 'Tra cứu',
          },
          {
            action_id: 50302,
            action_name: 'Xem chi tiết',
          },
          {
            action_id: 50301,
            action_name: 'Thêm mới',
          },
        ],
        menu_id: 503,
        menu_icon: 'broken_image',
        mapped_url: '["/admin/merchant-qrcode"]',
        menu_level: 2,
        menu_title: 'Quản lý QR Code',
        menu_parent: 5,
      },
    ],
    menu_icon: 'location_city',
    mapped_url: '["/admin/quan-ly-thong-tin-dvcntt"]',
    menu_level: 1,
    menu_title: 'Quản lý thông tin ĐVCNTT',
  },
  {
    url: '/admin/quan-ly-rui-ro',
    menu_id: 6,
    children: [
      {
        url: '/admin/qlrr/tai-khoan-vi-han-che',
        actions: [
          {
            action_id: 60106,
            action_name: 'Xuất file',
          },
          {
            action_id: 60105,
            action_name: 'Xem lịch sử cập nhật',
          },
          {
            action_id: 60104,
            action_name: 'Khóa/ Kích hoạt',
          },
          {
            action_id: 60103,
            action_name: 'Thêm mới',
          },
          {
            action_id: 60102,
            action_name: 'Cập nhật',
          },
          {
            action_id: 60101,
            action_name: 'Tra cứu',
          },
        ],
        menu_id: 601,
        menu_icon: 'account_balance_wallet',
        mapped_url: '["/admin/qlrr/tai-khoan-vi-han-che"]',
        menu_level: 2,
        menu_title: 'Tài khoản ví điện tử hạn chế',
        menu_parent: 6,
      },
      {
        url: '/admin/qlrr/the-nh-han-che',
        actions: [
          {
            action_id: 60206,
            action_name: 'Xuất file',
          },
          {
            action_id: 60205,
            action_name: 'Xem lịch sử cập nhật',
          },
          {
            action_id: 60204,
            action_name: 'Khóa/ Kích hoạt',
          },
          {
            action_id: 60203,
            action_name: 'Thêm mới',
          },
          {
            action_id: 60202,
            action_name: 'Cập nhật',
          },
          {
            action_id: 60201,
            action_name: 'Tra cứu',
          },
        ],
        menu_id: 602,
        menu_icon: 'credit_card',
        mapped_url: '["/admin/qlrr/the-nh-han-che"]',
        menu_level: 2,
        menu_title: 'Thẻ ngân hàng hạn chế',
        menu_parent: 6,
      },
      {
        url: '/admin/qlrr/dai-bin-han-che',
        actions: [
          {
            action_id: 60306,
            action_name: 'Xuất file',
          },
          {
            action_id: 60305,
            action_name: 'Xem lịch sử cập nhật',
          },
          {
            action_id: 60304,
            action_name: 'Khóa/ Kích hoạt',
          },
          {
            action_id: 60303,
            action_name: 'Thêm mới',
          },
          {
            action_id: 60302,
            action_name: 'Cập nhật',
          },
          {
            action_id: 60301,
            action_name: 'Tra cứu',
          },
        ],
        menu_id: 603,
        menu_icon: 'card_membership',
        mapped_url: '["/admin/qlrr/dai-bin-han-che"]',
        menu_level: 2,
        menu_title: 'Dải bin thẻ hạn chế',
        menu_parent: 6,
      },
      {
        url: '/admin/qlrr/ip-han-che',
        actions: [
          {
            action_id: 60405,
            action_name: 'Xuất file',
          },
          {
            action_id: 60405,
            action_name: 'Xuất file',
          },
          {
            action_id: 60405,
            action_name: 'Xem lịch sử cập nhật',
          },
          {
            action_id: 60405,
            action_name: 'Xem lịch sử cập nhật',
          },
          {
            action_id: 60404,
            action_name: 'Khóa/ Kích hoạt',
          },
          {
            action_id: 60403,
            action_name: 'Thêm mới',
          },
          {
            action_id: 60402,
            action_name: 'Cập nhật',
          },
          {
            action_id: 60401,
            action_name: 'Tra cứu',
          },
        ],
        menu_id: 604,
        menu_icon: 'perm_scan_wifi',
        mapped_url: '["/admin/qlrr/ip-han-che"]',
        menu_level: 2,
        menu_title: 'Địa chỉ IP hạn chế',
        menu_parent: 6,
      },
      {
        url: '/admin/qlrr/dich-vu-han-che',
        actions: [
          {
            action_id: 60506,
            action_name: 'Xuất file',
          },
          {
            action_id: 60505,
            action_name: 'Xem lịch sử cập nhật',
          },
          {
            action_id: 60504,
            action_name: 'Khóa/ Kích hoạt',
          },
          {
            action_id: 60503,
            action_name: 'Thêm mới',
          },
          {
            action_id: 60502,
            action_name: 'Cập nhật',
          },
          {
            action_id: 60501,
            action_name: 'Tra cứu',
          },
        ],
        menu_id: 605,
        menu_icon: 'remove_shopping_cart',
        mapped_url: '["/admin/qlrr/dich-vu-han-che"]',
        menu_level: 2,
        menu_title: 'Loại hình dịch vụ hạn chế',
        menu_parent: 6,
      },
      {
        url: '/admin/qlrr/giao-dich-nghi-ngo',
        actions: [
          {
            action_id: 60602,
            action_name: 'Xuất file',
          },
          {
            action_id: 60601,
            action_name: 'Tra cứu',
          },
        ],
        menu_id: 606,
        menu_icon: 'money_off',
        mapped_url: '["/admin/qlrr/giao-dich-nghi-ngo"]',
        menu_level: 2,
        menu_title: 'Tra cứu giao dịch nghi ngờ',
        menu_parent: 6,
      },
    ],
    menu_icon: 'mood_bad',
    mapped_url: '["/admin/quan-ly-rui-ro"]',
    menu_level: 1,
    menu_title: 'Quản lý rủi ro',
  },
  {
    url: '/admin/quan-ly-nguoi-dung',
    actions: [
      {
        action_id: 707,
        action_name: 'Thay đổi trạng thái',
      },
      {
        action_id: 706,
        action_name: 'Khóa/ Kích hoạt',
      },
      {
        action_id: 705,
        action_name: 'Thêm mới',
      },
      {
        action_id: 704,
        action_name: 'Cập nhật',
      },
      {
        action_id: 703,
        action_name: 'Xem chi tiết',
      },
      {
        action_id: 702,
        action_name: 'Xuất file',
      },
      {
        action_id: 701,
        action_name: 'Tra cứu',
      },
      {
        action_id: 708,
        action_name: 'Lấy danh sách role',
      },
    ],
    menu_id: 7,
    menu_icon: 'account_box',
    mapped_url: '["/admin/quan-ly-nguoi-dung"]',
    menu_level: 1,
    menu_title: 'Quản lý người dùng',
  },
  {
    url: '/admin/quan-ly-thong-tin-dich-vu',
    actions: [
      {
        action_id: 809,
        action_name: 'get-payment-method',
      },
      {
        action_id: 808,
        action_name: 'addnew-test',
      },
      {
        action_id: 807,
        action_name: 'addnew',
      },
      {
        action_id: 806,
        action_name: 'get-test-infomation',
      },
      {
        action_id: 805,
        action_name: 'Cập nhật phương thức thanh toán',
      },
      {
        action_id: 804,
        action_name: 'Cập nhật thông tin tích hợp môi trường thử nghiệm',
      },
      {
        action_id: 803,
        action_name: 'Cập nhật thông tin tích hợp môi trường thật',
      },
      {
        action_id: 802,
        action_name: 'Xem Thông tin phí',
      },
      {
        action_id: 801,
        action_name: 'Xem chi tiết',
      },
    ],
    menu_id: 8,
    menu_icon: 'info',
    mapped_url: '["/admin/quan-ly-thong-tin-dich-vu"]',
    menu_level: 1,
    menu_title: 'Quản lý thông tin dịch vụ',
  },
];

export class MockProfileShare {
  getProfileInfo() {
      return of({ avatarUrl: 'abcdef' })
  }
  detailProfile() {
      return of({
          error_code: "00",
          data: {
              language: "vn"
          },
          avatar: "abcdef"
      })
  }
}

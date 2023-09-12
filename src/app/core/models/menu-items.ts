import { Injectable } from '@angular/core';

export interface Menu {
  id?: string;
  state: string;
  name: string;
  type: string;
  icon: string;
  open?: boolean;
  children?: Menu[];
}

const MENUITEMS = [
  {
    state: '',
    name: 'Trang chủ',
    type: 'link',
    icon: 'av_timer',
    active: true
  },
  {
    state: 'button',
    type: 'section',
    name: 'Quản lý giao dịch',
    icon: 'crop_7_5',
    open: false,
    children: [
      {
        state: 'button',
        type: 'link',
        name: 'Giao dịch thanh toán',
        icon: 'crop_7_5',
      },
      {
        state: 'button',
        type: 'link',
        name: 'Giao dịch hoàn tiền',
        icon: 'crop_7_5',
      }
    ]
  },
  {
    state: 'grid',
    type: 'section',
    name: 'Báo cáo tổng hợp',
    icon: 'view_comfy',
    open: false,
    children: [
      {
        state: 'button',
        type: 'link',
        name: 'Báo cáo tuần',
        icon: 'crop_7_5',
      },
      {
        state: 'button',
        type: 'link',
        name: 'Báo cáo tháng',
        icon: 'crop_7_5',
      }
    ]
  },
  {
    state: 'stepper',
    type: 'link',
    name: 'Quản lý ĐVCNTT',
    icon: 'web'
  },
  {
    state: 'lists',
    type: 'link',
    name: 'Quản lý rủi ro',
    icon: 'view_list'
  },
  {
    state: '/admin/user',
    type: 'link',
    name: 'Quản lý người dùng',
    icon: 'view_headline'
  },
  {
    state: '/admin/department',
    type: 'link',
    name: 'Quản lý đơn vị',
    icon: 'view_headline'
  },
  {
    state: 'user',
    type: 'link',
    name: 'Cài đặt',
    icon: 'settings'
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}

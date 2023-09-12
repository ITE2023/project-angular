import { Injectable } from "@angular/core";
import { UserInformationModel } from "@core/models";
import {
  LocalStorageType,
  langSettings,
  LeftMenuKeyConfig,
  SESSION_TIME,
} from "@core/constants";
import { Observable, of } from "rxjs";
import { Md5Help } from "@core/helper";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ProfileShare } from "./app/profile/profile-share.service";
import { TranslateService } from "@ngx-translate/core";
import { MatDialog } from "@angular/material/dialog";
import * as moment from "moment";
import { ConfigService } from "./configuration/configuration.service";
import { ToastrService } from "ngx-toastr";
@Injectable({ providedIn: "root" })
export class AuthenticationAndAuthorizationService {
  private permissionList = [];
  private permissionUrl = [];
  private userInformation: UserInformationModel = null;
  private baseUrl: "";

  public mockUser = {
    access_token:
      "eyJhbGciOiJIUzM4NCJ9.eyJqdGkiOiIxNjMwMzViMC1lZGVmLTRmZjItYTY0MS1iNTJhYjg4NDM4ZmUiLCJpYXQiOjE2OTQxNTc2MjksImV4cCI6MTY5NDE2NDgyOSwic3ViIjoie1widXNlcl9pZFwiOlwiNjQ5M2M0MmM1N2U2YzgyMzc5MGY5MzFjXCJ9In0.W9oPuutR65V6qwu-13-OxpSFiI1CIDZECVzksCD2nx2evqzEW-QZ5mX6s-mFKZRx",
    expired: 7200,
    menu_info: [
      {
        menu_id: 1,
        url: "admin/trang-chu",
        menu_icon: "admin/trang-chu",
        mapped_url: "/admin/dashboard",
        menu_level: 1,
        menu_title: "Dashboard",
      },
      {
        menu_id: 32,
        url: "payment-details",
        menu_icon: "payment",
        mapped_url: "/payment-details",
        menu_level: 1,
        menu_title: "Payment Details",
      },
      {
        menu_id: 34,
        url: "payment-details",
        menu_icon: "payment-details",
        mapped_url: "/payment-details",
        menu_level: 1,
        menu_title: "Payment Details",
      },
      {
        menu_id: 31,
        url: "user-info",
        menu_icon: "home",
        mapped_url: "/user-info",
        menu_level: 1,
        menu_title: "User Info",
      },
      {
        menu_id: 33,
        url: "kill-session",
        menu_icon: "kill-session",
        mapped_url: "/kill-session",
        menu_level: 1,
        menu_title: "Kill Session",
      },
      {
        menu_id: 2,
        children: [
          {
            menu_id: 201,
            url: "/admin/giao-dich-thanh-toan",
            actions: [
              {
                action_id: 20104,
              },
              {
                action_id: 20103,
              },
              {
                action_id: 20102,
              },
              {
                action_id: 20101,
              },
            ],
            menu_icon: "payment",
            mapped_url: ["/admin/giao-dich-thanh-toan"],
            menu_level: 2,
            menu_title: "Thanh toán",
            menu_parent: 2,
          },
          {
            menu_id: 202,
            url: "/admin/giao-dich-hoan-tra",
            actions: [
              {
                action_id: 20201,
              },
              {
                action_id: 20202,
              },
              {
                action_id: 20203,
              },
              {
                action_id: 20204,
              },
              {
                action_id: 20205,
              },
              {
                action_id: 20206,
              },
              {
                action_id: 20207,
              },
            ],
            menu_icon: "keyboard_return",
            mapped_url: ["/admin/giao-dich-hoan-tra"],
            menu_level: 2,
            menu_title: "Hoàn trả",
            menu_parent: 2,
          },
        ],
        menu_icon: "attach_money",
        mapped_url: "[]",
        menu_level: 1,
        menu_title: "Quản lý giao dịch",
      },
      {
        menu_id: 3,
        url: "/admin/bao-cao",
        children: [
          {
            menu_id: 301,
            url: "/admin/report-volatility",
            menu_icon: "speaker_group",
            mapped_url: ["/admin/report-volatility"],
            menu_level: 2,
            menu_title: "Báo cáo cho TCPH",
            menu_parent: 3,
          },
          {
            menu_id: 302,
            url: "/admin/report-merchant",
            menu_icon: "shop",
            mapped_url: ["/admin/report-merchant"],
            menu_level: 2,
            menu_title: "Báo cáo cho ĐVCNTT",
            menu_parent: 3,
          },
          {
            menu_id: 303,
            url: "/admin/report-agency",
            menu_icon: "shop",
            mapped_url: ["/admin/report-agency"],
            menu_level: 2,
            menu_title: "Báo cáo cho Đại lý",
            menu_parent: 3,
          },
        ],
        menu_icon: "insert_chart_outlined",
        mapped_url: ["/admin/bao-cao"],
        menu_level: 1,
        menu_title: "Báo cáo tổng hợp",
      },
      {
        menu_id: 5,
        url: "/admin/quan-ly-rui-ro",
        children: [
          {
            menu_id: 501,
            url: "/admin/qlrr/tai-khoan-vi-han-che",
            menu_icon: "account_balance_wallet",
            mapped_url: ["/admin/qlrr/tai-khoan-vi-han-che"],
            menu_level: 2,
            menu_title: "Tài khoản ví điện tử hạn chế",
            menu_parent: 5,
          },
          {
            menu_id: 502,
            url: "/admin/qlrr/the-nh-han-che",
            menu_icon: "credit_card",
            mapped_url: ["/admin/qlrr/the-nh-han-che"],
            menu_level: 2,
            menu_title: "Thẻ ngân hàng hạn chế",
            menu_parent: 5,
          },
          {
            menu_id: 503,
            url: "/admin/qlrr/dai-bin-han-che",
            menu_icon: "card_membership",
            mapped_url: ["/admin/qlrr/dai-bin-han-che"],
            menu_level: 2,
            menu_title: "Dải bin thẻ hạn chế",
            menu_parent: 5,
          },
          {
            menu_id: 504,
            url: "/admin/qlrr/ip-han-che",
            menu_icon: "perm_scan_wifi",
            mapped_url: ["/admin/qlrr/ip-han-che"],
            menu_level: 2,
            menu_title: "Địa chỉ IP hạn chế",
            menu_parent: 5,
          },
          {
            menu_id: 505,
            url: "/admin/qlrr/dich-vu-han-che",
            menu_icon: "remove_shopping_cart",
            mapped_url: ["/admin/qlrr/dich-vu-han-che"],
            menu_level: 2,
            menu_title: "Loại hình dịch vụ hạn chế",
            menu_parent: 5,
          },
          {
            menu_id: 506,
            url: "/admin/qlrr/giao-dich-nghi-ngo",
            menu_icon: "money_off",
            mapped_url: ["/admin/qlrr/giao-dich-nghi-ngo"],
            menu_level: 2,
            menu_title: "Tra cứu giao dịch nghi ngờ",
            menu_parent: 5,
          },
        ],
        menu_icon: "mood_bad",
        mapped_url: ["/admin/quan-ly-rui-ro"],
        menu_level: 1,
        menu_title: "Quản lý rủi ro",
      },
      {
        menu_id: 9,
        url: "/admin/quan-ly-tai-khoan-vi",
        menu_icon: "account_box",
        mapped_url: ["/admin/quan-ly-tai-khoan-vi"],
        menu_level: 1,
        menu_title: "Quản lý tài khoản ví",
      },
      {
        menu_id: 18,
        url: "/admin/statistic",
        menu_icon: "timeline",
        mapped_url: ["/admin/statistic"],
        menu_level: 1,
        menu_title: "Thống kê",
      },
      {
        menu_id: 30,
        url: "/admin/state-bank",
        children: [
          {
            menu_id: 3001,
            url: "/admin/state-bank/wallet-balance",
            menu_icon: "account_balance_wallet",
            mapped_url: ["/admin/state-bank/wallet-balance"],
            menu_level: 2,
            menu_title: "Số dư ví",
            menu_parent: 30,
          },
          {
            menu_id: 3002,
            url: "/admin/state-bank/guaranteed-balance",
            menu_icon: "credit_card",
            mapped_url: ["/admin/state-bank/guaranteed-balance"],
            menu_level: 2,
            menu_title: "Số dư tài khoản DBTT",
            menu_parent: 30,
          },
          {
            menu_id: 3003,
            url: "/admin/state-bank/type-report",
            menu_icon: "assessment",
            mapped_url: ["/admin/state-bank/type-report"],
            menu_level: 2,
            menu_title: "Báo cáo theo loại giao dịch",
            menu_parent: 30,
          },
          {
            menu_id: 3004,
            url: "/admin/state-bank/top-most",
            menu_icon: "broken_image",
            mapped_url: ["/admin/state-bank/top-most"],
            menu_level: 2,
            menu_title: "Top 10 ví số lượng giao dịch nhiều nhất",
            menu_parent: 30,
          },
          {
            menu_id: 3005,
            url: "/admin/state-bank/top-highest",
            menu_icon: "filter_hdr",
            mapped_url: ["/admin/state-bank/top-highest"],
            menu_level: 2,
            menu_title: "Top 10 ví giá trị giao dịch cao nhất",
            menu_parent: 30,
          },
          {
            menu_id: 3006,
            url: "/admin/state-bank/wallet-volatility",
            menu_icon: "filter_hdr",
            mapped_url: ["/admin/state-bank/wallet-volatility"],
            menu_level: 2,
            menu_title: "Biến động ví",
            menu_parent: 30,
          },
        ],
        menu_icon: "account_balance",
        mapped_url: ["/admin/state-bank"],
        menu_level: 1,
        menu_title: "Báo cáo ngân hàng nhà nước",
      },
    ],
    user_info: {
      user_id: "6493c42c57e6c823790f931c",
      address: "Hà nội",
      full_name: "Nguyễn Huy Hùng",
      phone: "0335463606",
      email: "hung@gmail.com",
    },
    error_code: "00",
    error_message: "Success",
  };
  constructor(
    public http: HttpClient,
    public profileShareService: ProfileShare,
    public translate: TranslateService,
    public dialogRef: MatDialog,
    private config: ConfigService,
    private toastr: ToastrService
  ) {
    this.baseUrl =
      this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.NO_AUTH_API_URL
        ? this.config.config.API_ENDPOINTS.NO_AUTH_API_URL
        : "";
    if (!this.userInformation) {
      const userInformation: string = localStorage.getItem(
        LocalStorageType.UserInformation
      );
      if (userInformation) {
        this.userInformation = JSON.parse(userInformation);
      }
    }
  }
  public getSideBarConfig(): any {
    return JSON.parse(localStorage.getItem(LocalStorageType.SideBarConfig));
  }

  public setSideBarConfig(value: string) {
    localStorage.setItem(LocalStorageType.SideBarConfig, value);
  }

  public setPermissions(menuConfig: any[]) {
    const output = Array.from(menuConfig);
    output.forEach((val: any) => {
      if (val && val.actions && val.actions.length > 0) {
        val.actions.forEach((permission: any) => {
          this.addPermission(permission.action_id);
        });
      }
      if (val && val.children && val.children.length > 0) {
        this.setPermissions(val.children);
      }
    });
  }

  public getUrlFromId(id): string {
    let result = LeftMenuKeyConfig.filter((x) => x.menuId === id);
    return result.length > 0 ? result[0].url : "";
  }

  public setUrls(menuConfig: any[]) {
    const output = Array.from(menuConfig);
    output.forEach((val: any) => {
      if (val) {
        const url = this.getUrlFromId(val.menu_id);
        if (url !== "") {
          this.addPermissionUrl(url);
        }
        if (val.children && val.children.length > 0) {
          this.setUrls(val.children);
        }
      }
    });
  }

  doLogin(
    userName: string,
    password: string
  ): Observable<UserInformationModel> {
    const body = {
      username: userName,
      password: Md5Help.md5(password),
    };

    const getTime = moment();
    return of(this.mockUser).pipe(
      map((data: any) => {
        if (data.error_code && data.error_code !== "00") {
          return data;
        } else {
          const sideBarConfig = JSON.stringify(data.menu_info);

          // Doan nay de phan quyen
          this.setPermissions(data.menu_info);
          this.setUrls(data.menu_info);
          this.addPermissionResultToLocalStorage(
            this.permissionList,
            this.permissionUrl
          );

          // data.menu_info.pop();

          // add thoi gian het han vao localstorage (giay)
          localStorage.setItem(LocalStorageType.ExpiredTime, data.expired);

          this.setSideBarConfig(sideBarConfig);
          const user = new UserInformationModel(
            undefined,
            data.user_info.user_id,
            data.user_info.fullname,
            data.user_info.username,
            undefined,
            data.user_info.fullname,
            data.user_info.email,
            getTime,
            data.user_info.createDate,
            data.access_token,
            undefined,
            undefined,
            undefined,
            undefined,
            data.user_info.role,
            undefined,
            undefined,
            undefined,
            undefined,
            data.user_info.address,
            data.user_info.avatar,
            data.user_info.phone,
            data.user_info.department_name,
            data.is_change_password,
            data.user_info.role_id,
            data.day,
            data.notification_code
          );

          const defaultLang = data.user_info.language;
          // if (
          //   langSettings.filter((x) => x.lang_code === defaultLang).length > 0
          // ) {
          //   this.translate.use(defaultLang);
          //   localStorage.setItem(LocalStorageType.CurrentLanguage, defaultLang);
          // } else {
          //   this.translate.use("vi");
          // }

          this.translate.use("vi");
          localStorage.setItem(LocalStorageType.CurrentLanguage, "vi");

          this.addLoginResultToLocalStorage(user);
          this.profileShareService.setProfileInfo(
            data.user_info.avatar,
            user.displayName
          );
          return user;
        }
      })
    );
  }

  public addLoginResultToLocalStorage(user: UserInformationModel) {
    this.userInformation = {
      ...user,
      userId: user.id,
    };
    localStorage.setItem(
      LocalStorageType.UserInformation,
      JSON.stringify(user)
    );
    localStorage.setItem(LocalStorageType.Token, user.access_token);
  }

  public addPermissionResultToLocalStorage(permission: any, url: any) {
    localStorage.setItem(
      LocalStorageType.Permission,
      JSON.stringify(permission)
    );
    localStorage.setItem(LocalStorageType.PermissionUrl, JSON.stringify(url));
  }

  public logOut(): Observable<boolean> {
    return of(true).pipe(
      map((data: any) => {
        this.userInformation = null;
        let remember = null;
        if (localStorage.getItem(LocalStorageType.RememberMe)) {
          remember = localStorage.getItem(LocalStorageType.RememberMe);
        }
        localStorage.clear();
        if (remember != null) {
          localStorage.setItem(LocalStorageType.RememberMe, remember);
        }
        this.dialogRef.closeAll();
        this.toastr.clear();
        this.clearPermissionAndURLList();
        return true;
      })
    );
  }

  public checkLogin(): boolean {
    const user: any = JSON.parse(
      localStorage.getItem(LocalStorageType.UserInformation)
    );

    return user;
    // && +user.is_change_password === 0;
  }

  public getCurrentLang(): string {
    return localStorage.getItem(LocalStorageType.CurrentLanguage)
      ? localStorage.getItem(LocalStorageType.CurrentLanguage)
      : "vi";
  }

  getUserInformation(): UserInformationModel {
    return JSON.parse(localStorage.getItem(LocalStorageType.UserInformation));
  }

  public clearPermissionAndURLList() {
    this.permissionList = [];
    this.permissionUrl = [];
  }

  public checkPermission(permissionId: any) {
    const permissionList = JSON.parse(
      localStorage.getItem(LocalStorageType.Permission)
    );

    return permissionList?.filter((x) => x == permissionId).length > 0;
  }

  public checkPermissionUrl(permissionUrl: string) {
    if (permissionUrl === "" || permissionUrl === "/") {
      return true;
    } else {
      const permissionUrlList = JSON.parse(
        localStorage.getItem(LocalStorageType.PermissionUrl)
      );
      return (
        permissionUrlList?.filter((x: string) => permissionUrl.startsWith(x))
          .length > 0
      );
    }
  }

  public addPermission(permissionId: any) {
    this.permissionList.push(permissionId);
  }

  public addPermissionUrl(permissionUrl: any) {
    this.permissionUrl.push(permissionUrl);
  }
}

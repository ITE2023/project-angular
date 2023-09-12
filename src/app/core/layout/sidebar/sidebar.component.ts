import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { MenuItems, UserInformationModel, Menu } from "@core/models";
import {
  AuthenticationAndAuthorizationService,
  ProfileShare,
} from "@core/services";
import { DefaultAvatar, LeftMenuKeyConfig } from "@core/constants";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import {
  sidebarAnimation,
  iconAnimation,
  labelAnimation,
} from "@core/helper/nav-bar-animations";
import { SidebarService } from "@core/services/nav-bar-toggle.service";
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";

@Component({
  selector: "ite-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  animations: [sidebarAnimation(), iconAnimation(), labelAnimation()],
})
export class SidebarComponent implements OnDestroy {
  contextMenuPosition = { x: "0px", y: "0px" };
  mobileQuery: MediaQueryList;
  @ViewChild("appMenu") childeMenu: MatMenu;
  sidebarState: string;
  selectedSubMenu: any;
  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;
  // tslint:disable-next-line: variable-name
  private _profileImage: string | null = null;
  // tslint:disable-next-line: variable-name
  private _profileName: string | null = null;
  userInformation: UserInformationModel;
  public menuItemList: Menu[];
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  private leftMenuConfig = LeftMenuKeyConfig;
  public get profileImage(): string {
    return this._profileImage;
  }
  public get profileName(): string {
    return this._profileName;
  }
  subscription: Subscription;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private authService: AuthenticationAndAuthorizationService,
    private router: Router,
    private profileShareService: ProfileShare,
    private sidebarService: SidebarService
  ) {
    this.sidebarService.sidebarStateObservable$.subscribe(
      (newState: string) => {
        this.sidebarState = newState;
        if (this.sidebarState === "close") {
          this.closeAll();
        } else {
          const currentNode = this.findMenuItem(this.router.url.split("?")[0]);
          if (currentNode && currentNode.isChildren) {
            this.menuItemList.forEach((data) => {
              if (data.id === currentNode.parentId) {
                if (!data.open) {
                  data.open = true;
                }
              }
            });
          }
        }
      }
    );
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
    this.mobileQuery = media.matchMedia("(min-width: 768px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.userInformation = this.authService.getUserInformation();
    this.subscription = this.profileShareService
      .getProfileInfo()
      .subscribe((profile) => {
        if (profile) {
          this._profileImage = profile.avatarUrl;
          this._profileName = profile.profileName;
        }
      });
    this._profileImage = this.userInformation.thumbnailPhoto
      ? this.userInformation.thumbnailPhoto
      : DefaultAvatar.toString();
    this._profileName = this.userInformation.userInformation;
    if (this.authService.getSideBarConfig()) {
      this.menuItemList = this.convertData(this.authService.getSideBarConfig());
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.menuItemList.length; i++) {
        if (
          this.menuItemList[i].state &&
          this.router.url.includes(this.menuItemList[i].state)
        ) {
          this.menuItemList[i].open = true;
        }
      }
    }
  }
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationEnd) {
      const url = this.router.url.split("?")[0];
      this.menuItemList.forEach((e) => {
        e.open = url.includes(e.state);
      });
    }
  }
  public get defaultAvatar(): string {
    return DefaultAvatar.toString();
  }
  findMenuItem(url: string): any {
    let result: any = undefined;
    if (this.menuItemList && this.menuItemList.length > 0) {
      this.menuItemList.forEach((data) => {
        if (data.state === url) {
          result = {
            isChildren: false,
            id: data.id,
          };
        }
        if (data.children && data.children.length > 0) {
          data.children.forEach((subdata) => {
            if (subdata.state === url) {
              result = {
                isChildren: true,
                id: subdata.id,
                parentId: data.id,
              };
            }
          });
        }
      });
    }
    return result;
  }
  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  openProfile() {
    this.router.navigate(["profile"]);
  }
  closeAll() {
    if (this.menuItemList && this.menuItemList.length > 0) {
      for (let i = 0; i < this.menuItemList.length; i++) {
        if (this.menuItemList[i].open) {
          this.menuItemList[i].open = false;
        }
      }
    }
  }
  toggleSection(index) {
    if (this.sidebarState === "open") {
      if (!this.menuItemList[index].open && this.sidebarState === "open") {
        // tslint:disable-next-line: prefer-for-of
        this.closeAll();
      }
      this.menuItemList[index].open = !this.menuItemList[index].open;
    } else {
      this.onContextMenu(
        this.menuItemList[index].id,
        this.menuItemList[index].children
      );
    }
  }
  onContextMenu(id: string, menu: Menu[]) {
    if (menu && menu.length > 0) {
      let selectItem = document.getElementById(id);
      let menuItem = document.getElementById("menu-item");

      const leftPosition = selectItem.offsetLeft + selectItem.offsetWidth + 3;
      const topPosition =
        selectItem.offsetTop + selectItem.offsetHeight - menuItem.scrollTop;
      this.contextMenuPosition.x = leftPosition + "px";
      this.contextMenuPosition.y = topPosition + "px";
      this.selectedSubMenu = menu;
      this.contextMenu.menu.focusFirstItem("mouse");
      this.contextMenu.openMenu();
    }
  }
  convertData(value: []): Menu[] {
    const result = [];
    value.forEach((data: any) => {
      // tslint:disable-next-line: prefer-const
      let item: Menu;
      const menuKey = this.getMenuKey(data.menu_id);
      item = {
        id: menuKey ? menuKey.menuId.toString() : "",
        state: menuKey ? menuKey.url : "",
        name: menuKey ? menuKey.menuKey : "",
        type: data.children && data.children.length > 0 ? "section" : "link",
        icon: menuKey ? menuKey.icon : "",
      };
      if (data.children) {
        item.children = this.convertData(data.children);
      }
      if (menuKey) {
        result.push(item);
      }
    });
    return result;
  }
  getMenuKey(menuId: number): any {
    const menu = this.leftMenuConfig.filter((c) => c.menuId === menuId);
    return menu.length > 0 ? menu[0] : undefined;
  }
  navigate(url: string) {
    this.router.navigateByUrl(url);
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  AfterViewChecked,
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { mainContentAnimation } from "@core/helper/nav-bar-animations";
import { SidebarService } from "@core/services/nav-bar-toggle.service";
import { MatSidenav } from "@angular/material/sidenav";
import { RouterEvent, NavigationEnd, Router } from "@angular/router";
import { LocalStorageType } from "@core/constants";

@Component({
  selector: "ite-layout",
  templateUrl: "./layout.component.html",
  animations: [mainContentAnimation()],
})
export class LayoutComponent implements OnInit, AfterViewChecked {
  @ViewChild("snav") sidenav: MatSidenav;
  selectedMenu: any;
  mobileQuery: MediaQueryList;
  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;
  public logo_url = "assets/images/logo/ITE_full.png";
  public logo_url_mobile = "assets/images/logo/ite_icon.svg";
  sidebarState: string;
  defaultUrl = "/admin/dashboard";

  constructor(
    private cdRef: ChangeDetectorRef,
    media: MediaMatcher,
    private sidebarService: SidebarService,
    private router: Router
  ) {
    this.defaultUrl = localStorage.getItem(LocalStorageType.DefaultUrl);
    this.mobileQuery = media.matchMedia("(min-width: 768px)");
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  toggleMenu() {
    // document.getElementById("snav").classList.add("hide-item");
    if (this.mobileQuery.matches) {
      this.sidebarService.toggle();
    } else {
      if (this.sidebarState === "close") {
        this.sidebarService.toggle();
      }
      this.sidenav.toggle();
    }
  }
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationEnd) {
      if (!this.mobileQuery.matches && this.sidenav.opened) {
        this.sidenav.toggle();
      }
    }
  }

  ngOnInit() {
    this.sidebarService.sidebarStateObservable$.subscribe(
      (newState: string) => {
        this.sidebarState = newState;
      }
    );
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }
}

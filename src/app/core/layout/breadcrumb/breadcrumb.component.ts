import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
import { Router } from "@angular/router";
import { BREADCRUMB_CONFIG, LocalStorageType } from "../../constants";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent implements OnInit {
  public breadConfig = [];
  public breadState: any;
  public defaultUrl = "/admin/dashboard";

  constructor(private router: Router) {
    this.flatternArray(this.breadConfig, BREADCRUMB_CONFIG);
    this.router.events.subscribe((event: any) => {
      let routerUrl;
      routerUrl = event.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === "string") {
        this.breadState = _.reverse(this.getBreadCrumbArray(routerUrl));
      }
    });
    this.defaultUrl = localStorage.getItem(LocalStorageType.DefaultUrl);
  }

  ngOnInit() {}
  flatternArray(result: any[], original: any[]) {
    original.forEach((data) => {
      result.push({
        id: data.id,
        name: data.name,
        url: data.url,
        parentId: data.parentId,
        icon: data.icon,
      });
      if (data.children) {
        this.flatternArray(result, data.children);
      }
    });
  }
  getBreadCrumbArray(url: string): any[] {
    let getSelectedSection = this.breadConfig.filter(
      (data) => url.startsWith(data.url) && data.url !== ""
    );
    let selectItem;
    if (getSelectedSection.length === 0) {
      return undefined;
    } else {
      while (getSelectedSection.length > 0) {
        selectItem = getSelectedSection[0];
        getSelectedSection = getSelectedSection.filter(
          (data) => data.parentId === selectItem.id
        );
      }
      // tslint:disable-next-line: new-parens
      const result = new Array();
      result.push(selectItem);
      while (selectItem.parentId && selectItem.id !== 1) {
        selectItem = this.breadConfig.filter(
          (data) => data.id === selectItem.parentId
        )[0];
        result.push(selectItem);
      }
      result.push({
        id: 0,
        name: "homepage",
        url: this.defaultUrl,
        icon: "home",
      });
      return result;
    }
  }
}

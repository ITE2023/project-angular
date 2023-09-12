import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageType } from '@core/constants';

@Component({
  selector: 'ite-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToHomePage() {
    let url = localStorage.getItem(LocalStorageType.DefaultUrl);
    if (url && url.trim() !== "") {
      this.router.navigateByUrl(url);
    } else {
      this.router.navigate(['login']);
    }
  }
}

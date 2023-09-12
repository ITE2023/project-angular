import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageType } from '@core/constants';

@Component({
  selector: 'ite-error-forbidden-page',
  templateUrl: './error-forbidden-page.component.html',
  styleUrls: ['./error-forbidden-page.component.scss']
})
export class ErrorForbiddenPageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  navigateToHomePage() {
    let url = localStorage.getItem(LocalStorageType.DefaultUrl);
    if (url && url.trim() != "") {
      this.router.navigateByUrl(url);
    } else {
      this.router.navigate(['login']);
    }
  }
}

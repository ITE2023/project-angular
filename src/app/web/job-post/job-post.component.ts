import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { CommonConstants, DATE_CONFIG } from "@core/constants";
import { AuthenticationAndAuthorizationService } from "@core/services";
import { JobPostService } from "@core/services/app/job-post/job-post.service";

@Component({
  selector: "ite-job-post",
  templateUrl: "./job-post.component.html",
  styleUrls: ["./job-post.component.scss"],
})
export class JobPostComponent implements OnInit {
  [x: string]: any;
  public firstDay: any;
  public searchForm: FormGroup;
  public maxFromDate: any;
  public maxToDate: any;
  public minToDate: any;
  public maxDate: Date;
  public currentDay: any;
  public dateConfig = DATE_CONFIG;
  public data: any;
  public page = 1;
  public totalRecords: any;
  public pageSize = 10;
  public pageSizes = CommonConstants.DEFAULT_PAGE_SIZE_OPTION;

  checkPermission(key) {
    return this.authService.checkPermission(key);
  }
  constructor(
    private authService: AuthenticationAndAuthorizationService,
    private formBuilder: FormBuilder,
    private jobPostService: JobPostService
  ) {
    this.maxDate = new Date();
    this.maxFromDate = new Date();
    this.maxToDate = new Date();
    const y = this.maxDate.getFullYear();
    const m = this.maxDate.getMonth();
    this.firstDay = new Date(y, 0, 1);
    this.currentDay = new Date();
    this.minToDate = this.firstDay;
    this.searchForm = this.formBuilder.group({
      from_date: [this.firstDay],
      to_date: [this.currentDay],
    });
  }

  ngOnInit(): void {
    this.data = this.jobPostService
      .getJobPostByUserId("7e66d61f-1514-5b34-8e7d-ab61ee0f1163")
      .subscribe(
        (data) => {
          this.data = data.result;
          this.totalRecords = data.result.length;
        },
        (error) => {
          console.error(error);
        }
      );
  }
  public searchData() {
    const form = this.searchForm.value;
  }
  getJobPostByUserId;

  keyPressDate(event) {
    const k = event.keyCdateChangeode;
    return k === 8 || k === 191 || (k >= 47 && k <= 57);
  }

  isInvalidDate(event, field) {
    if (event.target.value === "Invalid date") {
      this.f[field].setValue(null);
    }
  }
  get f() {
    return this.searchForm.controls;
  }

  dateChange(field) {
    if (field === "from_date") {
      this.minToDate = this.searchForm.value.from_date;
    }
    if (field === "to_date") {
      this.maxFromDate = this.searchForm.value.to_date;
    }
  }

  toDateChange(value: any) {
    if (value !== null) {
      if (this.compare(value, new Date()) === 1) {
        this.f.to_date.setValue(new Date());
      }
      const to = this.f.to_date.value;
      const from = this.f.from_date.value;
      if (from && this.compare(from, to) === 1) {
        this.f.to_date.setValue(from);
      }
      this.maxFromDate = this.f.to_date.value;
    } else {
      this.maxFromDate = new Date();
    }
  }


}

import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DATE_CONFIG, LocalStorageType } from "@core/constants";
import { LocalizeService } from "@core/localization";
import { JobPostLocationService, JobTypeService } from "@core/services";
import { JobPostService } from "@core/services/app/job-post/job-post.service";
import { QuillEditorComponent } from "ngx-quill";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'ite-add-job-post',
  templateUrl: './add-job-post.component.html',
  styleUrls: ['./add-job-post.component.scss']
})
export class AddJobPostComponent implements OnInit {
  @ViewChild("editor") editor!: QuillEditorComponent;
  public isDisabled = true;
  public jobTypeForm: FormGroup;
  public minToDate: any;
  public firstDay: any;
  public dateConfig = DATE_CONFIG;
  public data: any;
  public dataJobLocation: any;
  public idUser: string;
  public user: any;
  constructor(
    private jobTypeService: JobTypeService,
    private jobPostService: JobPostService,
    private jobPostLocationService: JobPostLocationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private localizeService: LocalizeService,
    private toastService: ToastrService,
  ) {
    this.user = JSON.parse(localStorage.getItem(LocalStorageType.UserInformation)); 
    this.idUser =  this.user.id
    this.minToDate = this.firstDay;
      this.jobTypeService.getJobTypeAll().subscribe(
        (data) => {
          this.data = data.result;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  editorInstance: any;
  ngOnInit() {
    this.jobTypeForm = this.fb.group({
      title: this.fb.control("", [Validators.required]),
      salary: this.fb.control("", [Validators.required]),
      idJobType: this.fb.control("", [Validators.required]),
      expiredAt: this.fb.control("", [Validators.required]),
      country: this.fb.control("", [Validators.required]),
      district: this.fb.control("", [Validators.required]),
      city: this.fb.control("", [Validators.required]),
      ward: this.fb.control("", [Validators.required]),
      street: this.fb.control("", [Validators.required]),
      description: this.fb.control("", [Validators.required]),
    });
  }
  editorStyle = {
    height: "600px",
  };

  editorModules = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ header: 1 }, { header: 2 }],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],
      ],
    },
  };

  public onSubmit() {
    if (this.jobTypeForm.valid) {
      let request = Object.assign({}, this.jobTypeForm.value);
      request.expiredAt = this.datePipe.transform(request.expiredAt, 'yyyy-MM-ddTHH:mm:ss');
      console.log(request);
      const currentDate = new Date();
      const currentDateTimeString = currentDate.toISOString();
      console.log(currentDateTimeString);
      
      let dataJobPost = {
        title: request.title,
        description: request.description,
        salary: request.salary,
        idUser: this.idUser,
        idJobType: request.idJobType,
        expiredAt: request.expiredAt,
      };
      let dataJobPostLocation = {
        street: request.street,
        ward: request.ward,
        district: request.district,
        city: request.city,
        country: request.country,
      };
      console.log(dataJobPost);      
      console.log(dataJobPostLocation);      

      this.jobPostLocationService.addJobPostLocation(dataJobPostLocation).subscribe((data) => {
        this.jobPostService.addJobPost({IdLocationJobPost: data.result[0].id, ...dataJobPost, IsActive: 1    }).subscribe((data) => {
          const message = this.localizeService.instant(
            "job-post-mes.validator.successAdd"
          );
          this.toastService.success(message);
          this.redirect();
      });
      console.log(data);
      
      });
    }
  };

  redirect() {
    this.router.navigate(["admin/job-post"]);
  }
}

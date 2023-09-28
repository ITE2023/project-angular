import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DATE_CONFIG } from "@core/constants";
import { JobPostLocationService, JobTypeService } from "@core/services";
import { JobPostService } from "@core/services/app/job-post/job-post.service";
import { QuillEditorComponent } from "ngx-quill";
@Component({
  selector: "ite-edit-job-post",
  templateUrl: "./edit-job-post.component.html",
  styleUrls: ["./edit-job-post.component.scss"],
})
export class EditJobPostComponent implements OnInit {
  @ViewChild("editor") editor!: QuillEditorComponent;
  public isDisabled = true;
  public jobTypeForm: FormGroup;
  public minToDate: any;
  public firstDay: any;
  public dateConfig = DATE_CONFIG;
  public data: any;
  public dataJob: any;
  public dataJobLocation: any;
  public id: string;
  constructor(
    private jobTypeService: JobTypeService,
    private jobPostService: JobPostService,
    private jobPostLocationService: JobPostLocationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.minToDate = this.firstDay;
    this.route.paramMap.subscribe((param) => {
      const id = String(param.get("id"));
      this.jobPostService.getJobPostById(id).subscribe(
        (data) => {
          this.dataJob = data.result[0];
          this.jobPostLocationService
            .getJobPostLocationById(this.dataJob.idLocationJobPost)
            .subscribe((data) => {
              this.dataJobLocation = data.result[0];

              if (this.dataJob) {
                this.jobTypeForm.patchValue({
                  title: this.dataJob.title,
                  salary: this.dataJob.salary,
                  idJobType: this.dataJob.idJobType,
                  expiredAt: this.dataJob.expiredAt,
                  country: this.dataJobLocation.country,
                  district: this.dataJobLocation.district,
                  city: this.dataJobLocation.city,
                  ward: this.dataJobLocation.ward,
                  street: this.dataJobLocation.street,
                  description: this.dataJob.description,
                })
              }
            });
        },
        (error) => {
          console.error(error);
        }
      );
      this.jobTypeService.getJobTypeAll().subscribe(
        (data) => {
          this.data = data.result;
        },
        (error) => {
          console.error(error);
        }
      );
    });
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

  toggleForm() {
    if (!this.isDisabled) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }
  public onSubmit() {
    if (this.jobTypeForm.valid) {
      let request = Object.assign({}, this.jobTypeForm.value);
      request.expiredAt = this.datePipe.transform(request.expiredAt, 'yyyy-MM-ddTHH:mm:ss');
      console.log(request);
      const currentDate = new Date();
      const currentDateTimeString = currentDate.toISOString();
      console.log(currentDateTimeString);
      
      let dataJobPost = {
        id: this.dataJob.id,
        title: request.title,
        description: request.description,
        salary: request.salary,
        idLocationJobPost: this.dataJob.idLocationJobPost,
        idUser: this.dataJob.idUser,
        idJobType: request.idJobType,
        updatedAt: currentDateTimeString,
        expiredAt: request.expiredAt,
      };
      let dataJobPostLocation = {
        street: request.street,
        ward: request.ward,
        district: request.district,
        city: request.city,
        country: request.country,
        id: this.dataJob.idLocationJobPost
      };
      console.log(dataJobPost);      
      console.log(dataJobPostLocation);      
      this.jobPostService.updateJobPost(dataJobPost).subscribe((data) => {
        console.log(data);
        
      });
      this.jobPostLocationService.updateJobPostLocation(dataJobPostLocation).subscribe((data) => {
        console.log(data);
      });
    }
  };
}

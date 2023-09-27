import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DATE_CONFIG } from '@core/constants';
import { JobTypeService } from '@core/services';
import { QuillEditorComponent } from 'ngx-quill';
@Component({
  selector: 'ite-edit-job-post',
  templateUrl: './edit-job-post.component.html',
  styleUrls: ['./edit-job-post.component.scss']
})
export class EditJobPostComponent implements OnInit {
  @ViewChild('editor') editor!: QuillEditorComponent;

  public jobTypeForm: FormGroup;
  public minToDate: any;
  public firstDay: any;
  public dateConfig = DATE_CONFIG;
  public data: any;
  
  constructor( private jobTypeService: JobTypeService ) {
    this.minToDate = this.firstDay;
    this.data = this.jobTypeService.getJobTypeAll().subscribe(
      (data) => {
        this.data = data.result;
         console.log(this.data);
      },
      (error) => {
        console.error(error);
      }
    );;    
  }
  editorForm: FormGroup;

  editorInstance: any;
  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }
  editorStyle = {
    height: '600px'
  };


  editorModules = {
    toolbar: {
      container: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image']
      ]
    },
  };
}

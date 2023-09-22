import { Component, OnInit,ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
@Component({
  selector: 'ite-edit-job-post',
  templateUrl: './edit-job-post.component.html',
  styleUrls: ['./edit-job-post.component.scss']
})
export class EditJobPostComponent implements OnInit {
  @ViewChild('editor') editor!: QuillEditorComponent;
  constructor( ) {
  }
  editorForm: FormGroup;

  editorInstance: any;

  onEditorCreated(editorInstance: any) {
    this.editorInstance = editorInstance;
  }
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
    imageResize: true
  };
}

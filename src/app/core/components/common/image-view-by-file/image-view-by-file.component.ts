import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ite-image-view-by-file',
  templateUrl: './image-view-by-file.component.html',
  styleUrls: ['./image-view-by-file.component.scss']
})
export class ImageViewByFileComponent implements OnInit {
  public imageFile: any;
  public imageUrl: any;
  constructor(
    public dialogRef: MatDialogRef<ImageViewByFileComponent>
  ) { }
  ngOnInit(): void {
    let file = new FileReader();
    file.readAsDataURL(this.imageFile);
    file.onload = () => { this.imageUrl = file.result }
  }
  close() {
    this.dialogRef.close();
  }
}

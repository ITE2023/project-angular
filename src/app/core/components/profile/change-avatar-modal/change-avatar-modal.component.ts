import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService, BrowserAndLocationInformationService, ProfileShare, AuthenticationAndAuthorizationService } from '@core/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInformationModel } from '@core/models';
import { LocalStorageType } from '@core/constants';

@Component({
  selector: 'ite-change-avatar-modal',
  templateUrl: './change-avatar-modal.component.html',
  styleUrls: ['./change-avatar-modal.component.scss']
})
export class ChangeAvatarModalComponent implements OnInit {
  url: any;
  disableSave = true;
  errorMessage = '';
  fileName = '';
  fileAccept = ['jpg', 'jpeg', 'png'];
  uploadForm: FormGroup;
  private userInfo: UserInformationModel;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    public dialogRef: MatDialogRef<ChangeAvatarModalComponent>,
    private profileShareService: ProfileShare,
    private authService: AuthenticationAndAuthorizationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.url = this.data.avatar ? this.data.avatar : '';
  }
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const checkFile = this.imageFileValidate(event.target.files[0]);
      if (checkFile.validate) {
        this.disableSave = false;
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileName = event.target.files[0].name;
        this.errorMessage = '';
        // tslint:disable-next-line: no-shadowed-variable
        reader.onload = (loadevent: any) => { // called once readAsDataURL is completed
          this.url = loadevent.target.result;
        };
        const file = event.target.files[0];
        this.uploadForm.get('profile').setValue(file);
      } else {
        this.disableSave = true;
        this.fileName = '';
        this.errorMessage = checkFile.message;
        this.url = '';
      }
    } else {
      this.disableSave = true;
      this.fileName = '';
      this.url = '';
      // this.errorMessage = 'Vui lòng chọn ảnh JPG,JPEG,PNG với kích thước tối đa 5MB!';
    }
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  chooseImage(event: any) {
    event.preventDefault();
    const element: HTMLElement = document.getElementById('imageInput');
    element.click();
  }
  imageFileValidate(file: any): any {
    if (this.fileAccept.filter(value => value === this.getExtensionFile(file.name).toLowerCase()).length > 0) {
      if (file.size > 2 * 1024 * 1024) {
        return {
          validate: false,
          message: 'changeimage.message.overSize'
        };
      } else {
        this.disableSave = false;
        return {
          validate: true
        };
      }
    } else {
      return {
        validate: false,
        message: 'changeimage.message.wrongFormat'
      };
    }
  }
  getExtensionFile(fileName: string): string {
    return fileName.split('.').pop();
  }
  saveAvatar() {
    if (this.uploadForm.get('profile').value) {
      const info = BrowserAndLocationInformationService.getInfo();
      if (!info.ip_address || info.ip_address === 'undefined') {
        info.ip_address = '118.70.124.48';
      }
      this.userService.changeAvatar(this.uploadForm.get('profile').value, info)
        .subscribe((apiResponse: any) => {
          if (!apiResponse) {
            this.errorMessage = 'Có lỗi trong quá trình gửi yêu cầu. Vui lòng thử lại hoặc liên lạc với quản trị viên';
          } else {
            if (apiResponse.error_code !== '00') {
              this.errorMessage = apiResponse.error_message;
            } else {
              this.userInfo = this.authService.getUserInformation();
              this.userInfo.thumbnailPhoto = apiResponse.avatar_url;
              this.authService.addLoginResultToLocalStorage(this.userInfo);

              this.profileShareService.setProfileInfo(apiResponse.avatar_url, this.userInfo.displayName);
              this.userInfo.thumbnailPhoto = apiResponse.avatar_url;
              localStorage.setItem(LocalStorageType.UserInformation, JSON.stringify(this.userInfo));
              this.dialogRef.close({ event: 'close', data: this.userInfo });
            }
          }
        });
    }
  }

  cancel(isSuccess) {
    this.dialogRef.close(isSuccess);
  }
}


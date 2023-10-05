import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppComponent } from "./app/app.component";
import { LayoutComponent } from "./layout/layout.component";
import { RouterModule } from "@angular/router";
import { TopbarComponent } from "./layout/topbar/topbar.component";
import { SharedModule } from "../shared/shared/shared.module";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule } from "@angular/forms";
import { DirectivesModule } from "./directives/directives.module";
import { BreadcrumbComponent } from "./layout/breadcrumb/breadcrumb.component";
import { ChangePasswordComponent } from "./layout/topbar/change-password/change-password.component";
import { ProfileModalComponent } from "./components/profile/profile-modal/profile-modal.component";
import { ChangeAvatarModalComponent } from "./components/profile/change-avatar-modal/change-avatar-modal.component";
import { FooterButtonComponent } from "./components/common/footer-button/footer-button.component";
import { ImageViewByFileComponent } from "./components/common/image-view-by-file/image-view-by-file.component";
import { QrCodeViewerDialogComponent } from "./components/common/qr-code-viewer-dialog/qr-code-viewer-dialog.component";
import { QrCodeViewerFromSourceDialogComponent } from "./components/common/qr-code-viewer-from-source-dialog/qr-code-viewer-from-source-dialog.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { NotificationComponent } from "./layout/topbar/notification/notification.component";
import { TranslateModule } from "@ngx-translate/core";
import { SuccessDialogComponent } from "./components/forgot-password/success-dialog/success-dialog/success-dialog.component";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { DocumentViewerComponent } from "./components/common/document-viewer/document-viewer.component";
import { NotificationDialogComponent } from "./components/notification-dialog/notification-dialog.component";
import { ErrorForbiddenPageComponent } from './components/error-forbidden-page/error-forbidden-page.component';
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { RegisterComponent } from "./components/register/register.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { ChangePasswordModalComponent } from './components/profile/change-password-modal/change-password-modal.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [
    TopbarComponent,
    ChangePasswordComponent,
    SidebarComponent,
    AppComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    BreadcrumbComponent,
    ProfileModalComponent,
    ChangeAvatarModalComponent,
    FooterButtonComponent,
    ImageViewByFileComponent,
    QrCodeViewerDialogComponent,
    QrCodeViewerFromSourceDialogComponent,
    ForgotPasswordComponent,
    NotificationComponent,
    ResetPasswordComponent,
    SuccessDialogComponent,
    DocumentViewerComponent,
    NotificationDialogComponent,
    ErrorForbiddenPageComponent,
    PageNotFoundComponent,
    ChangePasswordModalComponent,
    ModalConfirmComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    FormsModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    PdfViewerModule,
  ],
  entryComponents: [
    ChangePasswordComponent,
    ChangeAvatarModalComponent,
    ProfileModalComponent,
    ChangePasswordModalComponent
  ],
  exports: [
    AppComponent,
    DirectivesModule,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    ErrorForbiddenPageComponent
  ],
})
export class CoreModule { }

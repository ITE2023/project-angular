import { Routes } from "@angular/router";
import { TitleConstants } from "@core/constants";
import { JobPostComponent } from "./job-post.component";
import { EditJobPostComponent } from "./edit-job-post/edit-job-post.component";
import { AddJobPostComponent } from "./add-job-post/add-job-post.component";

export const routing: Routes = [
  {
    path: "",
    resolve: {},
    children: [
      {
        path: "",
        component: JobPostComponent,
        data: {
          title: TitleConstants.MANAGE_JOP_POST,
        },
      },
      {
        path: "edit/:id",
        component: EditJobPostComponent,
        data: {
          title: TitleConstants.EDIT_JOP_POST,
        },
      },
      {
        path: "add",
        component: AddJobPostComponent,
        data: {
          title: TitleConstants.EDIT_JOP_POST,
        },
      },
    ],
  },
];

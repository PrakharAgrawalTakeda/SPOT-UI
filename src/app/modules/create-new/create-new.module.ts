import { NgModule, Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProjectComponent } from './create-project/create-project.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProjectHubModule } from '../project-hub/project-hub.module';
import { ProjectHubService } from './../project-hub/project-hub.service';
import { GeneralInfoComponent } from './../project-hub/general-info/general-info.component';
import { GeneralInfoSingleEditComponent } from '../project-hub/general-info/general-info-single-edit/general-info-single-edit.component';
import { CreateNewComponent } from './create-new.component';
import { CopyProjectComponent } from './copy-project/copy-project.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SpotFormsModule } from 'app/core/spot-forms/spot-forms.module';
import '@angular/compiler'
import { SearchModule } from 'app/layout/common/search/search.module';
import { FuseFullscreenModule } from '@fuse/components/fullscreen/fullscreen.module';
import { LanguagesModule } from 'app/layout/common/languages/languages.module';
import { ShortcutsModule } from 'app/layout/common/shortcuts/shortcuts.module';
import { UserModule } from 'app/layout/common/user/user.module';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';
import { MessagesModule } from 'app/layout/common/messages/messages.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// Portfolio Manager C9F323D4 - EF97 - 4C2A - B748 - 11DB5B8589D0

export const projectRoutes: Routes = [
  { path: '', component: CreateNewComponent },
  {
    path: 'create-strategic-initiative-project',
    component: CreateProjectComponent,
    pathMatch: 'full'
  },
  {
    path: 'create-new-project',
    component: CreateProjectComponent,
    pathMatch: 'full'
  },
  {
    path: 'copy-project',
    component: CopyProjectComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    CreateProjectComponent,
    CreateNewComponent,
    CopyProjectComponent

  ],
  imports: [

    RouterModule.forChild(projectRoutes),
    MatButtonModule,
    // BrowserAnimationsModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatIconModule,
    MatStepperModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatSlideToggleModule,
    NgApexchartsModule,
    TranslocoModule,
    SharedModule,
    CommonModule,
    SpotFormsModule,
    FuseDrawerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    NgxDatatableModule,
    SearchModule,
    FuseFullscreenModule,
    LanguagesModule,
    ShortcutsModule,
    UserModule,
    NotificationsModule,
    MessagesModule,
    ProjectHubModule
  ],
  exports: [RouterModule]
})
export class CreateNewModule { }

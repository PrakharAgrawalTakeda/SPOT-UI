import { Component, NgModule } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatChipsModule } from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseAlertModule } from '@fuse/components/alert';
import { ResourceAdministrationComponent } from './resource-administration.component';
import { SpotFormsModule } from 'app/core/spot-forms/spot-forms.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpotGlobalMessageModule } from 'app/layout/common/spot-global-message/spot-global-message.module';
import { MessagesModule } from 'app/layout/common/messages/messages.module';
import { EditResourceHeirarchyComponent } from './edit-resource-heirarchy/edit-resource-heirarchy.component';
export const projectRoutes: Routes = [
    {
      path: '',
      component: ResourceAdministrationComponent
}];


@NgModule({
    declarations: [
        ResourceAdministrationComponent,
        EditResourceHeirarchyComponent
    ],
    exports: [
        //MilestoneSetViewEditComponent
    ],
    imports: [
        RouterModule.forChild(projectRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatExpansionModule,
        NgApexchartsModule,
        TranslocoModule,
        SharedModule,
        CommonModule,
        FuseDrawerModule,
        FuseNavigationModule,
        NgScrollbarModule,
        MatChipsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        NgxDatatableModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatAutocompleteModule,
        MatTooltipModule,
        FuseAlertModule,
        SpotFormsModule,
        DragDropModule,
        SpotGlobalMessageModule,
        MatSnackBarModule,
        MessagesModule
    ]
})
export class ResourceAdministrationModule { }

import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
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
import { PortfolioCenterComponent } from './portfolio-center.component';
import { CommonModule } from '@angular/common';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SpotFormsModule } from 'app/core/spot-forms/spot-forms.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { ForecastComponent } from './budget-spend/forecast/forecast.component';
import { BudgetSpendComponent } from './budget-spend/budget-spend.component';
import { PortfolioPerformanceComponent } from './budget-spend/portfolio-performance/portfolio-performance.component';
import { ProjectPerformanceComponent } from './budget-spend/project-performance/project-performance.component';
import { FxRateComponent } from './budget-spend/fx-rate/fx-rate.component';
import { ForecastExcelUpdateComponent } from './budget-spend/forecast-excel-update/forecast-excel-update.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpreadsheetModule } from '@progress/kendo-angular-spreadsheet';
import { SpotGlobalMessageModule } from 'app/layout/common/spot-global-message/spot-global-message.module';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { BookmarkEditComponent } from './bookmarks/bookmark-edit/bookmark-edit.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SaveBookmarkComponent } from './save-bookmark/save-bookmark.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ForecastBulkEditComponent } from './budget-spend/forecast-bulk-edit/forecast-bulk-edit.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MessagesModule } from 'app/layout/common/messages/messages.module';

export const projectRoutes: Route[] = [
  {
    path: '',
    component: PortfolioCenterComponent
  }];


@NgModule({
    declarations: [
        PortfolioCenterComponent,
        ForecastComponent,
        BudgetSpendComponent,
        PortfolioPerformanceComponent,
        ProjectPerformanceComponent,
        FxRateComponent,
        ForecastExcelUpdateComponent,
        BookmarksComponent,
        BookmarkEditComponent,
        SaveBookmarkComponent,
        ForecastBulkEditComponent,
    ],
    imports: [
        RouterModule.forChild(projectRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatDialogModule,
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
        MatChipsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        SpotFormsModule,
        NgScrollbarModule,
        NgxDatatableModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatTooltipModule,
        SpreadsheetModule,
        SpotGlobalMessageModule,
        MessagesModule
    ],
    exports: [RouterModule],
})
export class PortfolioCenterModule {}

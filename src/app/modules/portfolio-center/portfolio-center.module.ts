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
import { ForecastComponent } from './forecast/forecast.component';

export const projectRoutes: Route[] = [
  {
    path: '',
    component: PortfolioCenterComponent,
  },
  {
    path: 'forecast',
    component: ForecastComponent,
    // pathMatch: 'full'
  },
];
@NgModule({
  declarations: [
    PortfolioCenterComponent,
    ForecastComponent
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
  ],
  exports: [RouterModule]
})
export class PortfolioCenterModule { }

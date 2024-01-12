import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotGlobalMessageComponent } from './spot-global-message.component';
import { SharedModule } from 'app/shared/shared.module';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SpotGlobalMessageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FuseAlertModule,
    MatIconModule
  ],
  exports: [
    SpotGlobalMessageComponent
  ]
})
export class SpotGlobalMessageModule { }

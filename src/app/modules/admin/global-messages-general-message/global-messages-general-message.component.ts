import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AdminService } from '../admin.service';
import { AdminApiService } from '../admin-api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-global-messages-general-message',
  templateUrl: './global-messages-general-message.component.html',
  styleUrls: ['./global-messages-general-message.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GlobalMessagesGeneralMessageComponent implements OnInit, OnDestroy {
  globalMessages: any = []
  @ViewChild('GlobalMessageTable') table: any;
  viewContent: boolean = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(public adminService: AdminService, private adminApiService: AdminApiService) {

    this.adminService.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(x => {
      if (this.viewContent) {
        this.dataloader()
      }
    })
  }

  ngOnInit(): void {
    this.dataloader();
  }

  dataloader() {
    this.adminApiService.getGlobalMessages().then((res: any) => {
      console.log(res)
      this.globalMessages = res
      this.viewContent = true;
    })

  }
  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
  deleteGlobalMessage(id) {
    this.adminApiService.deleteGlobalMessage(id).then(res=>{
      this.dataloader()
    })
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}

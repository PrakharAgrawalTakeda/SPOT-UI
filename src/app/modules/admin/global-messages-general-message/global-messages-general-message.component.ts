import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AdminService } from '../admin.service';
import { AdminApiService } from '../admin-api.service';

@Component({
  selector: 'app-global-messages-general-message',
  templateUrl: './global-messages-general-message.component.html',
  styleUrls: ['./global-messages-general-message.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GlobalMessagesGeneralMessageComponent implements OnInit {
  globalMessages: any = []
  @ViewChild('GlobalMessageTable') table: any;
  viewContent: boolean = false;
    constructor(public adminService: AdminService, private adminApiService: AdminApiService) { }
  
    ngOnInit(): void {
     this.dataloader();
    }

    dataloader(){
      this.adminApiService.getGlobalMessages().then((res: any) => {
        console.log(res)
        this.globalMessages = res
        this.viewContent = true;
      })

    }
    toggleExpandRow(row) {
      this.table.rowDetail.toggleExpandRow(row);
    }
}

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { AdminApiService } from '../../admin-api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-global-message-edit',
  templateUrl: './global-message-edit.component.html',
  styleUrls: ['./global-message-edit.component.scss']
})
export class GlobalMessageEditComponent implements OnInit {
    globalMessageForm: any =  new FormGroup({
      createdBy: new FormControl(''),
      globalMessageId: new FormControl(''),
      globalMessageText: new FormControl(null),
      isActive: new FormControl(false),
      isHtml: new FormControl(''),
      messageCreationDate: new FormControl(''),
      messageId: new FormControl(''),
      messageTitle: new FormControl(''),
      messageType: new FormControl('4D2CBD20-371D-4452-B098-FAF5A43CC6EF')
    })
    constructor(public adminService: AdminService, private adminApiService: AdminApiService) { }
  
    ngOnInit(): void {
      if(this.adminService.itemid != "new"){
        this.globalMessageForm.patchValue({
          createdBy: this.adminService.item?.createdBy,
          globalMessageId: this.adminService.item?.globalMessageId,
          globalMessageText: this.adminService.item?.globalMessageText,
          isActive: this.adminService.item?.isActive,
          isHtml: this.adminService.item?.isHtml,
          messageCreationDate: this.adminService.item?.messageCreationDate,
          messageId: this.adminService.item?.messageId,
          messageTitle: this.adminService.item?.messageTitle,
          messageType: this.adminService.item?.messageType
        })
      }
    }

}

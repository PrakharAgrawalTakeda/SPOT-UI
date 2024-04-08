import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { AdminApiService } from '../../admin-api.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MsalService } from '@azure/msal-angular';
@Component({
  selector: 'app-global-message-edit',
  templateUrl: './global-message-edit.component.html',
  styleUrls: ['./global-message-edit.component.scss']
})
export class GlobalMessageEditComponent implements OnInit {
    globalMessageForm: FormGroup =  new FormGroup({
      createdBy: new FormControl(this.msalService.instance.getActiveAccount()?.localAccountId),
      globalMessageId: new FormControl(''),
      globalMessageText: new FormControl(null),
      isActive: new FormControl(false),
      isHtml: new FormControl(false),
      messageCreationDate: new FormControl(moment().format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')),
      messageId: new FormControl(null),
      messageTitle: new FormControl(''),
      messageType: new FormControl('4D2CBD20-371D-4452-B098-FAF5A43CC6EF')
    })
    constructor(public adminService: AdminService, private adminApiService: AdminApiService, private msalService: MsalService) { }
  
    ngOnInit(): void {
      if(this.adminService.itemid != "new"){
        this.globalMessageForm.patchValue({
          createdBy: this.adminService.all?.createdBy,
          globalMessageId: this.adminService.all?.globalMessageId,
          globalMessageText: this.adminService.all?.globalMessageText,
          isActive: this.adminService.all?.isActive,
          isHtml: this.adminService.all?.isHtml,
          messageCreationDate: moment(this.adminService.all?.messageCreationDate).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
          messageId: this.adminService.all?.messageId,
          messageTitle: this.adminService.all?.messageTitle,
          messageType: this.adminService.all?.messageType
        })
      }
    }
    submitMessage(){
      var formValue = this.globalMessageForm.getRawValue()
      if(this.adminService.itemid != "new"){
        this.adminApiService.updateGlobalMessage(this.adminService.itemid, formValue).then(res=>{
          this.adminService.submitbutton.next(true)
          this.adminService.toggleDrawerOpen('','',[],'',false)
        })
      }
      else{
      this.adminApiService.addGlobalMessage(formValue).then(res=>{
          this.adminService.submitbutton.next(true)
          this.adminService.toggleDrawerOpen('','',[],'',false)
        })
      }
    }

}

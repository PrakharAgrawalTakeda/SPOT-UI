import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from 'app/core/auth/auth.service';
import { RoleService } from 'app/core/auth/role.service';
import { MyPreferenceApiService } from './my-preference-api.service';

@Component({
  selector: 'app-my-preference',
  templateUrl: './my-preference.component.html',
  styleUrls: ['./my-preference.component.scss']
})
export class MyPreferenceComponent implements OnInit {

  preferenceForm = new FormGroup({
    role: new FormControl('')
  })
  lookupdata: any = []
  constructor(private titleService: Title, public auth: AuthService, private roleService: RoleService, private apiService: MyPreferenceApiService, private msalService: MsalService) { }

  ngOnInit(): void {

    this.auth.lookupMaster().then(res=>{
      this.lookupdata =  res
      this.preferenceForm.patchValue({
        role: this.roleService.roleMaster.securityGroupId
      })
      this.titleService.setTitle("My Preferences")
    })
    
  }
  getRoles(): any{
    return this.lookupdata.filter(x => x.lookUpParentId == '3FF934A4-D5FC-4F92-AE75-78A5EBC64A1B').sort((a, b) => {
      return a.lookUpOrder - b.lookUpOrder;
    })
  }

  updateRole(value: any){
    console.log(this.msalService.instance.getActiveAccount().localAccountId)
    console.log(value.value)
    this.apiService.updateRole(this.msalService.instance.getActiveAccount().localAccountId,value.value).then(res=>{
      location.reload()
    })
  }
}

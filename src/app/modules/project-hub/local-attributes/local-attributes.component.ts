import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';

@Component({
  selector: 'app-local-attributes',
  templateUrl: './local-attributes.component.html',
  styleUrls: ['./local-attributes.component.scss']
})
export class LocalAttributesComponent implements OnInit {
  localAttributeForm: any = new FormGroup({})
  viewContent = false
  id = ''
  data: any
  lookupData: any
  constructor(private _Activatedroute: ActivatedRoute, public auth: AuthService, private projectHubService: ProjectHubService, private apiService: ProjectApiService) { }

  ngOnInit(): void {
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getLocalAttributes(this.id).then((res: any) => {
      this.auth.lookupMaster().then(res1 => {
        this.lookupData = res1
        this.data = res
        this.data.forEach(i => {
          if (i.dataType == 2) {
            i.data = i.data + 'T00:00:00'
          }
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        })
        this.viewContent = true
        this.disabler()
      })
    })
    // this.data = [
    //   {
    //     key: 'brave',
    //     label: 'Bravery Rating',
    //     order: 3,
    //     type: 'text',
    //     lookupName: ''
    //   },
    //   {
    //     key: 'firstName',
    //     label: 'First name',
    //     order: 1,
    //     type: 'text',
    //     lookupName: ''
    //   },
    //   {
    //     key: 'emailAddress',
    //     label: '',
    //     order: 2,
    //     type: 'date',
    //     lookupName: ''
    //   }
    // ];
    
  }

  getPortfolioOwner(key) {
    console.log(key)
    return this.lookupData.filter(x => x.lookUpParentId == key)
  }

  disabler() {
    this.localAttributeForm.disable()
  }
}

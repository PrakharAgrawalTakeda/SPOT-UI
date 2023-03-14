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
  editable= false
  constructor(private _Activatedroute: ActivatedRoute, public auth: AuthService, private projectHubService: ProjectHubService, private apiService: ProjectApiService) { }

  ngOnInit(): void {
    if (this.projectHubService.roleControllerControl.projectHub.localAttributes) {
      this.editable = true
    }
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getLocalAttributes(this.id).then((res: any) => {
      this.auth.lookupMaster().then(res1 => {
        this.lookupData = res1
        this.data = res
        this.data.forEach(i => {
          if (i.dataType == 3 && i.isMulti == true){
            if(i.data == null){
              i.data = []
            }
            else{
              if(Array.isArray(i.data)){
                var newData = i.data
                for (var j = 0; j < newData.length;j++){
                  i.data[j] = this.lookupData.filter(x => x.lookUpId == newData[j])[0]
                }
              }
              else{
                var newData1 = []
                newData1 .push(this.lookupData.filter(x => x.lookUpId == i.data)[0])
                i.data = newData1
              }
            }
          }
          else if (i.dataType == 3 && i.isMulti == false) {
            if (i.data == null) {
              i.data = ""
            }
            else {
              i.data = this.lookupData.filter(x => x.lookUpId == i.data)[0].lookUpName
            }
          }
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        })
        this.viewContent = true
        this.disabler()
      })
    })
  }

  getLookup(key) {
    return this.lookupData.filter(x => x.lookUpParentId == key)
  }

  disabler() {
    this.localAttributeForm.disable()
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';

@Component({
  selector: 'app-local-attribute-single-edit',
  templateUrl: './local-attribute-single-edit.component.html',
  styleUrls: ['./local-attribute-single-edit.component.scss']
})
export class LocalAttributeSingleEditComponent {
  localAttributeForm: any = new FormGroup({})
  viewContent = false
  viewType = 'SidePanel'
  data: any
  lookupData: any
  constructor(private projectHubService: ProjectHubService, public auth: AuthService, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute) { 
    this.localAttributeForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projectHubService.isFormChanged = true
      }
    })
  }

  ngOnInit(): void {
    this.apiService.getLocalAttributes(this.projectHubService.projectid).then((res: any) => {
      this.auth.lookupMaster().then(res1 => {
        this.lookupData = res1
        this.data = res
        this.data.forEach(i => {
          if (i.dataType == 3 && i.isMulti == true) {
            if (i.data == null) {
              i.data = []
            }
            else {
              if (Array.isArray(i.data)) {
                var newData = i.data
                for (var j = 0; j < newData.length; j++) {
                  i.data[j] = this.lookupData.filter(x => x.lookUpId == newData[j])[0]
                }
              }
              else {
                var newData1 = []
                newData1.push(this.lookupData.filter(x => x.lookUpId == i.data)[0])
                i.data = newData1
              }
            }
          }
          else if (i.dataType == 3 && i.isMulti == false) {
            if (i.data == null) {
              i.data = ""
            }
            else {
              i.data = this.lookupData.filter(x => x.lookUpId == i.data)[0]
            }
          }
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        })
        this.viewContent = true
      })
    })
  }

  getLookup(key) {
    return this.lookupData.filter(x => x.lookUpParentId == key)
  }

  submitLA(data){
    console.log(data)
    var formValue = this.localAttributeForm.getRawValue()
    console.log(formValue)
  }

  addNewItem(name, data){
    // if (data.target.value.toString().split('.')[1].length > 2){
    //   this.localAttributeForm.controls[name].setValue(Math.round(data.target.value * 100) / 100);
    // }
    // else{
    this.localAttributeForm.controls[name].setValue(data.target.value);
    // }
  }
}

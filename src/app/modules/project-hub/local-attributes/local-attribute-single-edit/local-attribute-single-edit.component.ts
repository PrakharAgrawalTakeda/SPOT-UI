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
  localAttributeFormRaw: any = new FormGroup({})
  viewContent = false
  viewType = 'SidePanel'
  data: any
  rawData: any
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
        // this.rawData = res
        this.data.forEach(i => {
          this.localAttributeFormRaw.addControl(i.uniqueId, new FormControl(i.data))
        })
        this.data.forEach(i => {
          if (i.dataType == 1 && i.data.length == 0) {
            i.data = false
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 1 && i.data.length > 0) {
            i.data = i.data[0].value
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 2 && i.data.length == 0) {
            i.data = ""
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 2 && i.data.length > 0) {
            i.data = i.data[0].value
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 3 && i.isMulti == true) {
            if (i.data.length == 0) {
              i.data = []
              this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            }
            else {
              var newData = i.data
              var dataMulti = []
              for (var j = 0; j < newData.length; j++) {
                i.data = this.lookupData.filter(x => x.lookUpId == newData[j])[0]
              }
              this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            }
          }
          else if (i.dataType == 3 && i.isMulti == false) {
            if (i.data.length == 0) {
              i.data = ""
              this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            }
            else {
              i.data = this.lookupData.filter(x => x.lookUpId == i.data[0].value)[0]
              this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            }
          }
          else if (i.dataType == 4 && i.data.length == 0) {
            i.data = ""
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 4 && i.data.length > 0) {
            i.data = i.data[0].value
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 5 && i.isMulti == false && i.data.length == 0) {
            i.data = ""
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 5 && i.isMulti == false && i.data.length > 0) {
            i.data = i.data[0].value
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 6 && i.data.length == 0) {
            i.data = ""
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 6 && i.data.length > 0) {
            i.data = i.data[0].value
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
        })
        this.viewContent = true
      })
    })
  }

  getLookup(key) {
    return this.lookupData.filter(x => x.lookUpParentId == key)
  }

  submitLA(data){
    this.apiService.getLocalAttributes(this.projectHubService.projectid).then((res: any) => {
      this.rawData = res
      var formValue = this.localAttributeForm.getRawValue()
      var mainObj = this.rawData
      var emptyData = {
        "uniqueId": "",
        "value": "string"
      }
      // mainObjKeys = Object.keys(formValue).map((key) => [String(key)])
      for (var i = 0; i < mainObj.length; i++) {
        if (this.rawData[i].data.length == 0){
          mainObj[i].data.push(emptyData)
        }
        mainObj[i].data[0].value = this.localAttributeForm.controls[mainObj[i].uniqueId].value
      }
      this.apiService.editLocalAttributes(this.projectHubService.projectid, mainObj).then(res => {
        this.projectHubService.isNavChanged.next(true)
        this.projectHubService.submitbutton.next(true)
        this.projectHubService.successSave.next(true)
        this.projectHubService.toggleDrawerOpen('', '', [], '')
      })
    })
    
  }

  clickEvent(name, data){
    if(data != ""){
    console.log("inside clickEvent ---->", data.target.value)
    this.localAttributeForm.controls[name].setValue(data.target.value);
    }
  }

  // clickEvent2(name, data) {
  //   if (data != "") {
  //   console.log("inside clickEvent2 ---->", data.target.value)
  //   this.localAttributeForm.controls[name].setValue(data.target.value);
  //   }
  // }

  
}

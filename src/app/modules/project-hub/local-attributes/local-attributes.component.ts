import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { ProjectApiService } from '../common/project-api.service';
import { ProjectHubService } from '../project-hub.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-local-attributes',
  templateUrl: './local-attributes.component.html',
  styleUrls: ['./local-attributes.component.scss']
})
export class LocalAttributesComponent implements OnInit, OnDestroy {
  localAttributeForm: any = new FormGroup({})
  localAttributeFormRaw: any = new FormGroup({})
  viewContent = false
  id = ''
  data: any
  lookupData: any
  editable= false
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private _Activatedroute: ActivatedRoute, public auth: AuthService, private projectHubService: ProjectHubService, private apiService: ProjectApiService) {
    this.projectHubService.submitbutton.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      if (res == true) {
        this.ngOnInit()
      }
    })
   }

  ngOnInit(): void {
    if (this.projectHubService.roleControllerControl.projectHub.localAttributes) {
      this.editable = true
    }
    this.id = this._Activatedroute.parent.parent.snapshot.paramMap.get("id");
    this.apiService.getLocalAttributes(this.id).then((res: any) => {
      this.auth.lookupMaster().then(res1 => {
        this.lookupData = res1
        this.data = res
        this.localAttributeForm = new FormGroup({})
        this.localAttributeFormRaw = new FormGroup({})
        this.data.forEach(i => {
          this.localAttributeFormRaw.addControl(i.uniqueId, new FormControl(i.data))
        })
        this.data.forEach(i => {
          if(i.dataType == 1 && i.data.length == 0){
            i.data = false
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 1 && i.data.length > 0) {
            i.data = i.data[0].value
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 2 && i.data.length == 0){
            i.data = ""
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 2 && i.data.length > 0) {
            i.data = i.data[0].value
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 3 && i.isMulti == true){
            if(i.data.length == 0){
              i.data = []
              this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            }
            else{
            var newData = i.data
            var dataMulti = []
            for (var j = 0; j < newData.length;j++){
              i.data[j] = newData[j].value? this.lookupData.filter(x => x.lookUpId == newData[j].value)[0] : []
              // dataMulti.push(i.data[j].value)
            }
            // i.data = dataMulti
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            // this.localAttributeForm.get(i.uniqueId).patchValue(i.data);
          }
          }
          else if (i.dataType == 3 && i.isMulti == false) {
            if(i.data.length == 0){
              i.data = ""
              this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            }
            else{
              if (this.lookupData.filter(x => x.lookUpId == i.data[0].value).length == 0){
                i.data = ""
                this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
              }
              else{
              i.data = i.data[0].value?this.lookupData.filter(x => x.lookUpId == i.data[0].value)[0].lookUpName:""
              this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
              }
            }
          }
          else if(i.dataType == 4 && i.data.length == 0){
            i.data = ""
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 4 && i.data.length > 0) {
            if (i.data[0].value == null) {
              i.data = ""
              this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            }
            else {
            i.data = i.data[0].value
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            }
          }
          else if (i.dataType == 5 && i.isMulti == false) {
            if (i.data.length == 0){
              i.data = ""
              this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            }
            else{
              if (i.data[0].value == null || i.data[0].value == ""){
                i.data = ""
                this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
              }
              else{
              i.data = i.data[0].value.userDisplayName
              this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
              }
            }
          }
          else if (i.dataType == 5 && i.isMulti == true && i.data.length == 0) {
            if (i.data.length == 0){
              i.data = []
              this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            }
            else{
              var newData = i.data
              for (var j = 0; j < newData.length; j++) {
                i.data = newData[j].value
              }
              this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
            }
          }
          else if(i.dataType == 6 && i.data.length == 0){
            i.data = ""
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else if (i.dataType == 6 && i.data.length > 0) {
            i.data = i.data[0].value
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          // this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          // this.localAttributeFormRaw.addControl(i.uniqueId, new FormControl(i.data))
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
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}

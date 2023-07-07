import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import moment from 'moment';
import { ProjectApiService } from '../../common/project-api.service';
import { ProjectHubService } from '../../project-hub.service';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MMM-yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-local-attribute-single-edit',
  templateUrl: './local-attribute-single-edit.component.html',
  styleUrls: ['./local-attribute-single-edit.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class LocalAttributeSingleEditComponent {
  @Input() callLocation: 'ProjectHub' | 'CreateNew' = 'ProjectHub'
  @Input() ExecutionScope = ""
  @Input() PortfolioOwner = ""
  @Output() formValueLA = new EventEmitter<any>();
  localAttributeForm: any = new FormGroup({})
  localAttributeFormRaw: any = new FormGroup({})
  viewContent = false
  @Input() viewType : 'SidePanel' | 'Form' = 'Form'
  data: any = [];
  originalData: any
  rawData: any
  lookupData: any
  constructor(private projectHubService: ProjectHubService, public auth: AuthService, private apiService: ProjectApiService, private _Activatedroute: ActivatedRoute) {
    this.localAttributeForm.valueChanges.subscribe(res => {
      if (this.viewContent) {
        this.projectHubService.isFormChanged = true
      }
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.PortfolioOwner != undefined){
      this.PortfolioOwner = changes.PortfolioOwner?.currentValue
      var scope = changes.ExecutionScope?.currentValue.split(',')
      for(var i=0;i<scope.length;i++){
        if(scope[i]==scope[i+1]){
          scope.pop(scope[i+1])
        }
      }
      this.ExecutionScope = scope.join(',')
      this.ngOnInit()
    }
  }
  ngOnInit(): void {
    var api;
    if(this.callLocation == "CreateNew"){
      console.log(this.PortfolioOwner)
      console.log(this.ExecutionScope)
      api = this.apiService.getLocalAttributesByOwner(this.PortfolioOwner, this.ExecutionScope)
    }
    else{
      this.apiService.getLocalAttributes(this.projectHubService.projectid)
    }
    api.then((res: any) => {
      this.auth.lookupMaster().then(res1 => {
        this.lookupData = res1
        const originalData = Object.assign([{}], res)
        this.localAttributeFormRaw.value = {}
        this.localAttributeFormRaw.controls = {}
        res.forEach(i => {
          this.localAttributeFormRaw.addControl(i.uniqueId, new FormControl(i.data))
        })
          this.originalData = []
        this.dataLoader(res);
        this.originalData = originalData;
        this.viewContent = true
        if (this.callLocation == "CreateNew"){
          this.formValueLA.emit(true)
        }
      })
    })


  }

  getLookup(key) {
    return this.lookupData.filter(x => x.lookUpParentId == key)
  }

  submitLA(data) {
    var mainObj = this.originalData
    var dataToSend = []
    var i = -1;
    this.projectHubService.isFormChanged = false
    var formValue = this.localAttributeForm.getRawValue()
    var emptyObject = {
      "uniqueId": "",
      "value": ""
    }
    Object.keys(this.localAttributeForm.controls).forEach((name) => {
      const currentControl = this.localAttributeForm.controls[name];
      i++;
      if (currentControl.dirty) {
        if (mainObj[i].data.length == 0 && mainObj[i].dataType == 1 && this.localAttributeForm.controls[mainObj[i].uniqueId].value == "") {
          mainObj[i].data = []
          dataToSend.push(mainObj[i])
        }
        else if (mainObj[i].data.length == 0 && mainObj[i].dataType == 2 && this.localAttributeForm.controls[mainObj[i].uniqueId].value == "") {
          mainObj[i].data = []
          dataToSend.push(mainObj[i])
        }
        else if (mainObj[i].data.length == 0 && mainObj[i].dataType == 3 && mainObj[i].isMulti == false && this.localAttributeForm.controls[mainObj[i].uniqueId].value.lookUpId == undefined) {
          mainObj[i].data = []
          dataToSend.push(mainObj[i])
        }
        else if (mainObj[i].data.length == 0 && mainObj[i].dataType == 3 && mainObj[i].isMulti == true && this.localAttributeForm.controls[mainObj[i].uniqueId].value.length == 0) {
          mainObj[i].data = []
          dataToSend.push(mainObj[i])
        }
        else if (mainObj[i].data.length == 0 && (mainObj[i].dataType == 6 || mainObj[i].dataType == 4) && this.localAttributeForm.controls[mainObj[i].uniqueId].value == "") {
          mainObj[i].data = []
          dataToSend.push(mainObj[i])
        }
        else if (mainObj[i].data.length == 0 && mainObj[i].dataType == 5 && this.localAttributeForm.controls[mainObj[i].uniqueId].value == "") {
          mainObj[i].data = []
          dataToSend.push(mainObj[i])
        }
        else if (mainObj[i].dataType == 2) {
          if (mainObj[i].data.length != 0 && (this.localAttributeForm.controls[mainObj[i].uniqueId].value == "" || this.localAttributeForm.controls[mainObj[i].uniqueId].value == null)) {
            mainObj[i].data[0].value = null
            dataToSend.push(mainObj[i])
          }
          else if (mainObj[i].data.length == 0 && this.localAttributeForm.controls[mainObj[i].uniqueId].value != "") {
            emptyObject = {
              "uniqueId": "",
              "value": ""
            }
            mainObj[i].data.push(emptyObject)
            mainObj[i].data[0].value = moment(this.localAttributeForm.controls[mainObj[i].uniqueId].value).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
            dataToSend.push(mainObj[i])
          }
          else {
            mainObj[i].data[0].value = moment(this.localAttributeForm.controls[mainObj[i].uniqueId].value).format('YYYY-MM-DD[T]HH:mm:ss.sss[Z]')
            dataToSend.push(mainObj[i])
          }
        }
        else if (mainObj[i].dataType == 3 && mainObj[i].isMulti == false) {
          if (mainObj[i].data.length != 0 && this.localAttributeForm.controls[mainObj[i].uniqueId].value.lookUpId == undefined) {
            mainObj[i].data[0].value = null
            dataToSend.push(mainObj[i])
          }
          else if (mainObj[i].data.length == 0 && this.localAttributeForm.controls[mainObj[i].uniqueId].value.lookUpId != undefined) {
            emptyObject = {
              "uniqueId": "",
              "value": ""
            }
            mainObj[i].data.push(emptyObject)
            mainObj[i].data[0].value = this.localAttributeForm.controls[mainObj[i].uniqueId].value.lookUpId
            dataToSend.push(mainObj[i])
          }
          else {
            mainObj[i].data[0].value = this.localAttributeForm.controls[mainObj[i].uniqueId].value.lookUpId
            dataToSend.push(mainObj[i])
          }
        }
        else if (mainObj[i].dataType == 3 && mainObj[i].isMulti == true) {
          var data = []
          if (this.localAttributeForm.controls[mainObj[i].uniqueId] != null && this.localAttributeForm.controls[mainObj[i].uniqueId].value.length != 0) {
            for (var j = 0; j < this.localAttributeForm.controls[mainObj[i].uniqueId].value.length; j++) {
              if (this.localAttributeForm.controls[mainObj[i].uniqueId].value.length < mainObj[i].data.length) {
                mainObj[i].data = []
                mainObj[i].data[j] = {
                  "uniqueId": "",
                  "value": this.localAttributeForm.controls[mainObj[i].uniqueId].value[j].lookUpId
                }
              }
              else {
                if (mainObj[i].data[j] == undefined) {
                  mainObj[i].data[j] = {
                    "uniqueId": "",
                    "value": this.localAttributeForm.controls[mainObj[i].uniqueId].value[j].lookUpId
                  }
                }
                else {
                  mainObj[i].data[j].value = this.localAttributeForm.controls[mainObj[i].uniqueId].value[j].lookUpId

                }
              }
            }
          }
          else {
            mainObj[i].data = []
          }
          dataToSend.push(mainObj[i])
        }
        else {
          if (mainObj[i].data.length == 0) {
            emptyObject = {
              "uniqueId": "",
              "value": ""
            }
            mainObj[i].data.push(emptyObject)
            if (mainObj[i].dataType == 4 && this.localAttributeForm.controls[mainObj[i].uniqueId].value == "") {
              mainObj[i].data[0].value = null
              dataToSend.push(mainObj[i])
            }
            else {
              mainObj[i].data[0].value = this.localAttributeForm.controls[mainObj[i].uniqueId].value
              dataToSend.push(mainObj[i])
            }
          }
          else {
            if (mainObj[i].dataType == 4 && this.localAttributeForm.controls[mainObj[i].uniqueId].value == "") {
              mainObj[i].data[0].value = null
              dataToSend.push(mainObj[i])
            }
            else {
              mainObj[i].data[0].value = this.localAttributeForm.controls[mainObj[i].uniqueId].value
              dataToSend.push(mainObj[i])
            }
          }
        }
      }
    });
    this.apiService.editLocalAttributes(this.projectHubService.projectid, dataToSend).then(res => {
      this.projectHubService.toggleDrawerOpen('', '', [], '')
      this.projectHubService.submitbutton.next(true)
      this.projectHubService.isNavChanged.next(true)
      this.projectHubService.successSave.next(true)
    })

  }

  dataLoader(res) {
    this.data = []
    res.forEach(data => {
      var i = Object.assign({}, data)
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
            if (this.lookupData.filter(x => x.lookUpId == newData[j].value).length == 0) {
              i.data[j] = []
            }
            else {
              i.data[j] = this.lookupData.filter(x => x.lookUpId == newData[j].value)[0]
            }
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
          if (this.lookupData.filter(x => x.lookUpId == i.data[0].value).length == 0) {
            i.data = ""
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else {
            i.data = this.lookupData.filter(x => x.lookUpId == i.data[0].value)[0]
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
        }
      }
      else if (i.dataType == 4 && i.data.length == 0) {
        if (i.linesCount == null) {
          i.linesCount = 13
        }
        i.data = ""
        this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
      }
      else if (i.dataType == 4 && i.data.length > 0) {
        if (i.linesCount == null) {
          i.linesCount = 13
        }
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
        if (i.data.length == 0) {
          i.data = ""
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        }
        else {
          if (i.data[0].value == null) {
            i.data = ""
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
          else {
            i.data = i.data[0].value
            this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
          }
        }
      }
      else if (i.dataType == 5 && i.isMulti == true && i.data.length == 0) {
        if (i.data.length == 0) {
          i.data = []
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        }
        else {
          var newData = i.data
          for (var j = 0; j < newData.length; j++) {
            i.data = newData[j].value
          }
          this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
        }
      }
      else if (i.dataType == 6 && i.data.length == 0) {
        i.data = ""
        this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
      }
      else if (i.dataType == 6 && i.data.length > 0) {
        i.data = i.data[0].value
        this.localAttributeForm.addControl(i.uniqueId, new FormControl(i.data))
      }
      this.data.push(i);
    })
  }

}

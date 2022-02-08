import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotlightIndicatorsService {

  constructor() { }

  getIndicators(indicator :string, type: string): any{
    const temp: any = {}
    if( type == 'overall'){
      if(indicator == 'GreenStop'){
        temp.icontype = 'heroicons_solid:check-circle'
        temp.iconcolor = 'text-green-500'
      }
      else if( indicator == 'YellowStop'){
        temp.icontype = 'heroicons_solid:exclamation-circle'
        temp.iconcolor = 'text-amber-500'
      }
      else if( indicator == 'RedStop'){
        temp.icontype = 'heroicons_solid:x-circle'
        temp.iconcolor = 'text-red-500'
      }
      else{
        temp.icontype = 'heroicons_solid:dots-circle-horizontal'
        temp.iconcolor = ''
      }
    }
    else{
      if(indicator == 'GreenStop'){
        temp.icontype = 'heroicons_solid:arrow-circle-down'
        temp.iconcolor = 'text-green-500'
      }
      else if( indicator == 'YellowStop'){
        temp.icontype = 'heroicons_solid:arrow-circle-right'
        temp.iconcolor = 'text-amber-500'
      }
      else if( indicator == 'RedStop'){
        temp.icontype = 'heroicons_solid:arrow-circle-right'
        temp.iconcolor = 'text-red-500'
      }
      else if( indicator == 'PurpleStop'){
        temp.icontype = 'heroicons_solid:arrow-circle-up'
        temp.iconcolor = 'text-purple-500'
      }
      else{
        temp.icontype = 'heroicons_solid:dots-circle-horizontal'
        temp.iconcolor = ''
      }
    }
    return temp
  }
}

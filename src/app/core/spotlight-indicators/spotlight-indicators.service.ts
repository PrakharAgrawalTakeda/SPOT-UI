import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotlightIndicatorsService {

  constructor() { }

  getIndicators(indicator :string, type: string): any{
    const temp: any = {}
    if( type == 'overall'){
      if(indicator == 'GreenArrowUp'){
        temp.icontype = 'heroicons_solid:arrow-circle-up'
        temp.iconcolor = 'text-[#008000]'
      }
      else if( indicator == 'YellowArrowUp'){
        temp.icontype = 'heroicons_solid:arrow-circle-up'
        temp.iconcolor = 'text-[#FFCC00]'
      }
      else if( indicator == 'YellowArrowDown'){
        temp.icontype = 'heroicons_solid:arrow-circle-down'
        temp.iconcolor = 'text-[#FFCC00]'
      }
      else if( indicator == 'RedArrowDown'){
        temp.icontype = 'heroicons_solid:arrow-circle-down'
        temp.iconcolor = 'text-[#ff0000]'
      }
      else if(indicator == 'GreyStop'){
        temp.icontype = 'heroicons_solid:arrow-circle-right'
        temp.iconcolor = ''
      }
      else if(indicator == 'GreenStop'){
        temp.icontype = 'heroicons_solid:arrow-circle-right'
        temp.iconcolor = 'text-[#008000]'
      }
      else if(indicator == 'RedStop'){
        temp.icontype = 'heroicons_solid:arrow-circle-right'
        temp.iconcolor = 'text-[#ff0000]'
      }
      else if(indicator == 'YellowStop'){
        temp.icontype = 'heroicons_solid:arrow-circle-right'
        temp.iconcolor = 'text-[#FFCC00]'
      }
      else if(indicator == 'PurpleStop'){
        temp.icontype = 'heroicons_solid:arrow-circle-right'
        temp.iconcolor = 'text-[#B4A7D6]'
      }
      else{
        temp.icontype = 'heroicons_solid:arrow-circle-right'
        temp.iconcolor = ''
      }
    }
    else if(type == "circle") {
      temp.icontype = 'mat_solid:circle'
      if(indicator == 'Green'){
        temp.iconcolor = 'text-[#008000]'
      }
      else if( indicator == 'Yellow'){
        temp.iconcolor = 'text-[#FFCC00]'
      }
      else if( indicator == 'Red'){
        temp.iconcolor = 'text-[#ff0000]'
      }
      else if( indicator == 'Purple'){
        temp.iconcolor = 'text-[#B4A7D6]'
      }
      else{
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
        temp.icontype = 'mat_solid:circle'
        temp.iconcolor = ''
      }
    }
    return temp
  }
}

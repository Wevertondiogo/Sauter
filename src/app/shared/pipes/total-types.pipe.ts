import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalTypes',
  standalone: true
})
export class TotalTypesPipe implements PipeTransform {

  transform(type: string, selectedTypes: any[]): number {
    return selectedTypes.filter(value => value === type).length;
  }

}

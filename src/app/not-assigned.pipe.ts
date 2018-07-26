import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'NotAssigned'
})
export class NotAssignedPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if (value == -1) return 'Not Assigned';
    return value;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { IEmployee } from './IEmployee';


@Pipe({  name: 'orderBy' })

export class OrderrByPipe implements PipeTransform {

  transform(Employees: IEmployee[], args?: any): any {
    
    return Employees.sort(function(a, b){
          if(a[args.property] < b[args.property]){
            return -1 * args.direction;
          }
          else if( a[args.property] > b[args.property]){
            return 1 * args.direction;
          }
          else{
            return 0;
          }
        });
    };
}
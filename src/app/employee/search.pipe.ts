import { Pipe, PipeTransform } from '@angular/core';
import { IEmployee } from './IEmployee';
@Pipe({
  name: 'nameFilter'
})
export class SearchPipe implements PipeTransform {

  transform(Employees: IEmployee[], searchValue: string): IEmployee[] {

    if (!Employees || !searchValue) {
      return Employees;
    }
    return Employees.filter(employee =>
        employee.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }
}

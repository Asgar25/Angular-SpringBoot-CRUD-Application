import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../IEmployee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  searchValue: string;
  employees: IEmployee[];

  //records: Array<any>;
  isDesc: boolean = false;
  column: string = '';
  direction: number;

  constructor(private _employeeService: EmployeeService,
              private _router: Router) { }

  ngOnInit(): void {
   this.getEmployeesList();
  }

  getEmployeesList(){
    this._employeeService.getEmployees().subscribe(
      (listEmployees) => this.employees = listEmployees,
      (err) => console.log(err)
    );
  }

  editButtonClick(emplyeeId: number) {
    debugger;
    this._router.navigate(['/edit', emplyeeId]);
  }

  deleteButtonClick(id: number) {
    this._employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.getEmployeesList();
        },
        error => console.log(error));
  }

  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };

}

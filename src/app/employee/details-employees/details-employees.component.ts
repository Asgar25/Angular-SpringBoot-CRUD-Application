import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../IEmployee';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ISkill } from '../ISkill';
import { CustomValidators } from 'src/app/shared/custom.validators';

@Component({
  selector: 'app-details-employees',
  templateUrl: './details-employees.component.html',
  styleUrls: ['./details-employees.component.css']
})
export class DetailsEmployeesComponent implements OnInit {

  
  id: number;
  employee: IEmployee;
  pageTitle: string;

  employeeForm: FormGroup;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private fb: FormBuilder) { }

  ngOnInit(): void {

    this.employeeForm = this.fb.group({
      name: [''],
      department: [''],
      age: ['']
    });

    this.employee = new IEmployee();

    this.id = this.route.snapshot.params['id'];
    
    this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        console.log(data)
        this.employee = data;
      }, error => console.log(error));

      this.route.paramMap.subscribe(params => {
        const empId = + params.get('id');
        if (empId) {
          this.pageTitle = 'Details Employee';
          this.getEmployee(empId);
        }
      });
  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      (employee: IEmployee) => {
        this.detailsEmployee(employee);
        this.employee = employee;
      },
      (err: any) => console.log(err)
    );
  }

  detailsEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      name: employee.name,
      department: employee.department,
      age: employee.age
    });
  }

  list(){
    this.router.navigate(['list']);
  }

}

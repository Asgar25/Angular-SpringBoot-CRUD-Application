import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators, AbstractControl, FormArray } from '@angular/forms'
import { CustomValidators } from 'src/app/shared/custom.validators';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../IEmployee';
import { ISkill } from '../ISkill';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {


  employeeForm: FormGroup;
  employee: IEmployee;
  pageTitle: string;

  validationMessages = {
    'name': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 charaters.',
      'maxlength': 'Full Name must be less than 2 charaters.'
    },
    'age': {
      'required': 'Age is required.'
    }
  };

  formErrors = {
    'name':'',
    'age': ''
  };

  

  constructor(private fb: FormBuilder,
             private route: ActivatedRoute,
             private employeeService: EmployeeService,
             private router: Router) { }

  ngOnInit(): void {

    // this is using Form Builder
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      age: ['', Validators.required],
      department: this.fb.array([]),
      isChecked: [false]
    });

    this.route.paramMap.subscribe(params => {
      const empId = + params.get('id');
      if (empId) {
        this.pageTitle = 'Edit Employee';
        this.getEmployee(empId);
      } else {
        this.pageTitle = 'Create Employee'
        this.employee = {
          id: null,
          name: '',
          department: '',
          age:  null
        };
      }
    });

  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      (employee: IEmployee) => {
        this.editEmployee(employee);
        this.employee = employee;
      },
      (err: any) => console.log(err)
    );
  }

  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      name: employee.name,
      department: [employee.department],
      age: employee.age
    });

  }

  logkeyValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const message = this.validationMessages[key];

        for(const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += message[errorKey] + '';
          }
        }
      }

      if(abstractControl instanceof FormGroup) {
        this.logkeyValidationErrors(abstractControl);
      }
    });
  }

  onLoadDataClick(): void {
    //this.logkeyValidationErrors(this.employeeForm);
    //console.log(this.formErrors);
    
  }

  onSubmit() {
    debugger;
    this.mapFormValuesToEmployeeModel();
    if (this.employee.id) {
      debugger
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => this.router.navigate(['list']),
        (err: any) => console.log(err)
      );    
    } else {
      debugger;
      this.employeeService.addEmployee(this.employee).subscribe(
        () => this.router.navigate(['list']),
        (err: any) => console.log(err)
      );  
    }
   /*  console.log(this.employeeForm.touched);
    console.log(this.employeeForm.valid);
    console.log(this.employeeForm.value);
    console.log(this.employeeForm.controls.fullName.touched);
    console.log(this.employeeForm.get('fullName').value); */
  }

  mapFormValuesToEmployeeModel() {
    debugger;
    this.employee.name = this.employeeForm.value.name;
    this.employee.department = this.employeeForm.value.department[0];
    this.employee.age = this.employeeForm.value.age;
  }

  toggleDept() {
    if (!this.employeeForm.value.isChecked) {
      this.adddept();
    } else {
      this.removeDept(0);
    }
  }

  adddept(): void {
    (this.employeeForm.get('department') as FormArray).push(
      this.fb.control(null)
    );
  }

  removeDept(index) {
    (this.employeeForm.get('department') as FormArray).removeAt(index);
  }

  getdeptFormControls(): AbstractControl[] {
    return (<FormArray> this.employeeForm.get('department')).controls
  }
  
}


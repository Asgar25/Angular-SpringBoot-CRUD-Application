import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ListEmployeesComponent } from './employee/list-employees/list-employees.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { DetailsEmployeesComponent } from './employee/details-employees/details-employees.component';


const appRoutes: Routes = [

    { path: 'list', component: ListEmployeesComponent },
    { path: 'create', component: CreateEmployeeComponent },
    { path: 'edit/:id', component: CreateEmployeeComponent },
    { path: 'details/:id', component: DetailsEmployeesComponent },
    { path: '', redirectTo: '/list', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent },

    
];



@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { ListEmployeesComponent } from './employee/list-employees/list-employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './employee/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found.component';
import { DetailsEmployeesComponent } from './employee/details-employees/details-employees.component';
import { SearchPipe } from './employee/search.pipe';
import { OrderrByPipe } from './employee/orderby.pipe';
import { FormsModule } from '@angular/forms';
import { specialPipe } from './employee/special.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    ListEmployeesComponent,
    PageNotFoundComponent,
    DetailsEmployeesComponent,
    SearchPipe,
    OrderrByPipe,
    specialPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

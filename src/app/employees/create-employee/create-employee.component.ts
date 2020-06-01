import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router, ActivatedRoute } from '@angular/router';

import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  bsConfig: Partial<BsDatepickerConfig>;
  panelTitle: string;
  public previewPhoto = false
  // public gender = 'male'
  public contactPreference = 'phone'
  public fullName: any;
  public email: any;
  public phoneNumber: any;
  public department = '1';
  public isActive = true;
  public dateOfBirth: any;
  public photoPath: any;

  public employee: Employee;
  // = {
  //   id: null,
  //   name: null,
  //   gender: null,
  //   email: null,
  //   phoneNumber: null,
  //   contactPreference: null,
  //   dateOfBirth: null,
  //   department: 'select',
  //   isActive: null,
  //   photoPath: null,
  //   // password: null,
  //   // confirmPassword: null,
  // }

  public departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
  ]
  constructor(private _employeeService: EmployeeService,
    private _router: Router, private _route: ActivatedRoute) {
    this.bsConfig = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      minDate: new Date(2018, 0, 1),
      maxDate: new Date(2018, 11, 31),
      dateInputFormat: 'DD/MM/YYYY'
    })
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    })
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: null,
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null,
      };
      this.panelTitle = 'Create Employee'
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Employee'
      //  this.employee =Object.assign({}, this._employeeService.getEmployee(id))
      this._employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err)
      )

    }
  }

  // saveEmployee(): void{
  //   const newEmployee: Employee = Object.assign({}, this.employee)
  //     this._employeeService.save(newEmployee);
  //     this.createEmployeeForm.reset();
  //     this._router.navigate(['list']);
  // }

  saveEmployee(): void {
    if (this.employee.id == null) {
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    }
  }

}

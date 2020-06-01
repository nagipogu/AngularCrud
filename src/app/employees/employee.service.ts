import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, from } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
@Injectable()
export class EmployeeService {
  constructor(private httpClient: HttpClient) { }
  private listEmployees: Employee[] = [
    {
      id: 1,
      name: 'Mark',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@gmail.com',
      dateOfBirth: new Date('10/12/1988'),
      phoneNumber: 999998888,
      department: '2',
      isActive: true,
      photoPath: 'assets/images/avatar.png'
    },
    {
      id: 2,
      name: 'John',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'john@gmail.com',
      dateOfBirth: new Date('10/12/1990'),
      phoneNumber: 9999978888,
      department: '4',
      isActive: true,
      photoPath: 'assets/images/profile.png'
    },
    {
      id: 3,
      name: 'Smith',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'smith@gmail.com',
      dateOfBirth: new Date('10/12/1992'),
      phoneNumber: 9977778888,
      department: '3',
      isActive: true,
      photoPath: 'assets/images/student.png'
    }
  ]

  baseUrl = 'http://localhost:3000/employees'
  // getEmployees(): Employee[] {
  //   return this.listEmployees;
  // }
  // getEmployees(): Observable<Employee[]> {
  //   return Observable.of(this.listEmployees).delay(2000);
  // }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
    return new ErrorObservable('There is a problem with the service, We are notified & Working. Please try again later')
  }

  // getEmployee(id: number): Employee {
  //   return this.listEmployees.find(e => e.id === id);
  // }

  // save(employee: Employee) {
  //   if (employee.id === null) {
  //     const maxid = this.listEmployees.reduce(function (e1, e2) {
  //       return (e1.id > e2.id) ? e1 : e2;
  //     }).id;
  //     employee.id = maxid + 1;
  //     this.listEmployees.push(employee);
  //   } else {
  //     const foundIndex = this.listEmployees.findIndex(e => employee.id);
  //     this.listEmployees[foundIndex] = employee;
  //   }
  // }
  getEmployee(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));

  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.baseUrl, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));

  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));

  }

  deleteEmployee(id: number): Observable<void> {
    // const i = this.listEmployees.findIndex(e => e.id === id);
    // if (i !== -1) {
    //   this.listEmployees.splice(i, 1);
    // }
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
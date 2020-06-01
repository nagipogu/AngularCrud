import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router'
import { from } from 'rxjs';
import { ResolvedEmployeeList } from '../resolved-employeelist.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  error: string;
  // searchTerm: string;
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filtereEmployees(value);
  }
  filtereEmployees(searchString: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  // dataFromChild: Employee;
  // employeeToDisplay: Employee;
  // private arrayIndex = 1;
  constructor(private _employeeServive: EmployeeService, private _router: Router,
    private _route: ActivatedRoute) {
    // this.employees  = this._route.snapshot.data['employeeList'];

    // const resolvedEmployeeList:ResolvedEmployeeList = this._route.snapshot.data['employeeList'];
    const resolvedEmployeeList: Employee[] | string = this._route.snapshot.data['employeeList'];

    // if(resolvedEmployeeList.error == null) {
    //   this.employees = resolvedEmployeeList.employeeList;
    // } else{
    //   this.error = resolvedEmployeeList.error;
    // }

    if (Array.isArray(resolvedEmployeeList)) {
      this.employees = resolvedEmployeeList;
    } else {
      this.error = resolvedEmployeeList;
    }

    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    }
    else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit() {
    // this.employees = this._employeeServive.getEmployees();
    // this._employeeServive.getEmployees().subscribe((empList) => {
    //   this.employees = empList;
    //   if(this._route.snapshot.queryParamMap.has('searchTerm')){
    //     this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    //   }
    //   else{
    //     this.filteredEmployees = this.employees;
    //   }
    // });
  }

  // handleNotify(eventData: Employee){
  //   this.dataFromChild = eventData;
  // }

  // nextEmployee(): void{
  //    if(this.arrayIndex){
  //     this.employeeToDisplay = this.employees[this.arrayIndex];
  //     this.arrayIndex++;
  //    } else{
  //     this.employeeToDisplay = this.employees[0];
  //     this.arrayIndex = 1;
  //    }
  // }

  // onClick(employeeId: number){
  //     this._router.navigate(['/employees', employeeId], {
  //       queryParams: {'searchTerm': this.searchTerm, 'testParam': 'testValue'}
  //     })
  // }

  // changeEmployeeName(){
  //   this.employees[0].name = "giri";
  //   this.filteredEmployees = this.employees;
  //   // const newEmployeeArray: Employee[] = Object.assign([], this.employees);
  //   // newEmployeeArray[0].name ='Jordan';
  //   // this.employees = newEmployeeArray;
  // }

  // onMouseMove(){

  // }

  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }
}

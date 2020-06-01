import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
   selectedEmployeeId: number;
  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;
  isHidden = false;

  // @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
  // @Input() employeeId: number;
  // private _employee: Employee;
  // @Input() 
  // set employee(val: Employee) {
  //   this._employee = val;
  // }

  // get employee(): Employee {
  //   return this._employee;
  // }
  constructor(private _route: ActivatedRoute, private _router:Router, private _employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id')
  }

  // handleClick(){
  //   this.notify.emit(this.employee);
  // }

  // ngOnChanges(changes : SimpleChanges){
  //    for(const propName of Object.keys(changes)){
  //      const change = changes[propName];
  //      const from = JSON.stringify(changes.previousValue);
  //      const to = JSON.stringify(changes.currentValue);
  //    }
  // }


  // getEmployeeNameAndGender(): string {
  //         return this.employee.name + ' ' + this.employee.gender;
  // }

  viewEmployee(){
    this._router.navigate(['/employees', this.employee.id], {
      queryParams: {'searchTerm': this.searchTerm}
    })
  }

  editEmployee(){
    this._router.navigate(['/edit', this.employee.id])
  }
  deleteEmployee(){
     this._employeeService.deleteEmployee(this.employee.id).subscribe(
       () => console.log(`Employee with id = ${this.employee.id} deleted`),
       (err) => console.log(err)
     )
     this.notifyDelete.emit(this.employee.id);
  }
}

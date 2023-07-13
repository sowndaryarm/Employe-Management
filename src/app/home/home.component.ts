import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton: any;

  employeeForm: FormGroup;

  employees: Employee[];
  employeesToDisplay: Employee[];
  educationOptions = [
    '10th pass',
    'diploma',
    'graduate',
    'post graduate',
    'PhD',
  ];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = fb.group({});
    this.employees = [];
    this.employeesToDisplay = this.employees;
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      education: this.fb.control('default'),
      company: this.fb.control(''),
      jobExperience: this.fb.control(''),
      salary: this.fb.control(''),
    });

    this.employeeService.getEmployees().subscribe((res) => {
      for (let emp of res) {
        this.employees.unshift(emp);
      }
      this.employeesToDisplay = this.employees;
    });
  }

  ngAfterViewInit(): void {
    //this.buttontemp.nativeElement.click();
  }

  addEmployee() {
    let employee: Employee = {
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      birthdate: this.BirthDay.value,
      gender: this.Gender.value,
      education: this.educationOptions[parseInt(this.Education.value)],
      company: this.Company.value,
      jobExperience: this.JobExperience.value,
      salary: this.Salary.value,
      profile: this.fileInput.nativeElement.files[0]?.name,
    };
    this.employeeService.postEmployee(employee).subscribe((res) => {
      this.employees.unshift(res);
      this.clearForm();
    });
  }

 clearForm() {
  this.FirstName.setValue('');
  this.LastName.setValue('');
  this.BirthDay.setValue('');
  this.Gender.setValue('');
  this.Education.setValue('');
  this.Company.setValue('');
  this.JobExperience.setValue('');
  this.Salary.setValue('');
  this.fileInput.nativeElement.value = '';
}

public get FirstName(): FormControl {
  return this.employeeForm.get('firstname') as FormControl;
}
public get LastName(): FormControl {
  return this.employeeForm.get('lastname') as FormControl;
}
public get BirthDay(): FormControl {
  return this.employeeForm.get('birthday') as FormControl;
}
public get Gender(): FormControl {
  return this.employeeForm.get('gender') as FormControl;
}
public get Education(): FormControl {
  return this.employeeForm.get('education') as FormControl;
}
public get Company(): FormControl {
  return this.employeeForm.get('company') as FormControl;
}
public get JobExperience(): FormControl {
  return this.employeeForm.get('jobExperience') as FormControl;
}
public get Salary(): FormControl {
  return this.employeeForm.get('salary') as FormControl;
}

}


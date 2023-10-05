import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl : string = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  postEmployee(employee: Employee) {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
